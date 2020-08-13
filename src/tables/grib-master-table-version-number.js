import util from "util"

export default class GribMasterTableVersionNumber {
  constructor(type, value) {
    this.type = type
    this.value = value
  }

  [util.inspect.custom]() {
    return this.toString()
  }

  toString() {
    return `GribMasterTableVersionNumber#${this.value} - ${this.type}`
  }

  static from(n) {
    switch (n) {
      case 0:
        return new GribMasterTableVersionNumber("Experimental", n)
      case 1:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 7 November 2001",
          n
        )
      case 2:
        return new GribMasterTableVersionNumber(
          "Version Implmenented on 4 November 2003",
          n
        )
      case 3:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 2 November 2005",
          n
        )
      case 4:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 7 November 2007",
          n
        )
      case 5:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 4 November 2009",
          n
        )
      case 6:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 15 September 2010",
          n
        )
      case 7:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 4 May 2011",
          n
        )
      case 8:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 8 November 2011",
          n
        )
      case 9:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 2 May 2012",
          n
        )
      case 10:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 7 November 2012",
          n
        )
      case 11:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 8 May 2013",
          n
        )
      case 12:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 14 November 2013",
          n
        )
      case 13:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 7 May 2014",
          n
        )
      case 14:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 5 November 2014",
          n
        )
      case 15:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 6 May 2015",
          n
        )
      case 16:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 11 November 2015",
          n
        )
      case 17:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 4 May 2016",
          n
        )
      case 18:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 2 November 2016",
          n
        )
      case 19:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 3 May 2017",
          n
        )
      case 20:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 8 November 2017",
          n
        )
      case 21:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 2 May 2018",
          n
        )
      case 22:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 7 November 2018",
          n
        )
      case 23:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 15 May 2019",
          n
        )
      case 24:
        return new GribMasterTableVersionNumber(
          "Version Implemented on 06 November 2019",
          n
        )
      case 25:
        return new GribMasterTableVersionNumber(
          "Pre-operational to be implemented by next amendment",
          n
        )
      default:
        if (n <= 26 && n <= 254)
          return new GribMasterTableVersionNumber("Future Version", n)
        else return new GribMasterTableVersionNumber("Missing", n)
    }
  }
}
