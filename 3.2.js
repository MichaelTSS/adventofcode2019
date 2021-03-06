'use strict'
const fs = require('fs')
const inputRaw = fs.readFileSync('./input-3.1.txt', 'utf-8')

const data = []

inputRaw.trim().split('\n').forEach(line => {
  data.push(line.trim().split(','))
  //
})

console.log(resolve(data))

// ==================

function resolve (data) {
  const [path1, path2] = [computePath(data[0]), computePath(data[1])]
  const max = Math.max(path1.length, path2.length)
  const combinedSteps = []
  for (let radius = 1; radius < max; radius++) {
    if (path1[radius] == null) continue
    if (path2[radius] == null) continue
    //
    const count = path1[radius].length
    for (let i = 0; i < count; i++) {
      const match = path2[radius].findIndex(coordinates => {
        if (coordinates[0] === path1[radius][i][0]) {
          // console.log(coordinates, path1[radius][i])
          combinedSteps.push(coordinates[1] + path1[radius][i][1])
        }
      })
      // console.log(path1[radius][i], path2[radius][match])
      if (match > -1) return radius
    }
  }
  return Math.min(...combinedSteps)
}

function getRadisuFromOrigin (x, y) {
  return Math.abs(x) + Math.abs(y)
}

function computePath (input) {
  const path = []
  input.reduce((acc, x) => {
    const [letter, num] = [x[0], parseInt(x.slice(1), 10)]
    // console.log(letter, num, acc)
    for (let index = num; index > 0; index--) {
      if (letter === 'U') acc[1] += 1
      else if (letter === 'D') acc[1] -= 1
      else if (letter === 'R') acc[0] += 1
      else if (letter === 'L') acc[0] -= 1
      //
      const radius = getRadisuFromOrigin(...acc)
      if (path[radius] == null) path[radius] = []
      acc[2] += 1
      path[radius].push([[acc[0], acc[1]].join(';'), acc[2]])
    }
    return acc
  }, [0, 0, 0])
  return path
}
