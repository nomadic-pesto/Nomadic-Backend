const express = require('express')
const wishlistController = require('./../../controllers/wishlistController')
const router =  express.Router()

router.get('/getWishlist/:id', wishlistController.getAllWishlist)
router.post('/addwishlist', wishlistController.addToWishlist)
router.delete('/deleteWishlist/:id', wishlistController.deleteFromWishlist)




module.exports = router