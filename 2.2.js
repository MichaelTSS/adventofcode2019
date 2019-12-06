'use strict'
const fs = require('fs')
const inputRaw = fs.readFileSync('./input-2.1.txt', 'utf-8')

inputRaw.trim().split('\n').forEach(line => {
  const data = line.trim().split(',').map(x => parseInt(x, 10))
  for (let i = 0; i < 99; i++) {
    for (let j = 0; j < 99; j++) {
      const input = [data[0], i, j, ...data.slice(3)]
      const result = process(input)
      if (result === 19690720) {
        console.log(100 * i + j)
        return
      }
    }
  }
})

function process (input) {
  const c = input.length
  for (let i = 0; i < c; i += 4) {
    if (input[i] === 99) return input[0]
    else if (input[i] === 1) { input[input[i + 3]] = input[input[i + 1]] + input[input[i + 2]] }
    else if (input[i] === 2) { input[input[i + 3]] = input[input[i + 1]] * input[input[i + 2]] }
  }
  return input[0]
}
