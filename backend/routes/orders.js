var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;

/* POST new orders */
router.post('/add', function(req, res, next) {

  //Skapa order
  req.app.locals.db.collection('orders').insertOne(req.body)

  .then(results => {
  res.send(req.body);
  });

  //Products
  req.app.locals.db.collection('products').find().toArray()
  
  .then(results => {

    results.forEach((product) => {
    (product)._id = (product)._id.toString();
    (product).productId = (product)._id;
    delete (product)._id;
  });

    let products = results;

    /********************/
    let order = req.body;
    let ordPr = order.products;
    
    /*********loop*******/

    for (item in ordPr) {
      let ordprodId = ordPr[item].productId
      let ant = ordPr[item].quantity

      for (article in products) {
        let prodId = products[article].productId
        let saldo = products[article].lager

        if (ordprodId === prodId) {
          saldo = saldo - ant;
          console.log(saldo);
          
          req.app.locals.db.collection('products').updateOne({"_id": new ObjectId(prodId)}, {$set: {lager: saldo}});

        }         
      }
    }
  })
});

/* GET orders listing. */
router.get('/', function(req, res, next) {
  res.send('Orders router');
});
module.exports = router;
