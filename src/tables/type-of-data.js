import util from "util"

export default class TypeOfData {
  constructor(type, value) {
    this.type = type
    this.value = value
  }

  [util.inspect.custom]() {
    return this.toString()
  }

  toString() {
    return `TypeOfData.${this.type}`
  }

  static from(n) {
    switch (n) {
      case 0:
        return new TypeOfData("AnalysisProducts", n)
      case 1:
        return new TypeOfData("ForecastProducts", n)
      case 2:
        return new TypeOfData("AnalysisAndForecastProducts", n)
      case 3:
        return new TypeOfData("ControlForecastProducts", n)
      case 4:
        return new TypeOfData("PerturbedForecastProducts", n)
      case 5:
        return new TypeOfData("ControlAndPerturbedForecastProducts", n)
      case 6:
        return new TypeOfData("ProcessedSatelliteObservations", n)
      case 7:
        return new TypeOfData("ProcessedRadarObservations", n)
      case 8:
        return new TypeOfData("EventProbability", n)
      case 192:
        return new TypeOfData("ExperimentalProducts", n)
      case 255:
        return new TypeOfData("Missing", n)
      default:
        if (n >= 9 && n <= 191) return new TypeOfData("Reserved", n)
        else if (n >= 192 && n <= 254)
          return new TypeOfData("ReservedForLocalUse", n)
        else return new TypeOfData("Unknown", n)
    }
  }
}
