// var seelejs = require('seelejs');
var seelejs  = require('../src/seele');

var client = new seelejs("127.0.0.1", "8037", [{'name':'Content-Type', 'value':'application/json'}], "username", "userpwd", 0);

// Call mode 1
client.getInfo(console.log);

// Call mode 2
client.exec("getInfo");

// Call mode 3
client.exec("getInfo", function(err, info){
    if (err) {
        return console.log(err);
      }
    
      console.log(info);
});
