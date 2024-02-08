var express = require('express');
var router = express.Router();
const ObjectId = require('mongodb').ObjectId;

/* GET products listing. */
router.get('/', function(req, res, next) {

  req.app.locals.db.collection('products').find().toArray()

  .then(results => {

    for (product in results) {
      results[product].id = results[product]._id;
      delete results[product]._id;
    }

    res.json(results);
    console.log(results);
  })
}); 

/*Specific product*/
router.get('/:id', (req, res) => {
  let id = req.params.id;
  let oid = new ObjectId(req.params.id);
  console.log(id); 
  req.app.locals.db.collection('products').find({"_id": oid}).toArray()
  .then(results => {
    console.log(results[0].name);
    //res.json(results);

    res.json({Artikelnr: id, Artikel: results[0].name, Artikel: results[0].name, Beskrivning: results[0].description, Pris: results[0].price, Lager: results[0].lager}); 
    
    /* for (product in results) {
      let objId = results[product]._id.toString();
      if (objId === id) {
        console.log(results[product]);
        res.json(results[product])
      }
    }  */
  })
})

/* Post products */
router.post('/add', (req, res) => {

  req.app.locals.db.collection('products').insertOne(req.body)
  .then(results => {
    res.json({Artikelnr: results.insertedId, Artikel: req.body.name, Bekrivning: req.body.description, Pris: req.body.price, Lager: req.body.lager }); 
  }) 
})

module.exports = router;
