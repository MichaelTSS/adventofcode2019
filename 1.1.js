'use strict'
const fs = require('fs')
const inputRaw = fs.readFileSync('./input-1.1.txt', 'utf-8')

let fuel = 0

inputRaw.trim().split('\n').forEach(line => {
  const data = line.trim().split(' ').map(x => parseInt(x, 10))
  const x = data[0]
  fuel += Math.floor(x / 3) - 2
})

console.log(fuel)
