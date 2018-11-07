const Wallet = require('../src/wallet')
const SeeleJS = require('../src/seele')

let v = new Wallet()
let keypair = v.create()
console.log(keypair)
v.getshardnum(keypair.publickey)

keypair = v.create()
console.log(keypair)
v.getshardnum(keypair.publickey)

keypair = v.createbyshard(2)
console.log(keypair)
v.getshardnum(keypair.publickey)

console.log(v)
console.log(v.shardnum)
console.log(v.accounts[1][0])
console.log(JSON.parse(v.accounts[1][0]))

console.log('==================================================')
let client = new SeeleJS()
let keypair1 = client.wallet.create()
console.log(keypair1)
let shard = client.wallet.getshardnum(keypair.publickey)
console.log(shard)
console.log(client.wallet)
