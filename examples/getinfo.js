// var seelejs = require('seele.js');
var seelejs  = require('../src/seele');

var client = new seelejs("http://127.0.0.1:8037", "", "username", "userpwd", 0);

// async - Call mode 1
let sendR = client.send("getInfo");
sendR.then(data => {
    console.log("data")
    console.log(data)
}).catch(err => {
    console.log("err")
    console.log(err)
})

// async - Call mode 2
let execR = client.exec("getInfo");
execR.then(data => {
    console.log("data")
    console.log(data)
}).catch(err => {
    console.log("err")
    console.log(err)
})

// async - Call mode 3
client.getInfo().then(data => {
    console.log("data")
    console.log(data)
}).catch(err => {
    console.log("err")
    console.log(err)
})

// sync - Call mode 1
let info = client.sendSync("getInfo");
console.log(info);

// sync - Call mode 2
let execI = client.execSync("getInfo");
console.log(execI);
