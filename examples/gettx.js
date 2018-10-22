require('../src/seele');

var client = new SeeleWebProvider();


// Error:leveldb: not found
client.send("getTransactionByHash", "0x579786960cbb87f0a344842c5258bf45b04b084a6b966e2841710d14b5c69575", function (err, tx) {
    if (err){
		console.log(err)
		return
	}
	
	console.log(tx)
});