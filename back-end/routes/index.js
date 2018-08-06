var passport = require('passport')
require('../passport')(passport)
var express = require('express')
var router = express.Router()
const Hash = require('../models/Hash')

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  function (req, res, next) {
    var token = getToken(req.headers)
    if (token) {
      return next()
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' })
    }
  },
  function (req, res, next) {
    console.log('kdfjskdfs')
    res.send('Welcome, create an account or login')
  }
)

router.get(
  '/generateDummyHash',
  passport.authenticate('jwt', { session: false }),
  function (req, res, next) {
    var token = getToken(req.headers)
    if (token) {
      return next()
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' })
    }
  },
  function (req, res, next) {
    res.send({
      0: { name: 'First hash', hash: '00000000000000000000000000000000' },
      1: { name: 'Second hash', hash: '00000000000000000000000000000001' }
    })
  }
)

router.post(
  '/calculateHash',
  passport.authenticate('jwt', { session: false }),
  function (req, res, next) {
    var token = getToken(req.headers)
    if (token) {
      var newHash = new Hash({
        data: req.body.data,
        algorithm: req.body.algorithm,
        iteration: req.body.iteration,
        hash: req.body.hash
      })
      newHash.save(function (err) {
        if (err) {
          return res.json({
            success: false,
            msg: 'Hash could not be created.'
          })
        }
        res.json({ success: true, msg: 'New hash created successfully.' })
      })
    } else {
      return res.status(403).send({ success: false, msg: 'Unauthorized.' })
    }
  }
)

let getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ')
    if (parted.length === 2) {
      return parted[1]
    } else {
      return null
    }
  } else {
    return null
  }
}

module.exports = router
