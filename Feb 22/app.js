const express = require("express")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 3001
const mongoURL = "mongodb://127.0.0.1/myDataBase"
var app = express()
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
})
const product = mongoose.model("product", productSchema)
function connectToMongoDB() {
	mongoose.connect(mongoURL)
	const db = mongoose.connection
	db.on("error", (err) => {
		console.log(`Error connecting to database: ${err}`)
	}).once("open", () => {
		console.log("Connected to MongoDB")
	})
}
async function createProduct(product) {
	try {
		await product.validate()
		const result = await product.save()
		console.log("Hola!! Products added successfully")
	} catch (err) {
		console.error("Error adding user:", err.message)
	}
}
async function getAllProducts(req, res) {
	try {
		let products = await product.find().sort([["price", "ascending"]])
		if (!products) return res.status(404).send("No products found")
		res.json(products)
	} catch (err) {
		console.log(err)
		res.status(500).send("Server Error")
	}
}
async function updateProduct(productId, updatedProduct) {
	try {
		const item = await product.find({ _id: productId })
		if (!item) {
			console.log("Error: Item not found")
			return
		}
		await product.findByIdAndUpdate(
			{ _id: productId },
			{
				name: updatedProduct.name,
				price: updatedProduct.price,
				quantity: updatedProduct.quantity,
			}
		)
		console.log("Item has been updated!")
	} catch (err) {
		console.log(err.message)
	}
}
async function deleteProduct(productId) {
	try {
		const item = await product.find({ _id: productId })
		if (!item) {
			console.log("Error: Item not found")
			return
		}
		await product.deleteOne({ _id: productId })
		console.log("The following item is deleted successfully:", item)
	} catch (err) {
		console.log(err)
		return
	}
}

connectToMongoDB()
const product1 = new product({ name: "iphone 8", price: 80000, quantity: 2 })
const product2 = new product({ name: "Samsung", price: 30000, quantity: 3 })
const product3 = new product({ name: "Laptop HP", price: 50000, quantity: 4 })
const modified_product = new product({
	name: "Redmi Note8 Pro",
	price: 20000,
	quantity: 3,
})
// createProduct(product1)
// createProduct(product2)
// createProduct(product3)
// deleteProduct("65d7a897b6603be35edcd679")
updateProduct("65d7a897b6603be35edcd67a", modified_product)

app.get("/", (req, res) => {
	res.send("Welcome to my products page")
})
app.get("/products", getAllProducts)
app.listen(PORT, () => {
	console.log("Server is running on port", PORT)
})
