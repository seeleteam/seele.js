var keccak256 = require('keccak256')
var RLP = require('rlp')
var secp256k1 = require('secp256k1')

class stx{
  // from string[66] and {}, to {}
  // tx length and validity!!!
  sign(priKey, tx){
    if (!this.txvalidity(tx)) {
      return "failed to sign"
    }
    this.timestamp=0;
    this.type=0;
    
    this.pubKey=this.pubKeyof(priKey);
    this.Data={
      "Type":       this.type,
      "From":       this.pubKey,
      "To":           tx.to,
      "Amount":       parseInt(tx.amount.toString()),
      "AccountNonce": parseInt(tx.nonce.toString()),
      "GasPrice":     parseInt(tx.price.toString()),
      "GasLimit":     parseInt(tx.limit.toString()),
      "Timestamp":  this.timestamp,
      "Payload":      tx.payload
    }
    this.hash=this.hash();
    this.sign=this.signhash(this.hash, priKey.slice(2));
    
    this.signedTransaction={
      "Hash": "0x"+this.hash,
      "Data": this.Data,
      "Signature": {
        "Sig": this.sign
      }
    }
    return this.signedTransaction
  }
  
  // from string[66] to string[42]
  // verfiy privateKey length and validity!!!
  pubKeyof(priKey){
    if (priKey.length!=66){throw "privatekey string should be of lenth 66"} 
    if (priKey.slice(0,2)!="0x"){throw "privateKey string should start with 0x"}
    const inbuf = Buffer.from(priKey.slice(2), 'hex');
    if (!secp256k1.privateKeyVerify(inbuf)){throw "invalid privateKey"}
    const oubuf = secp256k1.publicKeyCreate(inbuf, false).slice(1);
    var pubKey = keccak256(RLP.encode(oubuf)).slice(12).toString('hex') 
    return "0x"+pubKey.replace(/.$/i,"1")
  }
  
  // an internal method, not meant to be used outside
  hash(){
    var infolist = [
      this.Data.Type,
      this.Data.From,
      this.Data.To,
      this.Data.Amount,
      this.Data.AccountNonce,
      this.Data.GasPrice,
      this.Data.GasLimit,
      this.Data.Timestamp,
      this.Data.Payload
    ]
    return keccak256(RLP.encode(infolist)).toString('hex')
    
  }
  
  // from hash[256bit] and string[66] to a string[88]
  signhash(hsh, pri){
    var signature = secp256k1.sign(Buffer.from(hsh, 'hex'), Buffer.from(pri, 'hex'))
    return Buffer.concat([signature.signature,Buffer.from([signature.recovery])]).toString('base64')
  }
  
  show(){
    console.log(JSON.stringify(this.signedTransaction,null,4))
  }
  
  txvalidity(tx){
    if (typeof tx.to !== 'string' || tx.to.length!=42 || tx.to.slice(0,2)!="0x"){
      throw "invalid receiver address, should be of length 42 with prefix 0x"
      return false
    }
    if (typeof tx.payload !== 'string'){
      throw "invalid payload"
      return false
    }
    if (typeof tx.nonce !== 'number' || tx.nonce < 0) {
      console.log(typeof tx.nonce)
      throw "invalid nonce" 
      return false
    }
    if (typeof tx.amount !== 'number' || tx.amount < 0) {
      console.log(typeof tx.amount)
      throw "invalid amount" 
      return false
    }
    if (typeof tx.price !== 'number' || tx.price < 0) {
      console.log(typeof tx.price)
      throw "invalid price" 
      return false
    }
    if (typeof tx.limit !== 'number' || tx.limit < 0) {
      console.log(typeof tx.limit)
      throw "invalid limit" 
      return false
    }
    return true
    
    //nonce, amount, price and limit must be positive integers
  }
}
module.exports = stx;
