(async function main() {
   const path = require('path')
   const {  Grib } = require('../dist/lib')
   const filepath = path.resolve(__dirname, '../data/sample.grib2')
   const ds = await Grib.fromFile(filepath)
   console.log({ ds })
   console.log(ds.messages[0])
})().catch(console.error)
