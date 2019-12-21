/* eslint-disable eqeqeq */
'use strict'
const fs = require('fs')
const inputRaw = fs.readFileSync('./input-8.1.txt', 'utf-8')

class Image {
  constructor (width, height, input) {
    this.width = width
    this.height = height
    this.input = input
    this.layers = []
  }

  makeLayers () {
    const size = this.width * this.height
    while (this.input.length > 0) {
      this.layers.push(this.input.splice(0, size))
    }
  }

  solve () {
    // find layer with the least 0s
    const { layer } = this.layers.reduce((acc, layer) => {
      const count = layer.filter(x => x === '0').length
      if (acc.count == null) {
        acc = { layer, count }
      } else if (count < acc.count) {
        acc = { layer, count }
      }
      return acc
      //
    }, { layer: [], count: null })
    // count number of 1s and 2s
    return layer.filter(x => x === '1').length * layer.filter(x => x === '2').length
  }
}

inputRaw.trim().split('\n').forEach(line => {
  const data = line.trim().split('')
  // console.log(data)
  const image = new Image(25, 6, data)
  image.makeLayers()
  console.log(image.solve())
})
