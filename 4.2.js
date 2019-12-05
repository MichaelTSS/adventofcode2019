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
        if (value[i] === value[i + 1]) {
          if (i + 2 <= 6 && value[i + 1] === value[i + 2]) continue
          else if (i - 1 >= 0 && value[i - 1] === value[i]) continue
          return true
        }
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
// console.log(Resolve.isValid('112233') === true)
// console.log(Resolve.isValid('123444') === false)
// console.log(Resolve.isValid('111122') === true)
r.nextValid()
