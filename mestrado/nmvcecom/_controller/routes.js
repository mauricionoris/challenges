var fs = require('fs');
var models = require('../_models/models.js');
var mongoose = require('mongoose');

//start view
function startview(req, res) {
    models.product.find({available: true || undefined}, function (e, p) {
        if (e) throw e;
        res.render('index.ejs', {
            products: p
        });
    });
}

//catalog view
function catalogview(req, res) {
    models.product.find({}, function (e, p) {
        if (e) throw e;
        res.render('catalog.ejs', {
            products: p
        });
    });    
}

//catalogdetail view
function catalogdetailview(req, res) {
  models.product.find({_id: req.body.h_productlist}, function (e, p) {
        if (e) throw e;
        res.render('catalogdetail.ejs', {
            product: p
        });
     });    
 }

//endShop View
function endShopview(req, res) {
    
    var _ids = [];
    var cart = JSON.parse(req.body.h_cart);
    
    for (p in cart.products) {
        _ids.push(cart.products[p].Id);
    }
     
    models.product.find({ '_id': { $in: _ids } }, function (e, p) {
        if (e) console.log(e);
        //console.log(p);        
        res.render('endShop.ejs', {
            products: p,
            cart: req.body.h_cart
        });
    }); 
   
}

//past shops
function pastbuysview(req, res) {
    models.shop.find({}, function (e, s) {
        if (e) throw e;
        var _ids = [];
        for (shop in s) {
            for (product in s[shop].basket) {
                if (mongoose.Types.ObjectId.isValid(s[shop].basket[product].product_id) ) {
                     _ids.push(s[shop].basket[product].product_id);
                }
            }
        }
        models.product.find({ '_id': { $in: _ids } }, function (e, p) {
            if (e) throw e;
            res.render('pastbuys.ejs', {
                shops: s,
                products: p
            });
        });
     });
}

//new product view
function newproductview(req, res) {
    res.render('newProduct.ejs');
}

//about view
function aboutview(req, res) {
    res.render('about.ejs');
}

//create a new product
function addProduct(req, res) { 
    var product = new models.product({
        picture: req.body.productimage,      
        name: req.body.productname,
        description: req.body.productdescription,
        price: req.body.productprice,
        available: req.body.productavailable
    });
    
    product.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            catalogview(req, res);
        }
    });    

}

//update product 
function updateProduct(req, res) {
    
    models.product.findById(req.body.h_productid, function (e, p) {
        if (e) throw e;
        p.name = req.body.productname;
        p.description = req.body.productdescription;
        p.price = req.body.productprice;
        p.available = req.body.productavailable;
        
        p.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                catalogview(req, res);
            }
        });   
    });    
 
}

//save cart
function closeDealview(req, res) {
    
    var _basket = [];
    var cart = JSON.parse(req.body.h_cart);
    var _amount=0;
    var _qtd = +0;
    var _ids = [];
    for (p in cart.products) {
        _ids.push(cart.products[p].Id);
        var v_amount = cart.products[p].unitprice * cart.products[p].quantity;          
        _basket.push({ product_id: cart.products[p].Id, quantity: cart.products[p].quantity, amount: v_amount });
        _amount += v_amount;
        _qtd += +cart.products[p].quantity; 
    }
  
    var c = new models.shop({
        numberofitems: _qtd, 
        totalamount: _amount,
        basket: _basket,
        created_at: Date.now()
    });
    
    c.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            models.product.find({ '_id': { $in: _ids } }, function (e, s) {
                if (e) throw e;
                res.render('closeDeal.ejs', {
                    cart: c,
                    products: s
                });
            });
        }
    });  
}

module.exports.startview = startview;
module.exports.catalogview = catalogview;
module.exports.endShopview = endShopview;
module.exports.catalogdetailview = catalogdetailview;
module.exports.closeDealview = closeDealview;
module.exports.pastbuysview = pastbuysview;
module.exports.newproductview = newproductview;
module.exports.aboutview = aboutview;
module.exports.addProduct = addProduct;
module.exports.updateProduct = updateProduct;
