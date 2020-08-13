import util from "util"

export default class ReferenceTimeSignificance {
  constructor(type, value) {
    this.type = type
    this.value = value
  }

  [util.inspect.custom]() {
    return this.toString()
  }

  toString() {
    return `ReferenceTimeSignificance.${this.type}`
  }

  static from(n) {
    switch (n) {
      case 0:
        return new ReferenceTimeSignificance("Analysis", n)
      case 1:
        return new ReferenceTimeSignificance("StartOfForecast", n)
      case 2:
        return new ReferenceTimeSignificance("VerifyingTimeOfForecast", n)
      case 4:
        return new ReferenceTimeSignificance("ObservationTime", n)
      case 255:
        return new ReferenceTimeSignificance(
          Symbol("ReferenceTimeSignificance.Missing"),
          undefined
        )
      default:
        if (n >= 4 && n <= 191)
          return new ReferenceTimeSignificance("Reserved", n)
        else return new ReferenceTimeSignificance("Reserved for Local Use", n)
    }
  }
}
