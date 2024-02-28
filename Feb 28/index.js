const express = require("express")
const expressWs = require("express-ws")

const app = express()
const PORT = process.env.PORT || 3000

expressWs(app)

app.use(express.static("public"))

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index.html")
})

const clients = []

app.ws("/socket", (ws, req) => {
	console.log("WebSocket connection established")
	clients.push(ws)
	ws.on("message", (msg) => {
		console.log("Received message:", msg)
		clients.forEach((client) => {
			if (client.readyState === 1) {
				client.send(msg)
			}
		})
	})
})

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`)
})
