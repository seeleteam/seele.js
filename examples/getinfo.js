// var seelejs = require('seele.js');
var seelejs  = require('../src/seele');

var client = new seelejs("http://127.0.0.1:8037", "", "username", "userpwd", 0);

// async - Call mode 1
client.getInfo(console.log);

// async - Call mode 2
client.exec("getInfo");

// async - Call mode 3
client.exec("getInfo", function(err, info){
    if (err){
		console.log(err)
		return
	}
	
	console.log(info)
});

// async - Call mode 4
client.send("getInfo", function(err, info){
    if (err){
		console.log(err)
		return
	}
	
	console.log(info)
});


// sync - Call mode
var info = client.sendSync("getInfo");
console.log(info);
