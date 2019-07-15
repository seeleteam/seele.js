const api  = require('./commands')
const transaction   = require('./tx')
const filter   = require('./filter')
const Wallet   = require('./wallet')
const util   = require('./utils')
const stx = require('./stx')

 // browser
if (typeof window !== 'undefined' && window.XMLHttpRequest) {
  XMLHttpRequest = window.XMLHttpRequest; // jshint ignore: line
// node
} else {
  XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; // jshint ignore: line
}

class SeeleKeyActions {
  signTx(privateKey, tx){
    var signer = new stx()
    return signer.sign(privateKey, tx)
  }
  
  generateKeys(shard){
    var wallet = new Wallet()
    return wallet.createbyshard(shard)
  }
}


/**
* SeeleWebProvider should be used to send rpc calls over http
* @param {String} host A domain name or IP address of the server to issue the request to. Default: 'localhost'.
* @param {String} port Port of remote server. Default: '8037'.
* @param {Object} headers An object containing request headers, the format must be [{'name':'', 'vaule':''}, {'name':'', 'vaule':''}...].
* @param {String} user Basic authentication i.e. 'user:password' to compute an Authorization header. Not used.
* @param {String} password Basic authentication i.e. 'user:password' to compute an Authorization header. Not used.
* @param {Number} timeout A number specifying the socket timeout in milliseconds. This will set the timeout before the socket is connected. Default: '30000'.
*/
class SeeleWebProvider {
  constructor(host, headers, user, password, timeout) {
    this.host = host || 'http://localhost:8037';
    this.headers = headers;
    this.user = user;
    this.password = password;
    this.timeout = timeout || 30000;
    this.wallet = new Wallet()
    this.util = util
  }

  /**
  * Should be called to prepare a new ClientRequest
  * @method prepareRequest
  * @param {Boolean} true if request should be async
  * @return {ClientRequest} object
  */
  prepareRequest(async) {
    var request = new XMLHttpRequest();
    request.withCredentials = false;
    request.open('POST', this.host, async);

    // user and password
    if (this.user && this.password) {
      var auth = 'Basic ' + new Buffer(this.user + ':' + this.password).toString('base64');
      request.setRequestHeader('Authorization', auth);
    }

    // headers
    request.setRequestHeader('Content-Type', 'application/json');
    if (this.headers) {
      this.headers.forEach(function (header) {
        request.setRequestHeader(header.name, header.value);
      });
    }
    return request;
  }

  /**
  * Should be called to make async request
  * @method send
  * @param {String} command
  * @return {Object} request
  * @todo Using namespace
  */
  send(command) {
    var currHost = this.host;
    return new Promise((resolve, reject) => {
      var args = Array.prototype.slice.call(arguments, 1)
      if (typeof args[args.length - 1] === 'function') {
        resolve = args[args.length - 1].bind(this);
        reject = args.pop().bind(this);
      }

      var request = this.prepareRequest(true)
      var rpcData = JSON.stringify({
        id: new Date().getTime(),
        method: api.getNamespace(command).concat("_").concat(command),
        params: args
      });

      request.onload = function () {
        if (request.readyState === 4 && request.timeout !== 1) {
          var result = request.responseText
          try {
            result = JSON.parse(result);
            if (result.error) {
              reject(args,new Error(JSON.stringify(result)));
              return;
            }

            resolve(result.result);
          } catch (exception) {
            reject(args,new Error(exception + ' : ' + JSON.stringify(result)));
          }
        }
      };

      request.ontimeout = function () {
        reject(args,new Error('CONNECTION TIMEOUT: timeout of ' + currHost + ' ms achieved'));
      };

      request.onerror = function () {
        if(request.status == 0){
          reject(args,new Error('CONNECTION ERROR: Couldn\'t connect to node '+currHost +'.'));
        }else{
          reject(args,request.statusText);
        }
      };

      try {
        request.send(rpcData);
      } catch (error) {
        reject(args,new Error('CONNECTION ERROR: Couldn\'t connect to node '+ currHost +'.'));
      }
      return request;
    })
  }

