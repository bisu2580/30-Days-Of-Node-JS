const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

function loggingMiddleware(req, res, next) {
	const timestamp = new Date().toISOString()
	const method = req.method
	const url = req.url
	const requestHeaders = req.headers
	const requestBody = req.body

	console.log("URL: ", `https://localhost:3000${url}`)
	console.log("Timestamp: ", [`${timestamp}`])
	console.log("Method: ", [`${method}`])
	console.log("Request Headers:", requestHeaders)
	console.log("Request Body:", requestBody)
	next()
}

//Use of Middleware
app.use(loggingMiddleware)

app.get("/request", (req, res) => {
	res.setHeader("Custom-Header", "Hello from custom header!")
	res.status(200)

	// Send response body
	res.send({ message: "Hi I am Biswajit Sahoo:)" })
})

app.listen(3000, () => console.log("Server is running on port 3000"))
