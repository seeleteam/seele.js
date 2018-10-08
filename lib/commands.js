
var commands = module.exports.commands = [
    'getInfo',
    'getBlock'
]

module.exports.isCommand = function(command) {
  for (var i=0, len=commands.length; i<len; i++) {
    if (commands[i] === command) {
        return true
    }
  }
}