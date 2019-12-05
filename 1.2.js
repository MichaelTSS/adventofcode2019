'use strict'
const fs = require('fs')
const inputRaw = fs.readFileSync('./input-1.1.txt', 'utf-8')

let fuel = 0

inputRaw.trim().split('\n').forEach(line => {
  const data = line.trim().split(' ').map(x => parseInt(x, 10))
  const x = data[0]
  fuel += recursiveFuelCalc(x)
})

console.log(fuel)

function recursiveFuelCalc (input) {
  const c = Math.floor(input / 3) - 2
  if (c < 0) return 0
  return c + recursiveFuelCalc(c)
}
