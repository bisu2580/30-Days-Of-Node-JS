const express = require("express")
const app = express()
function greetHandler(req, res) {
	const name = req.query.name
	res.send(`Hello ${!name ? "Guest" : name}!`)
}

app.get(`/greet`, greetHandler)
app.listen(3000, () => console.log("Port is Running on 3000"))
