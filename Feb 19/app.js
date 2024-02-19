const mongoose = require("mongoose")
const express = require("express")
const PORT = process.env.PORT || 3001
const app = express()
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
	},
})
const User = mongoose.model("User", userSchema)
async function addUserWithValidation(user) {
	try {
		await user.validate()
		const saved = await user.save()
		console.log("User added successfully:", saved)
	} catch (err) {
		console.error("Error adding user:", err.message)
	}
}
async function getAllUsers(req, res) {
	try {
		let users = await User.find()
		if (!users) return res.status(404).send("No Users Found")
		res.json(users)
	} catch (err) {
		console.log(err)
		res.status(500).send("Server Error")
	}
}
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

const user1 = new User({ username: "Biswajit", email: "Hello123@hihi.com" })
const user2 = new User({ username: "Binod", email: "binod123@world.net" })
addUserWithValidation(user1)
addUserWithValidation(user2)

app.get("/users", getAllUsers)

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
