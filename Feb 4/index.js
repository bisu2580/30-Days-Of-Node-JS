const path = require("path")
function resolvePath(relativePath) {
	try {
		return path.resolve(__dirname, relativePath)
	} catch (err) {
		console.log(`Error: ${err}`)
	}
}
const relativePath1 = "./file1.txt"
const relativePath2 = "../Feb1/index.js"
const relativePath3 = "../Feb2/test-files/output1.txt"

console.log("Testcase1:")
console.log(resolvePath(relativePath1))
console.log("Testcase2:")
console.log(resolvePath(relativePath2))
console.log("Testcase3:")
console.log(resolvePath(relativePath3))
