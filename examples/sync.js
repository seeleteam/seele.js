const seelejs  = require('../src/seele');
const client = new seelejs("127.0.0.1", "8037", [{'name':'Content-Type', 'value':'application/json'}], "username", "userpwd", 0);

var task1 = function(result){
    console.log("task1")
    console.log(result)
    return client.sendSync("getInfo")
}

var task2 = function(result){
    console.log("task2")
    console.log(result)
    return result.Coinbase
}

var callback = function(result){
    console.log("callback")
    console.log(result)
}

let promise = client.sendSync("getBlock", "", 1, false)
promise.then(task1).then(task2).then(callback).catch(function(err){
    console.log(err);
})
