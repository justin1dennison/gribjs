(async function main() {
   const path = require('path')
   const { promises: fs } = require('fs')
   const {  Message } = require('../dist/lib')
   const filepath = path.resolve(__dirname, '../sample-data', 'era5-levels-members.grib')
   const buffer = await fs.readFile(filepath)
   console.log({ buffer })
   const message = new Message(buffer)
   console.log({ message })
})().catch(console.error)


