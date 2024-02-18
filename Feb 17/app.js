const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
	username: String,
	email: String,
})
function connectToMongoDB() {
	mongoose.connect("mongodb://127.0.0.1/myDataBase")
	const db = mongoose.connection
	db.on("error", (err) => {
		console.log(`Error connecting to database: ${err}`)
	}).once("open", () => {
		console.log("Connected to MongoDB")
	})
}
async function addUserToDatabase(user) {
	try {
		const result = await user.save()
		console.log(result)
	} catch (err) {
		console.log("Error adding user to database ", err)
	}
}
const User = mongoose.model("User", userSchema)
const user1 = new User({ username: "Biswa", email: "Hello123@haha.com" })
connectToMongoDB()
addUserToDatabase(user1)
