const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
	activity: {
		type: String,
		trim: true,
		required: true
	},
	type: {
		type: String,
		enum: ['charity', 'cooking', 'music', 'diy', 'education', 'social', 'busywork', 'recreational', 'relaxation'],
		required: true
	},
	participants: {
		type: Number,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	availability: {
		type: Number,
		required: true
	},
	accessibility: {
		type: String,
		enum: ['Few to no challenges', 'Minor challenges', 'Major challenges']
	},
	duration: {
		type: String,
		enum: ['minutes', 'hours', 'days', 'weeks'],
		required: true
	},
	kidFriendly: {
		type: Boolean,
		required: true
	},
	link: {
		type: String
	},
	key: {
		type: String,
		required: true
	}
}, {
	collection: 'activities'
});

module.exports = mongoose.model('Activity', activitySchema);