const mongoose =  require('mongoose');

//Schema for an institution
const institutionSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	category: {
		type: String,
		enum: ['Public', 'Private', 'College of Education'],
		default: 'Public'
	},
	courses: {
		type: Object,
		required: true
	},
	state: {
		type: String,
		required: false
	},
});

const Institution = mongoose.model('school', institutionSchema);

module.exports = Institution;