const mongoose = require('mongoose')

const itemsSchema = new mongoose.Schema ({
	name: { type: String, required: true },
	color: { type: String, required: false },
	description: { type: String, required: true },
	image: { type: String }


});

const Items = mongoose.model('Items', itemsSchema);

module.exports = Items 