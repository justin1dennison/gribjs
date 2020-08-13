import util from "util"

export default class ProductType {
  constructor(type, value) {
    this.type = type
    this.value = value
  }

  [util.inspect.custom]() {
    return this.toString()
  }

  toString() {
    return `ProductType.${this.type}`
  }

  static from(n) {
    switch (n) {
      case 0:
        return new ProductType("Meteorological", 0)
      case 2:
        return new ProductType("LandSurface", 2)
      case 10:
        return new ProductType("OceanGraphic", 10)
      default:
        return new ProductType(Symbol("ProductType.Unknown"), undefined)
    }
  }
}
