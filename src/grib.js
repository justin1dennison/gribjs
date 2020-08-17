import util from "util"
import { ByteReader } from "@justin1dennison/bytesjs"
import { promises as fs } from "fs"
import { InvalidMessageError } from "./errors"
import { MAGIC_IDENTIFIER, HEADER_LENGTH } from "./constants"
import { header } from "./sections"
import Message from "./message"

const messages = (reader) => {
  const ms = []
  while (!reader.done()) {
    const { magic, length } = header(reader)
    reader.rewind(HEADER_LENGTH) //
    if (magic !== MAGIC_IDENTIFIER)
      throw new InvalidMessageError("magic number is invlaid")
    ms.push(Message.from(reader.read(length)))
  }
  return ms
}

export default class Grib {
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
