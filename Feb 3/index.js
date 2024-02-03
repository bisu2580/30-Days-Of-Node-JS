const { stderr } = require("process")
const cp = require("child_process").exec
function executeCommand(command) {
	cp(command, (err, stdout, stderr) => {
		if (err) {
			console.error(err)
			return
		}
		console.log(stdout)
	})
}

//Testcase1
console.log("TestCase1: ")
executeCommand("dir")
//Testcase 2
console.log("TestCase2: ")
executeCommand("echo Hello Node.Js")
