var mongoose = require('mongoose');


module.exports.product = mongoose.model('product', {
    picture: Buffer,
    name: String,
    description: String,
    price: Number,
    available: Boolean
});

module.exports.shop = mongoose.model('shop', {
    numberofitems: Number,
    totalamount: Number,
    basket: [{
            product_id: String,
            quantity: Number,
            amount: Number
        }],
    created_at: Date
 
});

