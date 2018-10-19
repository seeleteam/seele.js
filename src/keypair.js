"use strict"
const fs = require("fs")
const path = require('path')
const scrypt = require('scrypt-js')
const elliptic = require('elliptic');
const ec = new elliptic.ec('secp256k1');
const secp256k1 = require('secp256k1');
const { randomBytes } = require('crypto')

class keyPair{
    constructor(){
        // var keyPair = ec.genKeyPair()
        // this.privateKey = keyPair.getPrivate("hex")
        // this.publicKey = keyPair.getPublic().encodeCompressed("hex")
        let privKey
        do {
            privKey = randomBytes(32)
        } while (!secp256k1.privateKeyVerify(privKey))
        
        // get the public key in a compressed format
        const pubKey = secp256k1.publicKeyCreate(privKey)
        this.privateKey = privKey.toString('hex')
        this.publicKey = pubKey.toString('hex')
    }

    // constructor(shard){
    // }

    // constructor(keyfilePath, pwd){
    //     var self = this
    //     scryptPrivFile(self, keyfilePath, pwd)
    // }

    newAccount(){
 
// generate message to sign
// const msg = randomBytes(32)
 
// generate privKey
// let privKey
// do {
//   privKey = randomBytes(32)
// } while (!secp256k1.privateKeyVerify(privKey))
 
// // get the public key in a compressed format
// const pubKey = secp256k1.publicKeyCreate(privKey)
    }
}

/**
 * According to the key file path and the password to generate the key pair
 * @example
 * var keyfilePath = "C:\\Users\\dell-20\\go\\src\\github.com\\seeleteam\\go-seele\\cmd\\client\\keyfile\\shard1-0x0a57a2714e193b7ac50475ce625f2dcfb483d741"
 * var pwd = Buffer.from("123")
 * var keypair = New KeyPair(keyfilePath, pwd)
 * @param {String} keyfilePath
 * @param {Buffer} pwd
 * @todo Need to resolve the key to ecdsa, the key is ecdsa D.
 */
function scryptPrivFile(self, keyfilePath, pwd){
    keyfilePath.split(path.sep).join('/')

    var content = fs.readFileSync(keyfilePath)
    var JSONfile = JSON.parse(content)
    var cry = JSONfile.crypto
    var salt = Buffer.from(cry.salt, "hex") 
    var N = 262144, r = 8, p = 1;
    var dkLen = 32;
    scrypt(pwd, salt, N, r, p, dkLen, function(error, progress, key) {
        if (error) {
            console.log("Error: " + error)
        } else if (key) {
            console.log("Found: " + key)
            // TODO need to resolve the key to ecdsa, the key is ecdsa D.
            let keyPair = ec.keyFromPrivate("97ddae0f3a25b92268175400149d65d6887b9cefaf28ea2c078e05cdc15a3c0a");
            let privKey = keyPair.getPrivate("hex");
            let pubKey = keyPair.getPublic().encodeCompressed("hex");
            self.privateKey = privKey
            self.publicKey = pubKey
            return this
        } else {
            // update UI with progress complete
            // updateInterface(progress)
        }
    });
}

module.exports = keyPair