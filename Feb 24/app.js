const express = require("express")
const mongoose = require("mongoose")
var app = express()
const PORT = process.env.PORT || 3001
const mongoURL = "mongodb://127.0.0.1/myDataBase"
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
const Product = mongoose.model("Product", productSchema)
app.use(express.json())

async function createProductRoute(req, res) {
	try {
		const newProduct = { ...req.body }
		let createdProduct = await Product.create(newProduct)
		await createdProduct.save()
		console.log("Product created successfully!!!")
		res.status(200).send(createdProduct)
	} catch (err) {
		res.send(err.message).status(400)
	}
}

async function getAllProductsRoute(req, res) {
	try {
		let products = await Product.find()
		if (!products) {
			return res.status(404).send("No products found")
		}
		console.log("Hurray:Products fetched successfully!!!")
		res.status(200).json(products)
	} catch (err) {
		res.status(404).json(err)
	}
}

async function updateProductRoute(req, res) {
	try {
		const productId = req.params.id
		const updatedFields = { ...req.body }
		if (!updatedFields) {
			return res.status(400).send("Please provide new data to update")
		}
		let updatedProduct = await Product.findByIdAndUpdate(
			productId,
			updatedFields
		)
		if (!updatedProduct) {
			return res
				.status(404)
				.send("The product with the given ID was not found.")
		}
		console.log(`Product ${productId} has been updated`)
		res.status(200).send(updatedProduct)
	} catch (err) {
		res.send(err).status(500)
	}
}

async function deleteProductRoute(req, res) {
	try {
		const productId = req.params.id
		const item = await Product.find({ _id: productId })
		if (!item) {
			return res.status(404).send("No product with this id was found.")
		}
		await Product.deleteOne({ _id: productId })
		console.log(`Item ${productId} has been deleted`)
		res.status(200).send(item)
	} catch (err) {
		res.status(500).send("Server error")
	}
}
function connectToMongoDB() {
	mongoose.connect(mongoURL)
	const db = mongoose.connection
	db.on("error", (err) => {
		console.log(`Error connecting to database: ${err}`)
	}).once("open", () => {
		console.log("Connected to MongoDB")
	})
}
connectToMongoDB()
app.get("/", (req, res) => {
	res.send("Welcome to this Project")
})
app.get("/products", getAllProductsRoute)
app.post("/products/create", createProductRoute)
app.put("/products/:id", updateProductRoute)
app.delete("/products/delete/:id", deleteProductRoute)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
