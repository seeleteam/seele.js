var seeleWebProvider  = require('../src/seele');

var client =new seeleWebProvider();

client.send("getTransactionByHash", "0x579786960cbb87f0a344842c5258bf45b04b084a6b966e2841710d14b5c69575", function (tx) {
    if (tx instanceof Error){
		console.log("Error")
		console.log(tx)
		return 
	}
	
	console.log(tx)
});