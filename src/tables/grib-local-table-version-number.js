import util from "util"

export default class GribLocalTableVersionNumber {
  constructor(type, value) {
    this.type = type
    this.value = value
  }

  [util.inspect.custom]() {
    return this.toString()
  }

  toString() {
    return `GribLocalTableVersionNumber#${this.value} - ${this.type}`
  }

  static from(n) {
    if (n === 0) return new GribLocalTableVersionNumber("Not Used", n)
    else if (n >= 1 && n <= 254)
      return new GribLocalTableVersionNumber("Local Table", n)
    else return new GribLocalTableVersionNumber("Missing", n)
  }
}
