const jwt = require('jsonwebtoken');
const User = require('./../model/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const { promisify } = require('util');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client('817056518934-0p9ituunl6pnooif02pfgli1kr4n5ldh.apps.googleusercontent.com');
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// signup controller
exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });

  let token = createToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

// login controller
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //check email and password is present in body
  if (!email || !password) {
    return next(new AppError('Provide valid email and password', 400));
  }
  // check if user exit and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('incorrect email or password', 401));
  }
  // if all good send jwt token
  let token = createToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user: user,
    },
  });
});

exports.googlelogin = (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience: '817056518934-0p9ituunl6pnooif02pfgli1kr4n5ldh.apps.googleusercontent.com',
    })
    .then((response) => {
      const { email_verified, name, email, sub } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(400).json({ error: 'something went wrong' });
          } else {
            if (user) {
              const token = createToken(user._id);
              res.status(200).json({
                status: 'success',
                token,
                data: {
                  user,
                },
              });
            } else {
              const newUser = User.create({
                name: name,
                email: email,
                password: sub,
                confirmPassword: sub,
              });

              console.log(newUser);
              const token = createToken(newUser._id);
              res.status(200).json({
                status: 'success',
                token,
                data: {
                  newUser,
                },
              });
            }
          }
        });
      }
      console.log(response.payload);
    });
};

exports.userAuthorization = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  //  Verification token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError('The user belonging to this token does no longer exist.', 401));
  }

  // Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.id)) {
    return next(new AppError('User recently changed password! Please log in again.', 401));
  }

  // granting access to user
  req.user = currentUser;
  next();
});

//forgot password controller
exports.forgotPassword = catchAsync(async (req, res, next) => {
  //find the user
  const user = User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('No user found with this email address', 404));
  }
  // create random token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  //create reset url
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
  //set message
  const message = `Forgot your password? set your new password by following this link: ${resetURL}.\n`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Set your password (valid for 10 min)',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new AppError('There was an error sending the email. Try again later!'), 500);
  }
});

//reset password controller
exports.resetPassword = catchAsync(async (req, res, next) => {
  // Get the user based on the token
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //set new password if user token has not expired
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //send success message
  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

//update password controller

exports.updatePassword = catchAsync(async (req, res, next) => {
  // Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  //Now update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //send success message
  res.status(200).json({
    status: 'success',
    data: { user },
  });
});
