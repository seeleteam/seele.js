
var commands = module.exports.commands = [
  // baseAPI
  'getInfo', // no parameters
  'getBalance', // account:string - wallet address
  'addTx',
  'getAccountNonce',
  'getBlockHeight',
  'getBlock',
  'call',
  'getLogs',
  //txpool
  'getBlockTransactionCount',
  'getTransactionByBlockIndex',
  'getTransactionByHash',
  'getReceiptByTxHash',
  'getDebtByHash',
  //network
  'getPeersInfo',
  'getPeerCount',
  'getNetworkVersion',
  'getProtocolVersion',
  'getNetworkID',
  //miner
  'start',
  'stop',
  'status',
  'getCoinbase',
  'setThreads',
  'setCoinbase',
  'getEngineInfo',
  //debug
  'printBlock',
  'getTxPoolContent',
  'getTxPoolTxCount',
  'getPendingTransactions',
  'getPendingDebts',
  'dumpHeap'
]

module.exports.isCommand = function(command) {
  for (var i=0, len=commands.length; i<len; i++) {
    if (commands[i] === command) {
        return true
    }
  }
}