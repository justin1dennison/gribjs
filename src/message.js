import { ByteReader } from "@justin1dennison/bytesjs"
import {
  indicator,
  identification,
  local,
  grid,
  product,
  dataRepresentation,
  bitmap,
  data,
} from "./sections"

export default class Message {
  constructor(buf) {
    this.reader = ByteReader.of(buf)
    this.indicator = indicator(this.reader)
    this.identification = identification(this.reader)
    this.local = local(this.reader)
    this.grid = grid(this.reader)
    this.product = product(this.reader)
    this.dataRepresentation = dataRepresentation(this.reader)
    this.bitmap = bitmap(this.reader)
    // TODO: Figure out if the data section is optional
    if (this.reader.buf.slice(this.reader.position, this.reader.position + 4).toString() !== "7777")
      this.data = data(this.reader)
  }

  get date() {
    const { year, month, day, hour, minute, second } = this.identification
    return new Date(year, month - 1, day, hour, minute, second)
  }

  static from(buf) {
    return new Message(buf)
  }
}
