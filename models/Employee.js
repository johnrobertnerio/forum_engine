 const mongoose = require('mongoose')
const Schema = mongoose.Schema

const employeeSchema = new Schema({
	username: {
		type: String
	},
	comment: {
		type: String
	},
	password: {
		type: String
	}
}, {timestamps: true})

module.exports = mongoose.model('Employee', employeeSchema);