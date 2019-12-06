/* eslint-disable eqeqeq */
'use strict'
const fs = require('fs')
const inputRaw = fs.readFileSync('./input-5.1.txt', 'utf-8')
const INPUT = 5

inputRaw.trim().split('\n').forEach(line => {
  const data = line.trim().split(',')
  process(data)
})

function process (input) {
  const c = input.length
  for (let i = 0; i < c; i += 2) {
    const val = String(input[i]).split('').reverse()
    const [opcode, mode1, mode2] = [parseInt(`${val[1] || ''}${val[0]}`, 10), val[2] || 0, val[3] || 0]
    if (opcode === 99) {
      console.log('HALT')
      return input
    }
    //
    const param1 = (mode1 == 0) ? parseInt(input[input[i + 1]], 10) : parseInt(input[i + 1], 10)
    const param2 = (mode2 == 0) ? parseInt(input[input[i + 2]], 10) : parseInt(input[i + 2], 10)
    //
    if (opcode === 1) {
      // console.log(i, input.slice(i, i + 4))
      input[input[i + 3]] = param1 + param2
      i += 2
    } else if (opcode === 2) {
      // console.log(i, input.slice(i, i + 4))
      input[input[i + 3]] = param1 * param2
      i += 2
    } else if (opcode === 3) {
      // console.log(i, input.slice(i, i + 2))
      input[input[i + 1]] = INPUT
    } else if (opcode === 4) {
      // console.log(i, input.slice(i, i + 2))
      console.log('OUTPUT:', param1)
    } else if (opcode === 5) {
      // console.log(i, input.slice(i, i + 2))
      if (param1 != 0) i = param2 - 2
      else i += 1
    } else if (opcode === 6) {
      // console.log(i, input.slice(i, i + 2))
      if (param1 == 0) i = param2 - 2
      else i += 1
    } else if (opcode === 7) {
      // console.log(i, input.slice(i, i + 4))
      input[input[i + 3]] = param1 < param2 ? 1 : 0
      i += 2
    } else if (opcode === 8) {
      // console.log(i, input.slice(i, i + 4))
      input[input[i + 3]] = param1 == param2 ? 1 : 0
      i += 2
    }
    //
  }
  return input
}
// answer submitted (9775037) is too low
