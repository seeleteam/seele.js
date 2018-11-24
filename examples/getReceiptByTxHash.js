var seeleWebProvider  = require('../src/seele');

var client =new seeleWebProvider();

client.getReceiptByTxHash("0x8411dd66344a8a1a80f6702b04c7389dcbd328c102ace35b6d1dd875c32eeeb0", "", function(err, info){
    if (err){
        console.log(err)
        return
    }

    console.log(info)
});