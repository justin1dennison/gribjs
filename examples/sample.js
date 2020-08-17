(async function main() {
   const jsonify = (obj) => JSON.stringify(obj, null, 2)
   const select = (...keys) => obj => keys.reduce((acc, k) => {
       acc[k] = obj[k]
       return acc
   }, {})
   const path = require('path')
   const {  Grib } = require('../dist/lib')
   const filepath = path.resolve(__dirname, '../data/sample.grib2')
   const ds = await Grib.fromFile(filepath)
   console.log(ds.messages.map(select('identification', 'indicator')).map(jsonify).join())
})().catch(console.error)


