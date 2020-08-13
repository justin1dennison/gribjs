import util from "util"

export default class ProductionStatusOfData {
  constructor(type, value) {
    this.type = type
    this.value = value
  }

  [util.inspect.custom]() {
    return this.toString()
  }

  toString() {
    return `ProductionStatusOfData.${this.type}`
  }

  static from(n) {
    switch (n) {
      case 0:
        return new ProductionStatusOfData("OperationalProducts", n)
      case 1:
        return new ProductionStatusOfData("OperationalTestProducts", n)
      case 2:
        return new ProductionStatusOfData("ResearchProducts", n)
      case 3:
        return new ProductionStatusOfData("ReAnalysisProducts", n)
      case 4:
        return new ProductionStatusOfData("TIGGE", n)
      case 5:
        return new ProductionStatusOfData("TIGGETest", n)
      case 6:
        return new ProductionStatusOfData("S2SOperationalProducts", n)
      case 7:
        return new ProductionStatusOfData("S2STestProducts", n)
      case 8:
        return new ProductionStatusOfData("UERRA", n)
      case 9:
        return new ProductionStatusOfData("UERRATest", n)
      case 255:
        return new ProductionStatusOfData("Missing", n)
      default:
        if (n >= 10 && n <= 191)
          return new ProductionStatusOfData("Reserved", n)
        else if (n >= 192 && n <= 265)
          return new ProductionStatusOfData("ReservedForLocalUse", n)
        else return new ProductionStatusOfData("Unknown", n)
    }
  }
}
