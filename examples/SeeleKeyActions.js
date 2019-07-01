var stx = require('../src/seele.js');
// var  = require('/Users/timy/seele.js/src/seele');

// test this against the client command
// the tx struct cannot lack any of the fields as shown below, 
// except from to and payload the others should be numbers
// decimals will be ignored
// the tx.to must be a string of length 42 starting with 0x
// the privateKey must be a string of length 66 starting with 0x
// And that the privateKey must be a valid privateKey
const priKey="0xd1f3583ba224abc8c125d08456876098811dddddae6dbccc9a7a25b353de48da";
const tx = {
  "to": "0x27266c2b5706e9282546750764531c71052e0281",
  "amount": 0.4,
  "price":10.56,
  "limit":200000.1,
  "payload":"0x0101",
  "nonce": 0
}
var t1 = new SeeleKeyActions();
console.log(JSON.stringify(t1.signTx(priKey, tx),null,4))
console.log(JSON.stringify(t1.generateKeys(1),null,4))

console.log("Understand signing offline means user has to determine correct nonce, and enough balance")

//you can try:
//changing/adding/dropping a single digit in the privateKey or the to address
//change a number into a string
//drop a field,
//take away the quotation marks on to and payload
