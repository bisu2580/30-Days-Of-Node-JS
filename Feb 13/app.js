const express = require("express")
const http = require("http")
const socket = require("ws")
var app = express()
const PORT = process.env.PORT || 3000
const server = http.createServer(app)
const wss = new socket.Server({ server })

wss.on("connection", (ws) => {
	console.log("Client connected successfully!!")
	ws.on("message", (message) => {
		console.log(`Received message: ${message}`)
		ws.send(message)
	})
	ws.on("close", () => {
		console.log("Client disconnected")
	})
})

app.get("/websocket", (req, res) => {
	res.sendFile(__dirname + "/index.html")
})

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}...`)
})
