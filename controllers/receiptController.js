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
  // Display the list of all receipts
  async index(req, res) {
    try {
      const receipts = await Receipt.find();
      res.render('receipt/index', { receipts });
    } catch (error) {
      console.error('Error retrieving the list of receipts:', error);
      res.status(500).send('Something went wrong. Please try again.');
    }
  }

  async showForm(req, res) {
    res.render('receipt/add')
  }

  // Creating a new receipt
  async create(req, res) {
    const { name, description, receipt } = req.body;
    console.log(req.session.userId)
    //const author = req.session.userId.toString()

    const author = await User.findOne({ name: req.session.name })


    try {
      const newReceipt = new Receipt({ name, description, author: author, receipt });
      await newReceipt.save();
      res.status(201).send('Receipt successfully created!');
    } catch (error) {
      console.error('Error creating receipt:', error);
      res.status(500).send('Something went wrong. Please try again.');
    }
  }

  // Retrieving a specific receipt by ID
  async show(req, res) {
    const { id } = req.params;


    try {
      const receipt = await Receipt.findById(id);
      const comments = await Comment.find({ receiptId: id })
      console.log(comments.length)
      if (!receipt) {
        return res.status(404).send('Receipt not found.');
      }
      res.render('receipt/read', { receipt, comments });
    } catch (error) {
      console.error('Error retrieving receipt:', error);
      res.status(500).send('Something went wrong. Please try again.');
    }
  }

  async editForm(req, res) {
    const { id } = req.params
    const receiptData = Receipt.findById(id)
    if (!receiptData) {
      return res.status(404).send('Receipt not found.');
    }
    res.render('receipt/update', { receipt: receiptData })
  }

  // Updating a receipt
  async update(req, res) {
    const { id } = req.params;
    const { name, description, author, receipt } = req.body;

    try {
      const updatedReceipt = await Receipt.findByIdAndUpdate(id, { name, description, author, receipt }, { new: true });
      if (!updatedReceipt) {
        return res.status(404).send('Receipt not found.');
      }
      res.status(200).send('Receipt successfully updated!');
    } catch (error) {
      console.error('Error updating receipt:', error);
      res.status(500).send('Something went wrong. Please try again.');
    }
  }

  // Deleting a receipt
  async delete(req, res) {
    const { id } = req.params;

    try {
      const deletedReceipt = await Receipt.findByIdAndDelete(id);
      if (!deletedReceipt) {
        return res.status(404).send('Receipt not found.');
      }
      res.status(200).send('Receipt successfully deleted!');
    } catch (error) {
      console.error('Error deleting receipt:', error);
      res.status(500).send('Something went wrong. Please try again.');
    }
  }

  async like(req, res) {
    try {
      // Checking if a like by the current user for this receipt already exists
      const existingLike = await Like.findOne({ userId: req.userId, receiptId: req.body.receiptId });

      if (existingLike) {
        // If a like already exists, return an error
        return res.status(400).json({ message: 'Like already added' });
      }

      const user = await User.findOne({ name: req.session.name })

      // Creating a new like
      const like = new Like({
        userId: user,
        receiptId: req.body.receiptId
      });

      // Saving the like in the database
      await like.save();

      res.status(201).json({ message: 'Like successfully added' });
    } catch (error) {
      console.error('Error adding like:', error);
      res.status(500).json({ message: 'Something went wrong. Please try again.' });
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
    res.status(200).json({ message: 'Comment successfully added' })
  }
}

module.exports = new receiptController()