import util from "util"

export default class SourceOfGridDefinition {
  constructor(type, value) {
    this.type = type
    this.value = value
  }

  [util.inspect.custom]() {
    return this.toString()
  }

  toString() {
    return `SourceOfGridDefinition.${this.type}`
  }

  static from(n) {
    switch (n) {
      case 0:
        return new SourceOfGridDefinition("SpecifiedInCodeTable3.1", n)
      case 1:
        return new SourceOfGridDefinition(
          "PredeterminedGridDefinitonDefinedByOriginatingCenter",
          n
        )
      case 255:
        return new SourceOfGridDefinition("Reserved", n)
      default:
        if (n >= 2 && n <= 191) return new SourceOfGridDefinition("Reserved", n)
        else if (n >= 192 && n <= 254)
          return new SourceOfGridDefinition("ReservedFroLocalUse", n)
        else return new SourceOfGridDefinition("Unknown", n)
    }
  }
}
