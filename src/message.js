import { ByteReader } from "@justin1dennison/bytesjs"
import { indicator, identification, local, grid } from "./sections"
import util from 'util'

export default class Message {
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
