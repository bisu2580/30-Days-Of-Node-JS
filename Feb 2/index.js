//Write files asynchronously in node js
const fs = require("fs").promises
const path = require("path")
const writeFileContent = async (userPath, content) => {
	try {
		let filename = path.basename(userPath)
		if (!filename)
			throw new Error(
				"Error writing to file: ENOENT: no such file or directory..."
			)
		else {
			await fs.writeFile(userPath, content, "utf-8")
			console.log("Data written to output1.txt")
		}
	} catch (err) {
		console.error(err.message)
	}
}
const testcase1 =
	"C:\\Users\\BISWA\\OneDrive\\Desktop\\30-Days-Of-Node-JS\\Feb 2\\test-files\\output1.txt"
const testcase2 =
	"C:\\Users\\BISWA\\OneDrive\\Desktop\\30-Days-Of-Node-JS\\Feb 2\\test-files\\non-existent-folder\\output.txt"
// Calling the function with three different file paths
const output = async () => {
	console.log("Test Case 1: ")
	await writeFileContent(testcase1, "Sample Content")
	console.log("Test Case 2: ")
	await writeFileContent(testcase2, "Content in non existent folder")
}
output()
