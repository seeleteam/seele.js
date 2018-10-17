var seeleWebProvider  = require('../src/seele');

var client =new seeleWebProvider();
//var client =new seeleWebProvider("localhost", "9026");

// Call mode 1
client.send("getBlock", "", 1, false, function(info) {
  if (info instanceof Error){
		console.log("Error")
		console.log(info)
		return 
	}
	
	console.log(info)
});

//Call mode 2
client.getBlock("0x00000152a1442086846da01f129772d833e045b29877eb486cd4533cb07a87e1", 0, true, function(info) {
  if (info instanceof Error){
		console.log("Error")
		console.log(info)
		return 
	}
	
	console.log(info)
});
