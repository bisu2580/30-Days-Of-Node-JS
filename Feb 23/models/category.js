const mongoose = require("mongoose")
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
	},
})
const Category = mongoose.model("Category", categorySchema)
categorySchema.methods.create = function () {
	return this.save()
}
module.exports = Category
