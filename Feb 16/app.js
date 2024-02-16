const mongoose = require("mongoose")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3001
function connectToMongoDB() {
	mongoose.connect("mongodb://127.0.0.1/myDataBase")
	const db = mongoose.connection
	db.on("error", (err) => {
		console.log(`Error connecting to database: ${err}`)
	}).once("open", () => {
		console.log("Connected to MongoDB")
	})
}
connectToMongoDB()

app.listen(PORT, () => {
	console.log(`Connection started at port  ${PORT}`)
})
