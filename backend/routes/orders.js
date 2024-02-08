var express = require('express');
var router = express.Router();

/* POST new orders */
router.post('/add', function(req, res, next) {

  //Skapa order
  req.app.locals.db.collection('orders').insertOne(req.body)

  .then(results => {
  res.send(req.body.products);
  });

  //Products
  req.app.locals.db.collection('products').find().toArray()
  
  .then(results => {

    
    
    for (product in results) {
      console.log(results[product].lager)
    }
    console.log(req.body.products);

  })

});

/* GET orders listing. */
router.get('/', function(req, res, next) {
  res.send('Orders router');
});
module.exports = router;
