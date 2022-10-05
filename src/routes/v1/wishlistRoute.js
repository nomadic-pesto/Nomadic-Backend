const express = require('express')

const router =  express.Router()

router.get('/getWishlist')
router.post('/addwishlist')
router.delete('/deleteWishlist/:id')




module.exports = router