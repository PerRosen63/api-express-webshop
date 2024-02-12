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
    //console.log(results);
  })
});

/*POST Get specific user*/
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

/* POST users */
router.post('/add', (req, res) => {

  req.app.locals.db.collection('users').insertOne(req.body)
  .then(results => {
    res.json({id: results.insertedId, name: req.body.name, email: req.body.email, name: req.body.name, password: req.body.password }); 
  }) 
})

/*Logga in user*/
router.post('/login', (req, res) => {
  req.app.locals.db.collection('users').find().toArray()
  .then(results => {
    let email = req.body.email;
    let password = req.body.password;  
    
    for (user in results) {      
      let mejl = results[user].email;
      let pw = results[user].password;
      
      if ( email === mejl && pw === password ) { 
        res.json(results[user]._id);      
        console.log('rätt');    
        return; 
      }      
    }
    console.log('fel');
    res.status(401).json({message: 'Fel email eller password!'});

  })
})

module.exports = router; 
