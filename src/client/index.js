console.log("开始 工作了")


import React ,{ Component }from "react"
import ReactDom from "react-dom"

import App from "./components/App"

import {socket} from "./io"

socket.on("state",state => {
    console.log("开始的聊天室 信息",state)
})
// --------------------------
//
//
import {fromJS, Map, List} from "immutable"
const fakeState = {
    rooms:fromJS([
        {id:"0",name:"room1",owner:"jing"},
        {id:"1",name:"room2",owner:"hqman"},
        ]),
    currentRoom:"1",
    username:"hqman",
    messages:fromJS({
        "1":[
        {user:"hqman",content:"haha react",time:"19:00"},
        {user:"jing",content:"yeh react",time:"19:01"},
        ]
    }),
}

var $app = document.getElementById("app")

function render(){
    ReactDom.render(
        <App rooms={fakeState.rooms}
        messages={fakeState.messages}
        currentRoom={fakeState.currentRoom}
        username={fakeState.username} />,$app
        )
}

render()

