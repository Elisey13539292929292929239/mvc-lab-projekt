const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const crypto = require('crypto')
const session = require('express-session')
const authController = require('./controllers/authController.js')
const receiptController = require('./controllers/receiptController.js')

const app = express()

app.set('view engine', 'pug')
app.set('views', './views')

const secretKey = crypto.randomBytes(32).toString('hex');
app.use(session({
  secret: secretKey, // Secret key for signing session cookies
  resave: false,
  saveUninitialized: false
}));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.get('/', authController.index)
app.get('/register', authController.showRegisterForm)
app.get('/login', authController.showLoginForm)
app.get('/', authController.dashboard)

app.post('/register', authController.register)
app.post('/login', authController.login)

// for receipts
app.get('/receipts', receiptController.index);

// Route for displaying the form to create a new receipt
app.get('/receipts/new', receiptController.showForm);

// Route for creating a new receipt
app.post('/receipts', receiptController.create);

// Route for displaying a specific receipt
app.get('/receipts/:id', receiptController.show);

// Route for displaying the form to edit a receipt
app.get('/receipts/:id/edit', receiptController.editForm);

// Route for updating a receipt
app.put('/receipts/:id', receiptController.update);

// Route for deleting a receipt
app.delete('/receipts/:id', receiptController.delete);

app.post('/like', receiptController.like)

app.post('/comment', receiptController.comment)

const connect = async () => {
  await mongoose.connect('mongodb+srv://dolotiudima:0731163340Dima@cluster0.w1z2gnx.mongodb.net/culinary?retryWrites=true&w=majority&appName=Cluster0')
}

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

connect()