import { ByteReader } from "@justin1dennison/bytesjs"
import { promises as fs } from "fs"
import {
  ProductType,
  GribMasterTableVersionNumber,
  GribLocalTableVersionNumber,
  ReferenceTimeSignificance,
  ProductionStatusOfData,
  TypeOfData,
  SourceOfGridDefinition
} from "../tables"
import util from 'util'

const MAGIC_IDENTIFIER = 'GRIB'

class InvalidMessageError extends Error {}

export const indicator = (reader) => {
  const magic = reader.string({ length: 4 })
  const throwAway = reader.uint16()
  const productType = ProductType.from(reader.uint8())
  const version = reader.uint8()
  const length = Number(reader.uint64())
  return { magic, productType, version, length, throwAway }
}

// Add Validation
export const identification = (reader) => {
  const length = reader.int32()
  const numberOfSection = reader.int8()
  const center = reader.uint16()
  const subcenter = reader.uint16()
  const gribMasterTableVersion = GribMasterTableVersionNumber.from(
    reader.int8()
  )
  const gribLocalTableVersion = GribLocalTableVersionNumber.from(reader.int8())
  const significanceReferenceTime = ReferenceTimeSignificance.from(
    reader.int8()
  )
  const year = reader.uint16()
  const month = reader.int8()
  const day = reader.int8()
  const hour = reader.int8()
  const minute = reader.int8()
  const second = reader.int8()
  const productionStatusOfProcessedData = ProductionStatusOfData.from(
    reader.int8()
  )
  const processedDataType = TypeOfData.from(reader.int8())
  return {
    length,
    numberOfSection,
    center,
    subcenter,
    gribMasterTableVersion,
    gribLocalTableVersion,
    significanceReferenceTime,
    year,
    month,
    day,
    hour,
    minute,
    second,
    productionStatusOfProcessedData,
    processedDataType,
  }
}

const local = (reader) => {
  const length = reader.int32()
  const numberOfSection = reader.uint8()
  const localUse = reader.int8Array({length: length - 5 })
  return { length, numberOfSection, localUse }
}

const grid = (reader) => {
  const length = reader.int32()
  const numberOfSection = reader.int8()
  const source = SourceOfGridDefinition.from(reader.int8())
  const numberOfDataPoints = reader.int32()
  const numberOfOptionalOctets = reader.int8()
  const interpetationOfListOfNumbers = reader.int8()
  const gridTemplateDefinitionNumber = reader.int16()
  return {
    length,
    numberOfSection,
    source,
    numberOfDataPoints,
    numberOfOptionalOctets,
    interpetationOfListOfNumbers,
    gridTemplateDefinitionNumber,
  }
}


const messages = (reader) => {
  const ms = []
  while(!reader.done()) {
   const { magic, length } = indicator(reader)
   reader.rewind(16)  // 
   if(magic !== MAGIC_IDENTIFIER) throw new InvalidMessageError('magic number is invlaid')
   ms.push(Message.from(reader.read(length)))
  }
  return ms
}


export class Grib {
  constructor(buf) {
    this.reader = ByteReader.of(buf) 
    this.messages = messages(this.reader)
  }
  static async fromFile(filepath) {
    const buffer = await fs.readFile(filepath)
    return new Grib(buffer)
  }
  [util.inspect.custom]() {
     const { messages } = this
     return { messages }
  }
}

export class Message {
  constructor(buf) {
    this.reader = ByteReader.of(buf)
    this.indicator = indicator(this.reader)
    this.identification = identification(this.reader)
    this.local = local(this.reader)
    this.grid = grid(this.reader)
  }
  
  [util.inspect.custom]() {
    const { indicator } = this
    return { indicator } 
  }

  get referenceDate() {
    const { year, month, day, hour, minute, second } = this.identification
    return new Date(year, month - 1, day, hour, minute, second)
  }

  static from(buf) {
     return new Message(buf)       
  } 
  
  static async fromFile(filepath) {
    const buffer = await fs.readFile(filepath)
    return new Message(buffer)
  }

}
