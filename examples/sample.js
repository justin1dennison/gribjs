(async function main() {
   const path = require('path')
   const { v2: { Grib, Message } } = require('../dist/lib')
   const grib = await Grib.fromFile(path.resolve(__dirname, '../data/sample.grib2'))
   console.log(JSON.stringify({ grib }, null, 2))
})().catch(console.error)
