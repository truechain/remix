var version = require('../../package.json').version
var web3 = require('web3')

var Misc = function () {
}

Misc.prototype.methods = function () {
  return {
    web3_clientVersion: this.web3_clientVersion.bind(this),
    etrue_protocolVersion: this.etrue_protocolVersion.bind(this),
    etrue_syncing: this.etrue_syncing.bind(this),
    etrue_mining: this.etrue_mining.bind(this),
    etrue_hashrate: this.etrue_hashrate.bind(this),
    web3_sha3: this.web3_sha3.bind(this)
  }
}

Misc.prototype.web3_clientVersion = function (payload, cb) {
  cb(null, 'Remix Simulator/' + version)
}

Misc.prototype.etrue_protocolVersion = function (payload, cb) {
  cb(null, '0x3f')
}

Misc.prototype.etrue_syncing = function (payload, cb) {
  cb(null, false)
}

Misc.prototype.etrue_mining = function (payload, cb) {
  // TODO: should depend on the state
  cb(null, false)
}

Misc.prototype.etrue_hashrate = function (payload, cb) {
  cb(null, '0x0')
}

Misc.prototype.web3_sha3 = function (payload, cb) {
  let str = payload.params[0]
  cb(null, web3.utils.sha3(str))
}

module.exports = Misc
