const util = require('../src/utils')
const seelejs = require('../src/seele')

console.log(util.toFan(0.5)) // 50000000
console.log(util.toFan(0.000000018)) // 1
console.log(util.fromFan(1.5)) // 0.00000001
console.log(util.fromFan(55555555555555555555555555555555555555))
console.log(util.fromFan(0.9)) // 0

let client = new seelejs()
console.log(client.util.toFan(55555555555555555555555555555555555555)) // 5555555555555555555555555555555555555500000000
console.log(client.util.toFan(0.5)) // 50000000
console.log(client.util.toFan(0.000000018)) // 1
console.log(client.util.fromFan(1.5)) // 0.00000001
console.log(client.util.fromFan(55555555555555555555555555555555555555))
console.log(client.util.fromFan(0.9)) // 0
