const nodeCache = require("node-cache")
const cache = new nodeCache()
function cachingMiddleware(time) {
	return (req, res, next) => {
		const key = req.originalUrl
		const cachedData = cache.get(key)
		if (cachedData) {
			console.log(`Found data for ${key}`)
			res.send(cachedData)
			return
		}
		console.log(`No data found for ${key}`)
		res.send = (body) => {
			cache.set(key, body, time)
			res.send = res.__proto__.send
			res.send(body)
		}
		next()
	}
}
module.exports = cachingMiddleware
