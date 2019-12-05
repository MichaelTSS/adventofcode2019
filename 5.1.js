'use strict'
const fs = require('fs')
const inputRaw = fs.readFileSync('./input-3.1.txt', 'utf-8')

const data = []

inputRaw.trim().split('\n').forEach(line => {
  data.push(line.trim().split(','))
  //
})
