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
  secret: secretKey, // Секретный ключ для подписи сессионных куки
  resave: false,
  saveUninitialized: false
}));


app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', authController.index)
app.get('/register', authController.showRegisterForm)
app.get('/login', authController.showLoginForm)
app.get('/dashboard', authController.dashboard)


app.post('/register', authController.register)
app.post('/login',  authController.login)


//для рецептов
app.get('/receipts', receiptController.index);

// Маршрут для отображения формы создания нового рецепта
app.get('/receipts/new', receiptController.showForm);

// Маршрут для создания нового рецепта
app.post('/receipts', receiptController.create);

// Маршрут для отображения конкретного рецепта
app.get('/receipts/:id', receiptController.show);

// Маршрут для отображения формы редактирования рецепта
app.get('/receipts/:id/edit', receiptController.editForm);

// Маршрут для обновления рецепта
app.put('/receipts/:id', receiptController.update);

// Маршрут для удаления рецепта
app.delete('/receipts/:id', receiptController.delete);

app.post('/like', receiptController.like)

app.post('/comment', receiptController.comment)



const connect = async () => {
	await mongoose.connect('mongodb+srv://dolotiudima:0731163340Dima@cluster0.w1z2gnx.mongodb.net/culinary?retryWrites=true&w=majority&appName=Cluster0')
}

const port = 3000;
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

connect()