  /**
  * Should be called to make sync request
  * @method send
  * @param {String} command
  * @return {Object} result
  * @todo Using namespace
  */
  sendSync(command) {
    var args    = Array.prototype.slice.call(arguments, 1)

    var request = this.prepareRequest(false)
    var rpcData = JSON.stringify({
      id: new Date().getTime(),
      method: api.getNamespace(command).concat("_").concat(command),
      params: args
    });

    request.onerror = function () {
      throw request.statusText
    };

    try {
      request.send(rpcData);
    } catch (error) {
      console.log(error)
      throw new Error('CONNECTION ERROR: Couldn\'t connect to node '+ this.host +'.');
    }

    var result = request.responseText;

    try {
      result = JSON.parse(result);
      if (result.error) {
        throw new Error(JSON.stringify(result));
      }

      return result.result
    } catch (exception) {
      throw new Error(exception + ' : ' + JSON.stringify(result));
    }
  }

  /**
   * If an invalid command is called, it is processed
   * @param {string} command
   */
  invalid(command) {
    return console.log(new Error('No such command "' + command + '"'));
  }

  /**
   * Executes the given command with optional arguments. Function `callback` defaults to `console.log`.
   * All of the API commands are supported in lowercase or camelcase. Or uppercase. Anycase!
   * @param {string} command
   */
  exec(command) {
    var func = api.isCommand(command) ? 'send' : 'invalid';
    return this[func].apply(this, arguments);
  }

  /**
   * Executes the given command with optional arguments. Function `callback` defaults to `console.log`.
   * All of the API commands are supported in lowercase or camelcase. Or uppercase. Anycase!
   * @param {string} command
   */
  execSync(command) {
    var func = api.isCommand(command) ? 'sendSync' : 'invalid';
    return this[func].apply(this, arguments);
  }

