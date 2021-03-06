import express from "express"
import {Server} from "http"


var app = express()
var http = Server(app)

//configs
var rootPath = require('path').normalize(__dirname + "/../..")
app.set("views", __dirname + "/views")
app.set("view engine", 'ejs')
app.use(express.static(rootPath + "/public"))


var io = require('socket.io')(http)
import {makeStore} from "./store"
import listenWebSocket from "./io"

const store = makeStore()

listenWebSocket(io,store)


app.get("/", (req, res) => {
    // res.send("hello wolrd!")
    res.render('index')
})


http.listen(3000, () => {
    console.log("http 30000")
})
