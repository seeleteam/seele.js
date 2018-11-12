
var commands = module.exports.commands = {
  "seele" : [
    'getInfo', // no parameters
    'getBalance', // account:string - wallet address
    'addTx',
    'getAccountNonce',
    'getBlockHeight',
    'getBlock',
    'call',
    'getLogs',
    'generatePayload',
    'estimateGas',
    'isListening',
    'isSyncing'
  ],
  "txpool" : [
    'getBlockTransactionCount',
    'getTransactionByBlockIndex',
    'getTransactionByHash',
    'getReceiptByTxHash',
    'getDebtByHash',
  ],
  "network" : [
    'getPeersInfo',
    'getPeerCount',
    'getNetworkVersion',
    'getProtocolVersion',
    'getNetworkID',
  ],
  "miner" : [
    'start',
    'stop',
    'status',
    'getCoinbase',
    'setThreads',
    'setCoinbase',
    'getEngineInfo'
  ],
  "debug" : [
    'printBlock',
    'getTxPoolContent',
    'getTxPoolTxCount',
    'getPendingTransactions',
    'getPendingDebts',
    'dumpHeap'
  ]}

module.exports.isCommand = function(command) {
  for (const namespace in commands) {
    for (const key in commands[namespace]) {
      if (commands[namespace][key] === command){
        return true
      }
    }
  }
}

module.exports.getNamespace = function(command) {
  for (const namespace in commands) {
    for (const key in commands[namespace]) {
      if (commands[namespace][key] === command){
        return namespace
      }
    }
  }
}
