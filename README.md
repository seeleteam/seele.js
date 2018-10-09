# SeeleJS
SeeleJS is a generic scripting API library for the Seele blockchain.

`npm install seele.js`

## Example

```js
var seelejs = require('seele.js');

var client = new seelejs();
client.getInfo(function(err, info) {
  if (err) {
    return console.log(err);
  }

  console.log(info);
});
```

## Configure

The default seelejs connects to the local full node, of course you can connect to another node.

```js
var seelejs = require('seele.js');

var client = new seelejs("127.0.0.1", "8037", [{'name':'Content-Type', 'value':'application/json'}], "username", "userpwd", 0);
client.getInfo(console.log);
```

## Methods

The [Seele API](https://github.com/seeleteam/go-seele/wiki/API-Document#json-rpc-list) is supported as direct methods. Use either camelcase or lowercase.

```js
client.getInfo(function(err, info) {
  if (err) {
    return console.log(err);
  }

  console.log(info);
});
```

### .send(command [string], ...arguments..., callback [function])

Sends the given command with optional arguments. Function `callback` defaults to `console.log`.
All of the API commands are supported in lowercase or camelcase. Or uppercase. Anycase!

```js
client.send("getBlock", "", 1, false, function(err, info) {
  if (err) {
    return console.log(err);
  }

  console.log(info);
});
```

### .exec(command [string], ...arguments..., callback [function])

Executes the given command with optional arguments. Function `callback` defaults to `console.log`.
All of the API commands are supported in lowercase or camelcase. Or uppercase. Anycase!

```js
client.exec("getInfo");

client.exec("getInfo", function(err, info){
    if (err) {
        return console.log(err);
      }
    
      console.log(info);
});
```

## Options

You can pass options to the initialization function or use the default options.

```js
var client = new seelejs("127.0.0.1", "8037", [{'name':'Content-Type', 'value':'application/json'}], "username", "userpwd", 0);

var client = new seelejs();
```

Available options and default values:

+ host *localhost*
+ port *8037*
+ timeout 30000