  /**
  * Generate transaction and sign, the rawTx must be in the example format, otherwise an error will occur.
  * @example
  * var privatekey = "0x24ce9cadcc9207c94296db166ab7a0fa686f2a6d29f7ea54fe8c22271c40812e"
  * var rawTx = {
  *    "From":"0xa61e5b0b30e91c4ae10dda3a6ddeb9d9d35ebfe1",
  *    "To":"0x0000000000000000000000000000000000000000",
  *    "Amount":0,
  *    "AccountNonce":123,
  *    "GasPrice":1,
  *    "GasLimit":3000000,
  *    "Timestamp":0,
  *    "Payload":"0x60806040527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff60015534801561003457600080fd5b5033600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610f0b806100856000396000f300608060405260043610610083576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632d142a99146100885780632de2c4da146100bc578063390e61541461015457806348d952e0146101b25780634eef2f46146101dd578063ab91695e1461021b578063f25b3f9914610246575b600080fd5b6100a660048036038101908080359060200190929190505050610295565b6040518082815260200191505060405180910390f35b3480156100c857600080fd5b5061013e6004803603810190808035906020019092919080359060200190929190803590602001909291908035906020019082018035906020019080806020026020016040519081016040528093929190818152602001838360200280828437820191505050505050919291929050505061042c565b6040518082815260200191505060405180910390f35b61019c6004803603810190808035906020019092919080359060200190929190803573ffffffffffffffffffffffffffffffffffffffff169060200190929190505050610968565b6040518082815260200191505060405180910390f35b3480156101be57600080fd5b506101c7610b40565b6040518082815260200191505060405180910390f35b6102056004803603810190808035906020019092919080359060200190929190505050610b46565b6040518082815260200191505060405180910390f35b34801561022757600080fd5b50610230610e3d565b6040518082815260200191505060405180910390f35b34801561025257600080fd5b5061027160048036038101908080359060200190929190505050610e43565b60405180848152602001838152602001828152602001935050505060405180910390f35b600080600090506001341015610356577f2889a9dad0676c5d3968f68aee3cf08ec189617986e3bc741824fabbae1dfddd816040518080602001838152602001806020018381038352600e8152602001807f676574426c6f636b486561646572000000000000000000000000000000000000815250602001838103825260168152602001807f4552525f4d4f4e45595f49534e4f545f454e4f55474800000000000000000000815250602001935050505060405180910390a1809150610426565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f193505050501580156103be573d6000803e3d6000fd5b506000600260008581526020019081526020016000206001015413156103e357600190505b7f9f4ffac40aa756625bacf23a6a8fd81d386dfb2878ef3b572d73d00f454f003e8382604051808381526020018281526020019250505060405180910390a18091505b50919050565b60008060009050600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561053b577f2889a9dad0676c5d3968f68aee3cf08ec189617986e3bc741824fabbae1dfddd81604051808060200183815260200180602001838103835260108152602001807f73746f7265426c6f636b48656164657200000000000000000000000000000000815250602001838103825260138152602001807f4552525f53544f52455f585f52454c4159455200000000000000000000000000815250602001935050505060405180910390a180915061095f565b600054841415156105f7577f2889a9dad0676c5d3968f68aee3cf08ec189617986e3bc741824fabbae1dfddd81604051808060200183815260200180602001838103835260108152602001807f73746f7265426c6f636b48656164657200000000000000000000000000000000815250602001838103825260118152602001807f4552525f4e4f5f505245565f424c4f434b000000000000000000000000000000815250602001935050505060405180910390a180915061095f565b600154851315156106b3577f2889a9dad0676c5d3968f68aee3cf08ec189617986e3bc741824fabbae1dfddd81604051808060200183815260200180602001838103835260108152602001807f73746f7265426c6f636b48656164657200000000000000000000000000000000815250602001838103825260188152602001807f4552525f424c4f434b5f414c52454144595f4558495354530000000000000000815250602001935050505060405180910390a180915061095f565b600060026000888152602001908152602001600020600101541315610783577f2889a9dad0676c5d3968f68aee3cf08ec189617986e3bc741824fabbae1dfddd81604051808060200183815260200180602001838103835260108152602001807f73746f7265426c6f636b486561646572000000000000000000000000000000008152506020018381038252601d8152602001807f4552525f424c4f434b5f484153485f414c52454144595f455849535453000000815250602001935050505060405180910390a180915061095f565b60008351141561083e577f2889a9dad0676c5d3968f68aee3cf08ec189617986e3bc741824fabbae1dfddd81604051808060200183815260200180602001838103835260108152602001807f73746f7265426c6f636b48656164657200000000000000000000000000000000815250602001838103825260198152602001807f4552525f5452414e53414354494f4e535f49535f454d50545900000000000000815250602001935050505060405180910390a180915061095f565b608060405190810160405280878152602001868152602001858152602001848152506002600088815260200190815260200160002060008201518160000155602082015181600101556040820151816002015560608201518160030190805190602001906108ad929190610e6d565b509050508560008190555084600181905550600190507f3d553c6a50657421fdcfde6c3ab85068b6c074a10dfc0073f149d98980d0395786868686856040518086815260200185815260200184815260200180602001838152602001828103825284818151815260200191508051906020019060200280838360005b83811015610944578082015181840152602081019050610929565b50505050905001965050505050505060405180910390a18091505b50949350505050565b6000806000806000925061097c8787610b46565b9150600082141515610a89578490508073ffffffffffffffffffffffffffffffffffffffff1663e6cb35af88886040518363ffffffff167c01000000000000000000000000000000000000000000000000000000000281526004018083815260200182815260200192505050602060405180830381600087803b158015610a0257600080fd5b505af1158015610a16573d6000803e3d6000fd5b505050506040513d6020811015610a2c57600080fd5b810190808051906020019092919050505050600192507f84ed50b3e2027837051c6eaa0464f66293959fe6892b7a62576d1ebcd53931e18684604051808381526020018281526020019250505060405180910390a1829350610b36565b7f2889a9dad0676c5d3968f68aee3cf08ec189617986e3bc741824fabbae1dfddd83604051808060200183815260200180602001838103835260108152602001807f52656c61795472616e73616374696f6e00000000000000000000000000000000815250602001838103825260108152602001807f4552525f52454c41595f56455249465900000000000000000000000000000000815250602001935050505060405180910390a18293505b5050509392505050565b60015481565b600080606060008092506001341015610c0a577f2889a9dad0676c5d3968f68aee3cf08ec189617986e3bc741824fabbae1dfddd83604051808060200183815260200180602001838103835260088152602001807f7665726966795478000000000000000000000000000000000000000000000000815250602001838103825260168152602001807f4552525f4d4f4e45595f49534e4f545f454e4f55474800000000000000000000815250602001935050505060405180910390a1829350610e34565b60066001540360026000888152602001908152602001600020600101541215610cde577f2889a9dad0676c5d3968f68aee3cf08ec189617986e3bc741824fabbae1dfddd83604051808060200183815260200180602001838103835260088152602001807f76657269667954780000000000000000000000000000000000000000000000008152506020018381038252601d8152602001807f4552525f434f4e4649524d4154494f4e535f4c4553535f5448414e5f36000000815250602001935050505060405180910390a1829350610e34565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc349081150290604051600060405180830381858888f19350505050158015610d46573d6000803e3d6000fd5b5060026000878152602001908152602001600020600301805480602002602001604051908101604052809291908181526020018280548015610da757602002820191906000526020600020905b815481526020019060010190808311610d93575b50505050509150600090505b8151811015610df157848282815181101515610dcb57fe5b906020019060200201511415610de45760019250610df1565b8080600101915050610db3565b7f7a2933ac2a256db068a8aec8c8977f9866040648de7e973edfb5387e64a3d66a8584604051808381526020018281526020019250505060405180910390a18293505b50505092915050565b60005481565b60026020528060005260406000206000915090508060000154908060010154908060020154905083565b828054828255906000526020600020908101928215610ea9579160200282015b82811115610ea8578251825591602001919060010190610e8d565b5b509050610eb69190610eba565b5090565b610edc91905b80821115610ed8576000816000905550600101610ec0565b5090565b905600a165627a7a72305820fe072090d013b0fe073954d6379f9f21b04b42bce53ca7a5ab469c3b0631bbf10029"
  * }
  * tx = generateTx(privatekey, rawTx)
  * @method generateTx
  * @param {Object} privatekey
  * @param {Object} rawTx
  * @return {Object} tx
  */
  generateTx(privatekey, rawTx) {
    if (privatekey.slice(0, 2) === "0x") {
      privatekey = privatekey.slice(2);
    }

    var tx = new transaction(rawTx);
    var hashBuffer = tx.hash();
    tx.Hash = "0x" + hashBuffer.toString('hex');

    var signBuffer = tx.sign(hashBuffer, Buffer.from(privatekey, 'hex'));
    tx.Signature = { "Sig": signBuffer.toString('base64') };
    return tx;
  }
  /**
   * Filtering transactions for a specific address based on block height, an error occurs if the
   * block height does not exist. If the height is -1, it will filter the current block.
   * When the flag is 1, the transaction `from` equal to the `address` is filtered in the block.
   * When the flag is 2, the transaction `to` equal to the `address` is filtered in the block.
   * @example
   * var txs = client.filterBlockTx(-1, "0x4c10f2cd2159bb432094e3be7e17904c2b4aeb21", "1")
   *
   * client.filterBlockTx(1235435, "0x4c10f2cd2159bb432094e3be7e17904c2b4aeb21", "2", function(txs){
   *     console.log(txs)
   * })
   * @param {Number} height
   * @param {String} address
   * @param {Number} flag 1:from 2:to
   */
  filterBlockTx(height, address, flag) {
    return new filter(this).blocktxSync(height, address, flag)
  }
}

for (const namespace in api.commands) {
  api.commands[namespace].forEach(command => {
    var cp = SeeleWebProvider.prototype
    cp[command] = function() {
      return this.send(command, ...arguments);
    }
  })
}

if (typeof window !== 'undefined' && typeof window.SeeleWebProvider === 'undefined'){
  window.SeeleWebProvider = SeeleWebProvider;
}
if(typeof global !== 'undefined') {
  global.SeeleWebProvider = SeeleWebProvider;
}

// module.exports = {  SeeleKeyActions };
module.exports = SeeleKeyActions;
if (typeof window !== 'undefined' && typeof window.SeeleKeyActions === 'undefined'){
  window.SeeleKeyActions = SeeleKeyActions;
}
if(typeof global !== 'undefined') {
  global.SeeleKeyActions = SeeleKeyActions;
}
