const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

function positiveIntegerHandler(req, res, next) {
	const number = parseInt(req.query.number)
	try {
		if (number > 0 && Number.isInteger(number)) {
			// console.log("Success: Number is a positive integer")
			res.status(200).send(`Success: ${number} is a positive integer`)
		} else {
			throw new Error("Error 404: The inputted value is not a positive integer")
		}
	} catch (err) {
		err.status = 404
		next(err)
	}
}
function handleError(err, req, res, next) {
	res.status(err.status || 500).send(err.message || "Internal Server Error")
}
app.get("/positive", positiveIntegerHandler)
app.use(handleError)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
