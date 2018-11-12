var seelejs  = require('../src/seele');

var client =new seelejs();

var txs = client.filterBlockTx(-1, "0x4c10f2cd2159bb432094e3be7e17904c2b4aeb21", "2")
console.log("sync:"+JSON.stringify(txs))
