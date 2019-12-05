/* eslint-disable no-use-before-define */
'use strict'

class Resolve {
  constructor (min, max) {
    this.min = min
    this.max = parseInt(max, 10)
    this.current = min
    this.count = 0
  }

  static isValid (value) {
    // returns bool
    const isSixDigitsLong = value.length === 6
    if (!isSixDigitsLong) return false
    //
    const hasTwoConsecutiveNumbers = (function (value) {
      for (let i = 0; i < 6; i++) {
        if (value[i] === value[i + 1]) return true
      }
      return false
    })(value)
    if (!hasTwoConsecutiveNumbers) return false
    //
    const hasOnlyIncreasingNumbers = (function (value) {
      for (let i = 0; i < 6; i++) {
        if (value[i] > value[i + 1]) return false
      }
      return true
    })(value)
    if (!hasOnlyIncreasingNumbers) return false
    return true
  }

  nextValid () {
    // sets this.current to the next available valid value
    const candidate = parseInt(this.current, 10) + 1
    if (candidate > this.max) return this.count
    if (Resolve.isValid(String(candidate))) {
      this.count += 1
      console.log(this.count)
    }
    this.current = candidate
    process.nextTick(() => this.nextValid()) // to prevent the StackOverflow
  }
}

//
//

const r = new Resolve('193651', '649729')
r.nextValid()
