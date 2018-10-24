var RemixLib = require('remix-lib')
var executionContext = RemixLib.execution.executionContext
var processTx = require('./txProcess.js')

var Transactions = function (accounts) {
  this.accounts = accounts
  // TODO: fix me; this is a temporary and very hackish thing just to get the getCode working for now
  this.deployedContracts = {}
}

Transactions.prototype.methods = function () {
  return {
    etrue_sendTransaction: this.etrue_sendTransaction.bind(this),
    etrue_getTransactionReceipt: this.etrue_getTransactionReceipt.bind(this),
    etrue_getCode: this.etrue_getCode.bind(this),
    etrue_call: this.etrue_call.bind(this),
    etrue_estimateGas: this.etrue_estimateGas.bind(this)
  }
}

Transactions.prototype.etrue_sendTransaction = function (payload, cb) {
  processTx(this.accounts, payload, false, cb)
}

Transactions.prototype.etrue_getTransactionReceipt = function (payload, cb) {
  const self = this
  executionContext.web3().eth.getTransactionReceipt(payload.params[0], (error, receipt) => {
    if (error) {
      return cb(error)
    }
    self.deployedContracts[receipt.contractAddress] = receipt.data

    var r = {
      'transactionHash': receipt.hash,
      'transactionIndex': '0x00',
      'blockHash': '0x766d18646a06cf74faeabf38597314f84a82c3851859d9da9d94fc8d037269e5',
      'blockNumber': '0x06',
      'gasUsed': '0x06345f',
      'cumulativeGasUsed': '0x06345f',
      'contractAddress': receipt.contractAddress,
      'logs': receipt.logs,
      'status': 1
    }

    cb(null, r)
  })
}

Transactions.prototype.etrue_estimateGas = function (payload, cb) {
  cb(null, 3000000)
}

Transactions.prototype.etrue_getCode = function (payload, cb) {
  let address = payload.params[0]

  cb(null, this.deployedContracts[address] || '0x')
}

Transactions.prototype.etrue_call = function (payload, cb) {
  processTx(this.accounts, payload, true, cb)
}

module.exports = Transactions
