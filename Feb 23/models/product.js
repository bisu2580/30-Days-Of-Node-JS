const mongoose = require("mongoose")
const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	price: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
	},
})
const Product = mongoose.model("Product", productSchema)
productSchema.methods.create = function () {
	return this.save()
}
module.exports = Product
