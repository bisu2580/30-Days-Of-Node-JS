const express = require("express")
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 3001
const mongoURL = "mongodb://127.0.0.1/myDataBase"
const Product = require("./models/product")
const Category = require("./models/category")
var app = express()
const jsonParser = bodyParser.json()
app.use(jsonParser)
function connectToMongoDB() {
	mongoose.connect(mongoURL)
	const db = mongoose.connection
	db.on("error", (err) => {
		console.log(`Error connecting to database: ${err}`)
	}).once("open", () => {
		console.log("Connected to MongoDB")
	})
}
async function getProductsPopulatedWithCategory(req, res) {
	try {
		let products = await Product.find().populate("category")
		if (products.length == 0) {
			console.log("No product found in the DataBase.")
			return
		}
		console.log(`${products.length} products found in the DataBase.`)
		console.log("Products Populated with Category")
		res.send(products)
		return products
	} catch (e) {
		console.log(e)
	}
}
async function main() {
	try {
		const category1 = await Category.create({
			name: "Electronics",
			description: "This is Electronic Section.",
		})
		const category2 = await Category.create({
			name: "Grocery",
			description: "Food for human consumption.",
		})
		await Product.create([
			{
				name: "iPhone XR 64GB Black",
				price: 90000,
				quantity: 2,
				category: category1._id,
			},
			{
				name: "Macbook Pro",
				price: 230000,
				quantity: 1,
				category: category1._id,
			},
			{
				name: "Yipee chowmin",
				price: 30,
				quantity: 12,
				category: category2._id,
			},
			{
				name: "Dalda Oil",
				price: 100,
				quantity: 5,
				category: category2._id,
			},
		])
		console.log("Database synced")
		console.log("Product Saved successfully")
	} catch (err) {
		console.log("Error: ", err.message)
		return
	}
}
connectToMongoDB()
main()
app.get("/", (req, res) => {
	res.send("Welcome to my products page")
})
app.get("/products", getProductsPopulatedWithCategory)
app.listen(PORT, () => {
	console.log("Server is running on port", PORT)
})
