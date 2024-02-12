const express = require("express")
const rateLimit = require("express-rate-limit")
const app = express()

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	max: 10,
	message: "Too many requests from this IP,please try again later.",
})

app.use("/", limiter)

app.get("/", (req, res) => {
	res.send("Hello World!")
})

app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).json({ errors: [{ title: "Internal Server Error" }] })
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
