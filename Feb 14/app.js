const express = require("express")
var app = express()
const cachingMiddleware = require("./cacheMiddleware")
const port = process.env.PORT || 3000

app.use(cachingMiddleware(10))
app.get("/cache", (req, res) => {
	res.send("Welcome to my Express server!!")
})

app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`)
})
