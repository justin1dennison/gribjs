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
import { InvalidMessageVersionError } from "./errors"
import { GRIB_MESSAGE_ENDING } from "./constants"

const GribVersion = Object.freeze({
  One: 1,
  Two: 2,
})

export default class Message {
  constructor(buf) {
    this.reader = ByteReader.of(buf)
    this.header = header(this.reader) //TODO: fix header read
    if (this.header.version === GribVersion.Two) {
      this.identification = identification(this.reader)
      this.local = local(this.reader)
      this.grid = grid(this.reader)
      this.product = product(this.reader)
      this.dataRepresentation = dataRepresentation(this.reader)
      this.bitmap = bitmap(this.reader)
      // TODO: Figure out if the data section is optional

      if (!this.end()) this.data = data(this.reader)
    } else if (this.header.version === GribVersion.One) {
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
