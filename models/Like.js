const mongoose = require('mongoose')

const LikeSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true }, 
	receiptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt', required: true }, 
})

module.exports = mongoose.model('Like', LikeSchema)