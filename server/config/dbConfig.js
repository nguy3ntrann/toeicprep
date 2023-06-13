const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL)

const conn = mongoose.connection;

conn.on('connected', () => {
    console.log('Connection Mongo OK')
})

conn.on('error', (err) => {
    console.log('Mongo failed')
})

module.exports = conn;