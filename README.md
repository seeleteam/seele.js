# SeeleJS

SeeleJS is a generic scripting API library for the Seele blockchain.

`npm install seele.js`

Due to problems with the keccak library, some errors will occur during installation, but if `Keccak bindings compilation fail. Pure JS implementation will be used.` Occurs, it doesn't matter, the package is normal. Follow-up will consider blocking this error.

```js
> keccak@1.4.0 install C:\Users\dell-20\Downloads\testTx\node_modules\keccak
> npm run rebuild || echo "Keccak bindings compilation fail. Pure JS implementation will be used."


> keccak@1.4.0 rebuild C:\Users\dell-20\Downloads\testTx\node_modules\keccak
> node-gyp rebuild


C:\Users\dell-20\Downloads\testTx\node_modules\keccak>if not defined npm_config_node_gyp (node "C:\Users\dell-20\AppData\Roaming\npm\node_modules\npm\node_modules\npm-lifecycle\node-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" rebuild )  else (node "C:\Users\dell-20\AppData\Roaming\npm\node_modules\npm\node_modules\node-gyp\bin\node-gyp.js" rebuild )
gyp ERR! configure error
gyp ERR! stack Error: Can't find Python executable "python", you can set the PYTHON env variable.
gyp ERR! stack     at PythonFinder.failNoPython (C:\Users\dell-20\AppData\Roaming\npm\node_modules\npm\node_modules\node-gyp\lib\configure.js:484:19)
gyp ERR! stack     at PythonFinder.<anonymous> (C:\Users\dell-20\AppData\Roaming\npm\node_modules\npm\node_modules\node-gyp\lib\configure.js:509:16)
gyp ERR! stack     at C:\Users\dell-20\AppData\Roaming\npm\node_modules\npm\node_modules\graceful-fs\polyfills.js:284:29
gyp ERR! stack     at FSReqWrap.oncomplete (fs.js:152:21)
gyp ERR! System Windows_NT 10.0.17134
gyp ERR! command "D:\\nodejs\\node.exe" "C:\\Users\\dell-20\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild"
gyp ERR! cwd C:\Users\dell-20\Downloads\testTx\node_modules\keccak
gyp ERR! node -v v8.11.4
gyp ERR! node-gyp -v v3.8.0
gyp ERR! not ok
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! keccak@1.4.0 rebuild: `node-gyp rebuild`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the keccak@1.4.0 rebuild script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
npm WARN Local package.json exists, but node_modules missing, did you mean to install?

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\dell-20\AppData\Roaming\npm-cache\_logs\2018-10-12T05_58_12_276Z-debug.log
"Keccak bindings compilation fail. Pure JS implementation will be used."

> secp256k1@3.5.2 install C:\Users\dell-20\Downloads\testTx\node_modules\secp256k1
> npm run rebuild || echo "Secp256k1 bindings compilation fail. Pure JS implementation will be used."


> secp256k1@3.5.2 rebuild C:\Users\dell-20\Downloads\testTx\node_modules\secp256k1
> node-gyp rebuild


C:\Users\dell-20\Downloads\testTx\node_modules\secp256k1>if not defined npm_config_node_gyp (node "C:\Users\dell-20\AppData\Roaming\npm\node_modules\npm\node_modules\npm-lifecycle\node-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" rebuild )  else (node "C:\Users\dell-20\AppData\Roaming\npm\node_modules\npm\node_modules\node-gyp\bin\node-gyp.js" rebuild )
gyp ERR! configure error
gyp ERR! stack Error: Can't find Python executable "python", you can set the PYTHON env variable.
gyp ERR! stack     at PythonFinder.failNoPython (C:\Users\dell-20\AppData\Roaming\npm\node_modules\npm\node_modules\node-gyp\lib\configure.js:484:19)
gyp ERR! stack     at PythonFinder.<anonymous> (C:\Users\dell-20\AppData\Roaming\npm\node_modules\npm\node_modules\node-gyp\lib\configure.js:509:16)
gyp ERR! stack     at C:\Users\dell-20\AppData\Roaming\npm\node_modules\npm\node_modules\graceful-fs\polyfills.js:284:29
gyp ERR! stack     at FSReqWrap.oncomplete (fs.js:152:21)
gyp ERR! System Windows_NT 10.0.17134
gyp ERR! command "D:\\nodejs\\node.exe" "C:\\Users\\dell-20\\AppData\\Roaming\\npm\\node_modules\\npm\\node_modules\\node-gyp\\bin\\node-gyp.js" "rebuild"
gyp ERR! cwd C:\Users\dell-20\Downloads\testTx\node_modules\secp256k1
gyp ERR! node -v v8.11.4
gyp ERR! node-gyp -v v3.8.0
gyp ERR! not ok
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! secp256k1@3.5.2 rebuild: `node-gyp rebuild`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the secp256k1@3.5.2 rebuild script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.
npm WARN Local package.json exists, but node_modules missing, did you mean to install?

npm ERR! A complete log of this run can be found in:
npm ERR!     C:\Users\dell-20\AppData\Roaming\npm-cache\_logs\2018-10-12T05_58_13_344Z-debug.log
"Secp256k1 bindings compilation fail. Pure JS implementation will be used."
```

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

client.getInfo(console.log);

client.exec("getInfo", function(err, info) {
  if (err) {
    return console.log(err);
  }

  console.log(info);
});

client.send("getInfo");
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
