const express = require("express")
const path = require("path")
var app = express()

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.use(express.static(path.join(__dirname, "public")))
const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
