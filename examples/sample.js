(async function main() {
   const path = require('path')
   const { v2: { Grib } } = require('../dist/lib')
   const grib = await Grib.fromFile(path.resolve(__dirname, '../data/sample.grib2'))
   console.log({ grib })
})().catch(console.error)
