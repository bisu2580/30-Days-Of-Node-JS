const express = require("express")
const jwt = require("jsonwebtoken")
const secretKey = "My_secret_key"
const app = express()

function authenticationMiddleware(req, res, next) {
	const token = req.headers.authorization
	if (!token) {
		return res.status(401).json({ error: "Unauthorised: No token provided." })
	}
	jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
		if (err) {
			return res.status(401).send({ error: "Unauthorized:  Invalid Token." })
		}
		req.user = decoded
		next()
	})
}

app.use("/api", authenticationMiddleware)

app.get("/api/protected", (req, res) => {
	console.log(req.user)
	res.send("You accessed a protected route!")
})

// Generating JWT Tokens
const userTest = {
	id: 1,
	username: "test",
}
const generatedToken = jwt.sign(userTest, secretKey)
console.log("Token: " + generatedToken)

app.listen(3000, () => {
	console.log(`Server is running on port 3000`)
})
