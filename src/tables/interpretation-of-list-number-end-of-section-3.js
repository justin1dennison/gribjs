import util from "util"

export default class InterpretationOfListOfNumbersEndOfSection3 {
  constructor(type, value) {
    this.type = type
    this.value = value
  }

  [util.inspect.custom]() {
    return this.toString()
  }

  toString() {
    return `InterpretationOfListOfNumbersEndOfSection3.${this.type}`
  }


  static from(n) {
    switch (n) {
      case 0:
        return new InterpretationOfListOfNumbersEndOfSection3("ThereIsNoAppendedList", n)
      case 1:
        return new InterpretationOfListOfNumbersEndOfSection3("LandSurface", n)
      case 2:
        return new InterpretationOfListOfNumbersEndOfSection3("OceanGraphic", n)
      case 3:
        return new InterpretationOfListOfNumbersEndOfSection3("OceanGraphic", n)
      case 255:
	return new InterpretationOfListOfNumbersEndOfSection3("Missing", n)
      default:
	if (n >= 4 && n <= 254) return InterpretationOfListOfNumbersEndOfSection3("Reserved", n)
        return new InterpretationOfListOfNumbersEndOfSection3("InterpretationOfListOfNumbersEndOfSection3.Unknown", n)
    }
  }
}
