const express = require("express")
const path = require("path")
var app = express()

function staticFileServer(req, res) {
	// Your implementation here
	if (req.url == "/") res.sendFile(path.join
	(__dirname, "public", "index.html"))
	else res.sendFile(path.join
	(__dirname, "public/styles", "style.css"))
}
app.get("/", staticFileServer)
// app.get("/styles/style.css", staticFileServer)

app.use(express.static(path.join
(__dirname, "public")))
const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log
(`Listening on ${PORT}`))
