# SeeleJS

SeeleJS is a generic scripting API library for the Seele blockchain.

`npm install seele.js`

> Due to problems with the keccak library, some errors will occur during installation, but if `Keccak bindings compilation fail. Pure JS implementation will be used.` occurs, it doesn't matter, the package is normal. Follow-up will consider blocking this error.

## Example

If the last parameter is not bound to a callback function, the console.log is used by default.

```js
var seelejs = require('seele.js');

var client = new seelejs();
client.getInfo(function(err, info) {
  if (err) {
    return console.log(err);
  }

  console.log(info);
});

client.exec("getInfo", console.log);

client.exec("getBlock", "", 1, false, console.log);

client.send("getBlock", "", 1, false, function(err, info) {
  if (err) {
    return console.log(err);
  }

  console.log(info);
});
```

## Options

You can pass options to the initialization function or use the default options.

```js
var seelejs = require('seele.js');

function seelejs(host, port, headers, user, password, timeout){
  ...
};
```

Available options and default values:

+ host(String) : A domain name or IP address of the server to issue the request to. Default: *localhost*.
+ port(String) : ort Port of remote server. Default: *8037*.
+ headers(Object) : An object containing request headers, the format must be [{'name':'', 'vaule':''}, {'name':'', 'vaule':''}...].
+ user(String) : Basic authentication i.e. 'user:password' to compute an Authorization header. Not used.
+ password(String) : Basic authentication i.e. 'user:password' to compute an Authorization header. Not used.
+ timeout(Number) : timeout A number specifying the socket timeout in milliseconds. This will set the timeout before the socket is connected. Default: *30000*.

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

### .generateTx(privatekey [Hex String], rawTx [JSON String]) return tx [Object]

Generate transaction and sign, the rawTx must be in the example format, otherwise an error will occur.

```js
var privatekey = "0x24ce9cadcc9207c94296db166ab7a0fa686f2a6d29f7ea54fe8c22271c40812e"
var rawTx = {
  "From":"0xa61e5b0b30e91c4ae10dda3a6ddeb9d9d35ebfe1",
  "To":"0x0000000000000000000000000000000000000000",
  "Amount":0,
  "AccountNonce":123,
  "GasPrice":1,
  "GasLimit":3000000,
  "Timestamp":0,
  "Payload":""
}

tx = generateTx(privatekey, rawTx)
```
