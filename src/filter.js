class fileter {
    constructor(seele) {
        this.seele = seele;
    }

    /**
     * Filtering transactions for a specific address based on block height, an error occurs if the
     * block height does not exist. If the height is -1, it will filter the current block.
     * When the flag is 1, the transaction `from` equal to the `address` is filtered in the block.
     * When the flag is 2, the transaction `to` equal to the `address` is filtered in the block.
     * @example
     * client.filterBlockTx(-1, "0x4c10f2cd2159bb432094e3be7e17904c2b4aeb21", "1")
     * client.filterBlockTx(1235435, "0x4c10f2cd2159bb432094e3be7e17904c2b4aeb21", "2")
     * @param {Number} height 
     * @param {String} address 
     * @param {Number} flag 1:from 2:to
     * @param {CallBack Function} fn 
     */
    blocktx(height, address, flag, fn) {
        var self = this.seele
        var block = self.sendSync("getBlock", "", height, false)

        block.transactions.forEach(txHash => {
            self.getTransactionByHash(txHash, function (err, tx) {
                if (err) {
                    console.log(err);
                    return;
                }

                if (flag === "1" && tx.transaction.from === address) {
                    fn(tx);
                }

                if (flag === "2" && tx.transaction.to === address) {
                    fn(tx);
                }
            });
        });

        fn("end");
    }

    /**
     * Filtering transactions for a specific address based on block height, an error occurs if the
     * block height does not exist. If the height is -1, it will filter the current block.
     * When the flag is 1, the transaction `from` equal to the `address` is filtered in the block.
     * When the flag is 2, the transaction `to` equal to the `address` is filtered in the block.
     * @example
     * var txs = client.filterBlockTx(-1, "0x4c10f2cd2159bb432094e3be7e17904c2b4aeb21", "1")
     * var txs = client.filterBlockTx(1235435, "0x4c10f2cd2159bb432094e3be7e17904c2b4aeb21", "2")
     * @param {Number} height 
     * @param {String} address 
     * @param {Number} flag 1:from 2:to
     * @returns {Array} txs
     */
    blocktxSync(height, address, flag) {
        var self = this.seele
        var block = self.sendSync("getBlock", "", height, false)
        var result = new Array()

        block.transactions.forEach(txHash => {
            var tx = self.sendSync("getTransactionByHash", txHash);
            if (flag === "1" && tx.transaction.from === address) {
                result.push(tx);
            }

            if (flag === "2" && tx.transaction.to === address) {
                result.push(tx);
            }
        });

        return result
    }
}

module.exports = fileter

