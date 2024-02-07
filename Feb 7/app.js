const express = require("express")
const app = express()

function requestLoggerMiddleware(req, res, next) {
	const timestamp = new Date().toISOString()
	const method = req.method
	console.log(`${timestamp} - ${method} request received`)
	next()
}

//Use of Middleware
app.use(requestLoggerMiddleware)

app.get("/", (req, res) => {
	res.send("Hi I am Biswajit Sahoo:)")
})

app.listen(3000, () => console.log("Server is running on port 3000"))
