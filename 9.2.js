/* eslint-disable eqeqeq */
'use strict'
const fs = require('fs')
const inputRaw = fs.readFileSync('./input-9.1.txt', 'utf-8')
const INPUT = 2

inputRaw.trim().split('\n').forEach(line => {
  const data = line.trim().split(',')
  process(data)
})

function process (input) {
  const c = input.length
  let relativeBase = 0
  for (let i = 0; i < c; i += 2) {
    const val = String(input[i]).split('').reverse()
    const [opcode, mode1, mode2, mode3] = [parseInt(`${val[1] || ''}${val[0]}`, 10), val[2] || 0, val[3] || 0, val[4] || 0]
    if (opcode === 99) {
      console.log('HALT')
      return input
    }
    //
    let addr1
    if (mode1 == 0) {
      addr1 = parseInt(input[i + 1], 10)
    } else if (mode1 == 1) {
      addr1 = i + 1
    } else if (mode1 == 2) {
      addr1 = parseInt(input[i + 1], 10) + relativeBase
    }
    input[addr1] = input[addr1] || 0
    const param1 = parseInt(input[addr1], 10)
    //
    let addr2
    if (mode2 == 0) {
      addr2 = parseInt(input[i + 2], 10)
    } else if (mode2 == 1) {
      addr2 = i + 2
    } else if (mode2 == 2) {
      addr2 = parseInt(input[i + 2], 10) + relativeBase
    }
    input[addr2] = input[addr2] || 0
    const param2 = parseInt(input[addr2], 10)
    //
    let addr3
    if (mode3 == 0) {
      addr3 = parseInt(input[i + 3], 10)
    } else if (mode3 == 1) {
      addr3 = i + 3
    } else if (mode3 == 2) {
      addr3 = parseInt(input[i + 3], 10) + relativeBase
    }
    //
    if (opcode === 1) {
      // console.log(i, input.slice(i, i + 4))
      input[addr3] = param1 + param2
      i += 2
    } else if (opcode === 2) {
      // console.log(i, input.slice(i, i + 4))
      input[addr3] = param1 * param2
      i += 2
    } else if (opcode === 3) {
      // console.log(i, input.slice(i, i + 2))
      input[addr1] = INPUT
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
      input[addr3] = param1 < param2 ? 1 : 0
      i += 2
    } else if (opcode === 8) {
      // console.log(i, input.slice(i, i + 4))
      input[addr3] = param1 == param2 ? 1 : 0
      i += 2
    } else if (opcode === 9) {
      // console.log(i, input.slice(i, i + 4))
      relativeBase += param1
    }
    //
  }
  return input
}
