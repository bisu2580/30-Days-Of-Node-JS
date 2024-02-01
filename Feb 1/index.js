//Read files asynchronously in node js
const fs = require("fs").promises
const { error } = require("console")
const path = require("path")
const readFileContent = async (userPath) => {
	try {
		const data = await fs.readFile(userPath)
		console.log("Content: " + data)
	} catch (err) {
		console.error(err.message)
	}
}
const testcase1 =
	"C:\\Users\\BISWA\\OneDrive\\Desktop\\30-Days-Of-Node-JS\\Feb 1\\test-files\\file1.txt"
const testcase2 =
	"C:\\Users\\BISWA\\OneDrive\\Desktop\\30-Days-Of-Node-JS\\Feb 1\\test-files\\empty-file.txt"
const testcase3 =
	"C:\\Users\\BISWA\\OneDrive\\Desktop\\30-Days-Of-Node-JS\\Feb 1\\test-files\\nonexistent-file.txt"
// Calling the function with three different file paths
const output = async () => {
	console.log("Test Case 1: ")
	await readFileContent(testcase1)
	console.log("Test Case 2: ")
	await readFileContent(testcase2)
	console.log("Test Case 3: ")
	await readFileContent(testcase3)
}
output()
