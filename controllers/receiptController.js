const Receipt = require('../models/Receipt.js')
const Like = require('../models/Like.js')
const User = require('../models/User.js')
const Cookies = require('js-cookie')
const session = require('express-session')
const express = require('express')
const crypto = require('crypto');
const Comment = require('../models/Comment.js')
const app = express()



class receiptController {
  // Отображение списка всех рецептов
  async index(req, res) {
    try {
      const receipts = await Receipt.find();
      res.render('receipt/index', { receipts, current: req.session.userId });
    } catch (error) {
      console.error('Ошибка при получении списка рецептов:', error);
      res.status(500).send('Что-то пошло не так. Пожалуйста, попробуйте снова.');
    }
  }

  async showForm(req, res) {
    res.render('receipt/add')
  }

  // Создание нового рецепта
  async create(req, res) {
    const { name, description, receipt } = req.body;
    console.log(req.session.userId)
    //const author = req.session.userId.toString()

    const author = await User.findOne({ name: req.session.name })


    try {
      const newReceipt = new Receipt({ name, description, author: author, receipt });
      await newReceipt.save();
      res.status(201).send('Рецепт успешно создан!');
    } catch (error) {
      console.error('Ошибка при создании рецепта:', error);
      res.status(500).send('Что-то пошло не так. Пожалуйста, попробуйте снова.');
    }
  }

  // Получение конкретного рецепта по ID
  async show(req, res) {
    const { id } = req.params;


    try {
      const receipt = await Receipt.findById(id);
      const comments = await Comment.find({ receiptId: id })
      console.log(comments.length)
      if (!receipt) {
        return res.status(404).send('Рецепт не найден.');
      }
      res.render('receipt/read', { receipt, comments });
    } catch (error) {
      console.error('Ошибка при получении рецепта:', error);
      res.status(500).send('Что-то пошло не так. Пожалуйста, попробуйте снова.');
    }
  }

  async editForm(req, res) {
    const { id } = req.params
    const receipt = await Receipt.findById(id)
    console.log(receipt)
    if (!receipt) {
      return res.status(404).send('Рецепт не найден.');
    }
    res.render('receipt/update', { receipt: receipt })
  }

  // Обновление рецепта
  async update(req, res) {
    const { id } = req.params;
    const { name, description, author, receipt } = req.body;

    try {
      const updatedReceipt = await Receipt.findByIdAndUpdate(id, { name, description, author, receipt }, { new: true });
      if (!updatedReceipt) {
        return res.status(404).send('Рецепт не найден.');
      }
      res.status(200).send('Рецепт успешно обновлен!');
    } catch (error) {
      console.error('Ошибка при обновлении рецепта:', error);
      res.status(500).send('Что-то пошло не так. Пожалуйста, попробуйте снова.');
    }
  }

  // Удаление рецепта
  async delete(req, res) {
    const { id } = req.params;

    try {
      const deletedReceipt = await Receipt.findByIdAndDelete(id);
      if (!deletedReceipt) {
        return res.status(404).send('Рецепт не найден.');
      }
      res.status(200).send('Рецепт успешно удален!');
    } catch (error) {
      console.error('Ошибка при удалении рецепта:', error);
      res.status(500).send('Что-то пошло не так. Пожалуйста, попробуйте снова.');
    }
  }

  async like(req, res) {
    try {
      // Проверяем, существует ли уже лайк от текущего пользователя для данного рецепта
      const existingLike = await Like.findOne({ userId: req.userId, receiptId: req.body.receiptId });

      if (existingLike) {
        // Если лайк уже существует, возвращаем ошибку
        return res.status(400).json({ message: 'Лайк уже добавлен' });
      }

      const user = await User.findOne({ name: req.session.name })

      // Создаем новый лайк
      const like = new Like({
        userId: user,
        receiptId: req.body.receiptId
      });

      // Сохраняем лайк в базе данных
      await like.save();

      res.status(201).json({ message: 'Лайк успешно добавлен' });
    } catch (error) {
      console.error('Ошибка при добавлении лайка:', error);
      res.status(500).json({ message: 'Что-то пошло не так. Пожалуйста, попробуйте снова.' });
    }
  }

  async comment(req, res) {
    const { id, comment } = req.body
    console.log(req.body)

    const user = await User.findOne({ name: req.session.name })

    const comment_r = new Comment({
      comment: comment,
      userId: user,
      receiptId: req.body.receiptId
    })

    await comment_r.save()
    res.status(200).json({ message: 'Комментарий успешно добавлен' })
  }
}

module.exports = new receiptController()