const User = require('../models/User.js')
const Role = require('../models/Role.js')
const bcrypt = require('bcrypt')
const express = require('express')
const session = require('express-session');
const crypto = require('crypto');
const Cookies = require('js-cookie')
const app = express()
class authController {
	async index(req, res) {
		res.send('Its main page')
	}
	async showRegisterForm(req, res) {
		res.render('register')
	}

	async showLoginForm(req, res) {
		res.render('login')
	}

	async register(req, res) {
    const {
        username,
        password,
        confirmPassword
    } = req.body;


    if (password !== confirmPassword) {
        return res.status(400).send('Пароль и его подтверждение не совпадают.');
    }

    try {

        const hashedPassword = await bcrypt.hash(password, 10);
        const userRole = await Role.findOne({value: "USER"})

        const newUser = new User({
            username,
            password: hashedPassword,
            roles: [userRole.value]
        });
        await newUser.save();

		res.status(201).send('Пользователь успешно зарегистрирован!');
    } catch (error) {
        console.error('Ошибка при регистрации пользователя:', error);
        res.status(500).send('Что-то пошло не так. Пожалуйста, попробуйте снова.');
    }
}

	async login(req, res) {
    const {
        username,
        password
    } = req.body;

    try {

        const user = await User.findOne({
            username
        });


        if (!user) {
            return res.status(404).send('Пользователь не найден.');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);


        if (!passwordMatch) {
            return res.status(401).send('Неверный пароль.');
        }


        req.session.userId = user._id;
        req.session.name = user.name



        res.redirect('/dashboard')
    } catch (error) {
        console.error('Ошибка при входе в систему:', error);
        res.status(500).send('Что-то пошло не так. Пожалуйста, попробуйте снова.');
    }
}

	async dashboard(req, res) {
		res.render('dashboard')
	}
}

module.exports = new authController()