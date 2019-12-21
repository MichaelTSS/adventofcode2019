/* eslint-disable eqeqeq */
'use strict'
const fs = require('fs')
const inputRaw = fs.readFileSync('./input-7.1.txt', 'utf-8')
const PHASES_SETTING = generateAllPossiblePhases()

class FeedbackLoop {
  constructor (phases, input) {
    this.phases = phases
    this.halt = false
    this.amplifiers = [
      new Amplifier('A', [...input], [this.phases[0], 0]),
      new Amplifier('B', [...input], [this.phases[1]]),
      new Amplifier('C', [...input], [this.phases[2]]),
      new Amplifier('D', [...input], [this.phases[3]]),
      new Amplifier('E', [...input], [this.phases[4]])
    ]
  }

  process () {
    this.halt = false
    let i = 0
    while (true) {
      this.halt = this.amplifiers[i].process()
      if (this.halt) break //
      const outputSignal = this.amplifiers[i].outputSignal
      if (i >= this.amplifiers.length - 1) {
        i = 0
      } else i++
      //
      // console.log('Feeding output signal to new amplifier')
      this.amplifiers[i].inputSignals.push(outputSignal)
    }
    return this.amplifiers[4].outputSignal
  }
}

class Amplifier {
  constructor (name, input, inputSignals) {
    this.name = name
    this.input = input
    this.inputSignals = inputSignals
    this.outputSignal = null
    this.i = 0
  }

  process () {
    // console.log(`Processing Amplifier ${this.name}, i=${this.i}`)
    const c = this.input.length
    for (let i = this.i; i < c; i += 2) {
      // console.log(this.input[i])
      const val = String(this.input[i]).split('').reverse()
      // console.log(val)
      const [opcode, mode1, mode2] = [parseInt(`${val[1] || ''}${val[0]}`, 10), val[2] || 0, val[3] || 0]
      // console.log([opcode, mode1, mode2, mode3])
      if (opcode === 99) {
        // console.log('===== BREAK =====')
        if (this.name !== 'E') break
        return true // exits for loop
      }
      //
      const param1 = (mode1 == 0) ? parseInt(this.input[this.input[i + 1]], 10) : parseInt(this.input[i + 1], 10)
      const param2 = (mode2 == 0) ? parseInt(this.input[this.input[i + 2]], 10) : parseInt(this.input[i + 2], 10)
      //
      if (opcode === 1) {
        this.input[this.input[i + 3]] = param1 + param2
        i += 2
      } else if (opcode === 2) {
        this.input[this.input[i + 3]] = param1 * param2
        i += 2
      } else if (opcode === 3) {
        // console.log(`${this.name} is consuming input ${[this.inputSignals.join(',')]}`)
        const phaseSetting = this.inputSignals.splice(0, 1)[0]
        this.input[this.input[i + 1]] = phaseSetting
        // next time we go here, use output from previous amplifier instead
      } else if (opcode === 4) {
        this.outputSignal = param1
        this.i = i + 2
        // console.log(`${this.name} is producing output ${this.outputSignal} leaving i=${i}`)
        break // now pause execution
      } else if (opcode === 5) {
        if (param1 != 0) i = param2 - 2
        else i += 1
      } else if (opcode === 6) {
        if (param1 == 0) i = param2 - 2
        else i += 1
      } else if (opcode === 7) {
        this.input[this.input[i + 3]] = param1 < param2 ? 1 : 0
        i += 2
      } else if (opcode === 8) {
        this.input[this.input[i + 3]] = param1 == param2 ? 1 : 0
        i += 2
      }
    }
  }
}

function generateAllPossiblePhases () {
  const phases = [5, 6, 7, 8, 9]
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

inputRaw.trim().split('\n').forEach(line => {
  const data = line.trim().split(',')
  // console.log(data)
  const max = PHASES_SETTING.reduce((acc, phases) => {
    const loop = new FeedbackLoop(phases, data)
    const thrusterSignal = loop.process()
    if (acc < thrusterSignal) {
      acc = thrusterSignal
    }
    return acc
  }, 0)
  console.log(max)
})
