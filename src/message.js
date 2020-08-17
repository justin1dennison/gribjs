import { ByteReader } from "@justin1dennison/bytesjs"
import { indicator, identification, local, grid, product, data, bitmap } from "./sections"

export default class Message {
  constructor(buf) {
    this.reader = ByteReader.of(buf)
    this.indicator = indicator(this.reader)
    this.identification = identification(this.reader)
    this.local = local(this.reader)
    this.grid = grid(this.reader)
    this.product = product(this.reader)
    this.data = data(this.reader)
    this.bitmap = bitmap(this.reader)
  }

  get date() {
    const { year, month, day, hour, minute, second } = this.identification
    return new Date(year, month - 1, day, hour, minute, second)
  }

  static from(buf) {
    return new Message(buf)
  }
}
