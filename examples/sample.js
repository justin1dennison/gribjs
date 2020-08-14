(async function main() {
   const path = require('path')
   const {  Grib } = require('../dist/lib')
   const ds = await Grib.fromFile(path.resolve(__dirname, '../data/sample.grib2'))
   console.log({ ds })
})().catch(console.error)
