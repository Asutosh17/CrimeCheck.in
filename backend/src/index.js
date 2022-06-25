const express = require('express')
const cors = require('cors')
const connect = require('./configs/db')


const app = express()

app.use(express.json())

app.use(cors())

const register = require("./controllers/register.controller");

app.use("/register", register);

const login = require("./controllers/login.controller");

app.use("/login", login);

const data = require("./controllers/data.controller");

app.use("/board", data);


const port =  process.env.PORT || 5000
app.listen(port, async () => {
    try{
        await connect()
        console.log(`listening to the port ${port}`)
    }
    catch(err){
        console.log(err.message)
    }
})