const commands = require("../src/commands")

var result = commands.isCommand("getInfo")

console.log("result:"+result)

var namespace = commands.getNamespace("getReceiptByTxHash")

console.log("namespace:"+namespace)