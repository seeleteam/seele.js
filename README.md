# SeeleJS

SeeleJS is a generic scripting API library for the Seele blockchain.

## Import

### NPM

`npm install seelejs-seeleteam@1.6.6`

> Due to problems with the keccak library, some errors will occur during installation, but if `Keccak bindings compilation fail. Pure JS implementation will be used.` occurs, it doesn't matter, the package is normal. Follow-up will consider blocking this error.

### Browser

Alternatively, if you are in the client/browser you can import `seele_browserify.js`(github.com/seeleteam/seele.js/browserify/seele_browserify.js) directly , then you can use SeeleJS.

> This file is generated using the command and runs `browserify -r ./src/seele.js:seele.js > ./browserify/seele_browserify.js` in the root folder.

```html
<script src="./browserify/seele_browserify.js"></script>
<script>
const seelejs = require('seele.js');

const client = new seelejs();
client.getInfo().then(data => {
  console.log("data")
  console.log(data)
}).catch(err => {
  console.log("err")
  console.log(err)
})
</script>
```

### Meteor

`wangff:seelejs@0.1.5` Or `meteor add wangff:seelejs@0.1.5`

Also, when you import `seele.js` /`seele_browerify.js`, the global variable `SeeleWebProvider` is set, so you can use it directly, just like:

```js
const client = new SeeleWebProvider();

client.getInfo().then(data => {
  console.log("data")
  console.log(data)
}).catch(err => {
  console.log("err")
  console.log(err)
})
```

## Example

### Async Call

These functions will return a Promise object, you can use `then` to process the result and use `catch` to handle the error.

```js
const seelejs = require('seele.js');

const client = new seelejs();
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
```

### Sync Call

```js
const seelejs = require('seele.js');

const client = new seelejs();
// sync - Call mode 1
let info = client.sendSync("getInfo");
console.log(info);

// sync - Call mode 2
let execI = client.execSync("getInfo");
console.log(execI);
```

## Options

You can pass options to the initialization function or use the default options.

```js
const seelejs = require('seele.js');

function seelejs(host, headers, user, password, timeout){
  ...
};
```

Available options and default values:

+ host(String) : The communication protocol plus the domain name or IP address plus the requested server port. Default: *`http://localhost:8037`*.
+ headers(Object) : An object containing request headers, the format must be [{'name':'', 'vaule':''}, {'name':'', 'vaule':''}...].
+ user(String) : Basic authentication i.e. 'user:password' to compute an Authorization header. `Not used`.
+ password(String) : Basic authentication i.e. 'user:password' to compute an Authorization header. `Not used`.
+ timeout(Number) : timeout A number specifying the socket timeout in milliseconds. This will set the timeout before the socket is connected. Default: *`30000`*.

## Methods

The [Seele API](https://github.com/seeleteam/go-seele/wiki/API-Document#json-rpc-list) is supported as direct methods. Use camelcase and lowercase first letter.

```js
client.getInfo().then(data => {
    console.log("data")
    console.log(data)
}).catch(err => {
    console.log("err")
    console.log(err)
})
```

### .send(command [string], ...arguments..., callback [function])

Sends the given command with optional arguments. Function `callback` defaults to `console.log`.
All of the API commands are supported in camelcase and lowercase first letter.

```js
client.send("getBlock", "", 1, false).then(data => {
    console.log("data")
    console.log(data)
}).catch(err => {
    console.log("err")
    console.log(err)
})
```

### .sendSync(command [string], ...arguments...)

Sends the given command with optional arguments. This function will return a Promise object, and
you can use to handle the result. All of the API commands are supported in camelcase and lowercase first letter.

```js
var result = client.sendSync("getInfo")
console.log("sendSync"+JSON.stringify(result))
```

### .exec(command [string], ...arguments..., callback [function])

Executes the given command with optional arguments. Function `callback` defaults to `console.log`.
All of the API commands are supported in camelcase and lowercase first letter.

```js
client.exec("getInfo");

client.exec("getInfo").then(data => {
    console.log("data")
    console.log(data)
}).catch(err => {
    console.log("err")
    console.log(err)
})
```

### .execSync(command [string], ...arguments...)

Executes the given command with optional arguments. This function will return a Promise object, and
you can use to handle the result. All of the API commands are supported in camelcase and lowercase first letter.

```js
var result = client.execSync("getInfo")
console.log("execSync"+JSON.stringify(result))
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

### .filterBlockTx(height [Number], address [Hex String], flag [Number]) return txs [Array - tx JSON]

Filtering transactions for a specific address based on block height, an error occurs if the block height does not exist. If the height is -1, it will filter the current block. When the flag is 1, the transaction `from` equal to the `address` is filtered in the block. When the flag is 2, the transaction `to` equal to the `address` is filtered in the block.

```js
var txs = client.filterBlockTx(-1, "0x4c10f2cd2159bb432094e3be7e17904c2b4aeb21", "2")
console.log("sync:"+JSON.stringify(txs))
```

## Properties

### .wallet

This object is used to create the Seele account and export/import the keystore file.

+ shardnum(Number) : The Seele shard number. Default: *`2`*.
+ accounts(Array) : The accounts[i] means the wallet contains the accounts of the shard i+1. Default: *`[[],[]]`*.

#### Method

##### .create() return keypair [JSON String, contains 'publickey' and 'privatekey']

Create a Seele account for the random shard.

```js
let keypair = client.wallet.create()
console.log(keypair)
```

##### .createbyshard(shard [Number]) return keypair [JSON String, contains 'publickey' and 'privatekey' Hex String]

Create a Seele account for the specified shard.

```js
let keypair = client.wallet.createbyshard(2)
console.log(keypair)
```

##### .getshardnum(publickey [Hex String]) return shard [Number]

Calculate the shard of the publickey.

```js
let keypair = client.wallet.create()
let shard = client.wallet.getshardnum(keypair.publickey)
console.log(shard)
```
