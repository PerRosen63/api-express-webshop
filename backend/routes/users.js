var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  
  //req.app.locals.db.collection('users').find().project({"password": 0}).toArray()
  req.app.locals.db.collection('users').find().toArray()

  .then(results => {

    for (user in results) {
      delete results[user].password;
      results[user].id = results[user]._id;
      delete results[user]._id;
    }

    res.json(results);
    console.log(results);
  })
});

/*Specifik user*/
router.post('/', (req, res) => {
  let id = req.body.id;
  //console.log(id);
  req.app.locals.db.collection('users').find().toArray()
  .then(results => {
    
    for (user in results) {
      let objId = results[user]._id.toString();
      if (objId === id) {
        console.log(results[user]);
        res.json(results[user])
      }
    }
  })

})

/* Post users */
router.post('/add', (req, res) => {

  req.app.locals.db.collection('users').insertOne(req.body)
  .then(results => {
    //let objId = results.insertedId;
    //console.log();
    res.json({id: results.insertedId}); 
  }) 
})

/*Logga in user*/
router.post('/login', (req, res) => {
  let email = req.body.email;
  console.log(email);
  req.app.locals.db.collection('users').find().toArray()
  .then(results => {
    
    for (user in results) {
      let objId = results[user]._id.toString();
      if (objId === id) {
        console.log(results[user]);
        res.json(results[user])
      }
    }
  })

})

module.exports = router;
