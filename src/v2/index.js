import { ByteReader } from "@justin1dennison/bytesjs"
import { promises as fs } from "fs"

class ProductType {
  constructor(type, value) {
    this.type = type
    this.value = value
  }
  inspect() {
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

export const indicator = (reader) => {
  const magic = reader.string({ length: 4 })
  const throwAway = reader.uint16()
  const productType = ProductType.from(reader.uint8())
  const version = reader.uint8()
  const length = Number(reader.uint64())
  return { magic, productType, version, length, throwAway }
}

export class Grib {
  constructor(buf) {
    this.reader = ByteReader.of(buf)
    this.indicator = indicator(this.reader)
  }

  static async fromFile(filepath) {
    const buffer = await fs.readFile(filepath)
    return new Grib(buffer)
  }
}
