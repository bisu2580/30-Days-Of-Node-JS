const path = require("path")
function checkFileExtension(filePath, expectedExtension) {
	const extensionName = path.extname(filePath)
	try {
		if (extensionName !== expectedExtension) {
			throw new Error(
				`File does not have the expected extension. Expected: ${expectedExtension}, Actual: ${extensionName}`
			)
		} else {
			console.log(`File has the expected extension: ${expectedExtension}`)
		}
	} catch (err) {
		console.log(`Error: ${err}`)
	}
}
const userPath1 =
	"C:Users\\BISWA\\OneDrive\\Desktop\\30-Days-Of-Node-JS\\Feb 4\\file1.txt"
const userPath2 =
	"C:Users\\BISWA\\OneDrive\\Desktop\\30-Days-Of-Node-JS\\Feb 4\\file1.png"
console.log("testcase 1: ")
checkFileExtension(userPath1, ".txt")
console.log("testcase 2: ")
checkFileExtension(userPath2, ".jpg")
