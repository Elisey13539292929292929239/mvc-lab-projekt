const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required:true }, 
	receiptId: { type: mongoose.Schema.Types.ObjectId, ref: 'Receipt', required: true },
	comment: {type: String, required:true}
})

module.exports = mongoose.model("Comment", CommentSchema)
