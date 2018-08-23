const mongoose = require('mongoose')
var Schema = mongoose.Schema
const config = require('../config.js')
var SHA1 = require('crypto-js/sha1')
var SHA256 = require('crypto-js/sha256')
var MD5 = require('crypto-js/md5')

mongoose.connect(
  config.mongodb,
  { useMongoClient: true }
)

var HashSchema = new Schema({
  data: {
    type: String,
    required: true
  },
  algorithm: {
    type: String,
    required: true
  },
  iteration: {
    type: Number
  },
  hash: {
    type: String
  }
})

HashSchema.pre('save', function (next) {
  let hash = this
  if (hash.algorithm === 'sha256') {
    hash.hash = SHA256(hash.data)
    for (let i = 0; i < hash.iteration; i++) {
      hash.hash = SHA256(hash.hash)
    }
    next()
  } else if (hash.algorithm === 'sha1') {
    hash.hash = SHA1(hash.data)
    for (let i = 0; i < hash.iteration; i++) {
      hash.hash = SHA1(hash.hash)
    }
    next()
  } else if (hash.algorithm === 'md5') {
    hash.hash = MD5(hash.data)
    for (let i = 0; i < hash.iteration; ++i) {
      hash.hash = MD5(hash.hash)
    }
    next()
  } else {
    console.log('Error: method not found')
    return next()
  }
})

module.exports = mongoose.model('Hash', HashSchema)
