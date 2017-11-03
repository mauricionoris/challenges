
//start modules requirements
var express = require('express');
var bodyparser = require('body-parser');
var moongose = require('mongoose');

var server = express();



//database open
moongose.connect('localhost/mydb');
server.use(bodyparser.urlencoded({ extended: false }));

//path to views
server.set('views', __dirname + '/_views');

//path to static files
server.use(express.static(__dirname + '/_public'));

//setting routes 
var routes = require('./_controller/routes.js');

/* ROUTING  */

//get
server.get('/', routes.startview);
server.get('/catalog', routes.catalogview);
server.get('/pastbuys', routes.pastbuysview);
server.get('/newproductview', routes.newproductview);
server.get('/about', routes.aboutview);

//post
server.post('/addProduct', routes.addProduct);
server.post('/updateProduct', routes.updateProduct);
server.post('/catalogDetail', routes.catalogdetailview);
server.post('/endShop', routes.endShopview)
server.post('/closeDeal', routes.closeDealview)

//---------------------------------------------------------
server.listen(8080);

