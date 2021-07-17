const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReportSchema = new Schema({
	date: {
  		type: String,
  		required: true
	},
	location: {
  		type: String,
  		required: true
	},
	video: [
		{
		url: String,
		filename: String
		}
	],
	author: {
  		type: Schema.Types.ObjectId,
  		ref: 'User'}
});

module.exports = mongoose.model('Report', ReportSchema)