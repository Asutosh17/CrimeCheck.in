const mongoose = require('mongoose')

const connect = () => {
    return mongoose.connect("mongodb+srv://asutosh:enter password here@cluster0.hix5n.mongodb.net/test")
}


module.exports = connect
