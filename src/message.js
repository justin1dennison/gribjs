import { ByteReader } from "@justin1dennison/bytesjs"
import {
  header,
  identification,
  local,
  grid,
  product,
  dataRepresentation,
  bitmap,
  data,
} from "./sections"
import { InvalidMessageVersionError, InvalidMessageError } from "./errors"
import {
  GRIB_MESSAGE_ENDING,
  MAGIC_IDENTIFIER,
  VERSION_OFFSET,
} from "./constants"

const GribVersion = Object.freeze({
  One: 1,
  Two: 2,
})

export default class Message {
  constructor(buf) {
    this.reader = ByteReader.of(buf)
    const version =
      buf.readUInt8(VERSION_OFFSET) === GribVersion.One
        ? GribVersion.One
        : GribVersion.Two
    if (version === GribVersion.Two) {
      this.header = header(this.reader) //TODO: fix header read
      this.identification = identification(this.reader)
      this.local = local(this.reader)
      this.grid = grid(this.reader)
      this.product = product(this.reader)
      this.dataRepresentation = dataRepresentation(this.reader)
      this.bitmap = bitmap(this.reader)
      // TODO: Figure out if the data section is optional

      if (!this.end()) this.data = data(this.reader)
    } else if (version === GribVersion.One) {
      const magic = this.reader.string({ length: 4 })
      if (magic !== MAGIC_IDENTIFIER) throw new InvalidMessageError()
      this.totalLength = this.reader.uint24()
      this.version = this.reader.uint8()
      this.product = ((reader) => {
        const length = reader.uint24()
        const parameterTableVersion = reader.uint8()
        const center = reader.uint8()
        const generatingProcessId = reader.uint8()
        const gridId = reader.uint8()
        const gdsOrBmsFlag = reader.uint8()
        const indicatorOfParameterAndUnits = reader.uint8()
        const indicatorOfTypeOfLevelOrLayer = reader.uint8()
        const levelValue = reader.uint16()
        const year = reader.uint8()
        const month = reader.uint8()
        const day = reader.uint8()
        const hour = reader.uint8()
        const minute = reader.uint8()
        const forecastTimeUnit = reader.uint8()
        const periodOfTime1 = reader.uint8()
        const periodOfTime2 = reader.uint8()
        const timeRangeIndicator = reader.uint8()
        const averageOrAccumulationNumber = reader.uint16()
        const numberMissingFromAverageOrAccumulations = reader.uint8()
        const centuryOfInitialReferenceTime = reader.uint8()
        const subcenterId = reader.uint8()
        const scaleFactor = reader.int16()

        return {
          length,
          parameterTableVersion,
          center,
          generatingProcessId,
          gridId,
          gdsOrBmsFlag,
          indicatorOfParameterAndUnits,
          indicatorOfTypeOfLevelOrLayer,
          levelValue,
          year,
          month,
          day,
          hour,
          minute,
          forecastTimeUnit,
          periodOfTime1,
          periodOfTime2,
          timeRangeIndicator,
          averageOrAccumulationNumber,
          numberMissingFromAverageOrAccumulations,
          subcenterId,
          scaleFactor,
          centuryOfInitialReferenceTime,
        }
      })(this.reader)
      //TODO: parse grib message Version 1
    } else {
      throw new InvalidMessageVersionError()
    }
  }

  /**
   * @returns {boolean} - the message at the end
   */
  end() {
    const tag = this.reader.string({ length: 4 })
    this.reader.rewind(4)
    return tag === GRIB_MESSAGE_ENDING
  }

  /**
   * @returns {Date}
   */
  get date() {
    const { year, month, day, hour, minute, second } = this.identification
    return new Date(year, month - 1, day, hour, minute, second)
  }

  static from(buf) {
    return new Message(buf)
  }
}
