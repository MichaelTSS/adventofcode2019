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
    this.image = []
  }

  makeLayers () {
    const size = this.width * this.height
    while (this.input.length > 0) {
      this.layers.push(this.input.splice(0, size))
    }
  }

  solve () {
    // find layer with the least 0s
    const image = this.layers.reduce((acc, layer) => {
      const c = acc.length
      for (let i = 0; i < c; i++) {
        if ((acc[i] == null) || (acc[i] === '2')) {
          acc[i] = layer[i]
        }
      }
      return acc
      //
    }, new Array(this.width * this.height))
    //
    while (image.length > 0) {
      const line = image.splice(0, this.width).join('')
      console.log(line.replace(/1/g, 'o').replace(/0/g, ' '))
    }
  }
}

inputRaw.trim().split('\n').forEach(line => {
  const data = line.trim().split('')
  // console.log(data)
  const image = new Image(25, 6, data)
  image.makeLayers()
  image.solve()
})
