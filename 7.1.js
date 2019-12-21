/* eslint-disable eqeqeq */
'use strict'
const fs = require('fs')
const inputRaw = fs.readFileSync('./input-7.1.txt', 'utf-8')
const PHASES_SETTING = generateAllPossiblePhases()
let INPUT_SIGNAL = 0
let THRUSTER_SIGNAL

inputRaw.trim().split('\n').forEach(line => {
  const data = line.trim().split(',')
  // console.log(data)
  const max = PHASES_SETTING.reduce((acc, phases) => {
    for (let i = 0; i < 5; i++) {
      if (i === 0) INPUT_SIGNAL = 0 // reset input signal
      process([...data], [...phases], i)
    }
    if (acc < THRUSTER_SIGNAL) {
      acc = THRUSTER_SIGNAL
    }
    return acc
  }, 0)
  console.log(max)
})

function process (input, phases, num) {
  // console.log(`process(input, phaseSetting = ${phases[num]}, inputSignal = ${INPUT_SIGNAL})`)
  const c = input.length
  for (let i = 0; i < c; i += 2) {
    // console.log(input[i])
    const val = String(input[i]).split('').reverse()
    // console.log(val)
    const [opcode, mode1, mode2] = [parseInt(`${val[1] || ''}${val[0]}`, 10), val[2] || 0, val[3] || 0]
    // console.log([opcode, mode1, mode2, mode3])
    if (opcode === 99) {
      break // exits for loop
    }
    //
    const param1 = (mode1 == 0) ? parseInt(input[input[i + 1]], 10) : parseInt(input[i + 1], 10)
    const param2 = (mode2 == 0) ? parseInt(input[input[i + 2]], 10) : parseInt(input[i + 2], 10)
    //
    if (opcode === 1) {
      input[input[i + 3]] = param1 + param2
      i += 2
    } else if (opcode === 2) {
      input[input[i + 3]] = param1 * param2
      i += 2
    } else if (opcode === 3) {
      const phaseSetting = phases[num]
      input[input[i + 1]] = phaseSetting
      // next time we go here, use output from previous amplifier instead
      phases[num] = INPUT_SIGNAL
    } else if (opcode === 4) {
      INPUT_SIGNAL = param1
      if (num === 4) THRUSTER_SIGNAL = param1
    } else if (opcode === 5) {
      if (param1 != 0) i = param2 - 2
      else i += 1
    } else if (opcode === 6) {
      if (param1 == 0) i = param2 - 2
      else i += 1
    } else if (opcode === 7) {
      input[input[i + 3]] = param1 < param2 ? 1 : 0
      i += 2
    } else if (opcode === 8) {
      input[input[i + 3]] = param1 == param2 ? 1 : 0
      i += 2
    }
  }
}

function generateAllPossiblePhases () {
  const phases = [0, 1, 2, 3, 4]
  const combinations = []
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if ([i].includes(j)) continue
      for (let k = 0; k < 5; k++) {
        if ([i, j].includes(k)) continue
        for (let l = 0; l < 5; l++) {
          if ([i, j, k].includes(l)) continue
          for (let m = 0; m < 5; m++) {
            if ([i, j, k, l].includes(m)) continue
            combinations.push([i, j, k, l, m].map(x => phases[x]))
          }
        }
      }
    }
  }
  return combinations
}
