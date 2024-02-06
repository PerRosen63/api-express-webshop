var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongoClient = require('mongodb').MongoClient;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require('./routes/products');
var ordersRouter = require('./routes/orders');

var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoClient.connect('mongodb://127.0.0.1:27017', {
    useUnifiedTopology: true
})
.then(client => {
    console.log("Databasen är uppkopplad");

    const db = client.db("per-rosen");
    app.locals.db = db;
})

/* app.get('/donuts', (req, res) => {
    req.app.locals.db.collection("donuts").find().toArray()
    .then(result => {
        console.log("saved donut", res);
        res.json(result)
    })
});

//Fusk istället för postman:
app.get('/add', (req, res) => {
    let newDonut = {"name": "Choklad"}

    req.app.locals.db.collection("donuts").insertOne(newDonut)
    .then(result => {
        console.log("saved donut", res);
        res.json(result)
    })
    .catch(err => console.log('err', err))
}) */

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);

module.exports = app;
