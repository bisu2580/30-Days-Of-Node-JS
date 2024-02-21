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
	age: {
		type: Number,
		required: true,
	},
})
async function addUserWithValidation(user) {
	try {
		await user.validate()
		const saved = await user.save()
		console.log("User added successfully:", saved)
	} catch (err) {
		console.error("Error adding user:", err.message)
	}
}
async function averageAgeOfUsers(req, res) {
	try {
		let users = await User.find()
		if (users.length === 0) {
			return res.status(404).json({ message: "No users found" })
		}
		let totalAge = 0
		for (const user of users) {
			totalAge += user.age
		}

		const averageAge = totalAge / users.length

		res.json({ average: averageAge })
		console.log("Average age fetched successfully...")
	} catch (err) {
		console.error("Error occurred while calculating average age:", err)
		res.status(500).json({ message: "Internal server error" })
	}
}
const User = mongoose.model("User", userSchema)
const user1 = new User({
	username: "Biswajit Sahoo",
	email: "biswa@example.com",
	age: 23,
})
const user2 = new User({
	username: "Amit Behera",
	email: "amit123@gmail.com",
	age: 24,
})
const user3 = new User({
	username: "John Doe",
	email: "johndoe123@gmail.com",
	age: 45,
})
// addUserWithValidation(user1)
// addUserWithValidation(user2)
// addUserWithValidation(user3)
async function connectToMongoDB() {
	mongoose.connect("mongodb://127.0.0.1/myDataBase")
	const db = await mongoose.connection
	db.on("error", (err) => {
		console.log(`Error connecting to database: ${err}`)
	}).once("open", () => {
		console.log("Connected to MongoDB")
		return db
	})
}
connectToMongoDB()
app.get("/average-age", averageAgeOfUsers)
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`)
})
