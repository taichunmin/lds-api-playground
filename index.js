'use strict'

const _ = require('lodash')
const axios = require('axios')

class LdsApi {
  constructor (token) {
    this.token = token
  }
}

module.exports = LdsApi
