const mongoose = require('mongoose')

const ReceiptSchema = new mongoose.Schema({
	name: {type: String, unique:true, required:true},
	description: {type: String, required: true},
	author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required:true},
	receipt: {type: String, required: true}
})

module.exports = mongoose.model('Receipt', ReceiptSchema)