console.log("开始 工作了")


import React ,{ Component }from "react"
import ReactDom from "react-dom"
import {fromJS,Map,List} from "immutable"

import {Provider} from "react-redux"

import {ConnectedApp} from "./components/App"

import {logger,socketMiddleware} from "./middleware"

import { createStore ,applyMiddleware} from "redux"
import rootReducer from "./reducer"
import {setState,newMessage } from "./actionCreators"

import {getInitialState ,saveToStorage } from "./store"
    let createStoreWithMiddleware = applyMiddleware(logger ,socketMiddleware(socket ))(createStore)

const store = createStoreWithMiddleware(rootReducer,getInitialState())
import {socket} from "./io"

socket.on("state",state => {
    // console.log("开始的聊天室 信息",state)
    store.dispatch(setState(state))
})

socket.on("message",message=>{
    console.log("get message from server")
    store.dispatch(newMessage(message,true))
})

// const fakeState = {
//     //转化为  immutable js
//     rooms:fromJS([
//         {id:"0",name:"room1",owner:"jing"},
//         {id:"1",name:"room2",owner:"hqman"},
//         ]),
//     currentRoom:"1",
//     username:"hqman",
//     messages:fromJS({
//         "1":[
//         {user:"hqman",content:"haha react",time:"19:00"},
//         {user:"jing",content:"yeh react",time:"19:01"},
//         ]
//     }),
// }

var $app = document.getElementById("app")

function render(){
    ReactDom.render(
        <Provider store={store}>
            <ConnectedApp/>
        </Provider>,
        $app
     )
}
 render()
// function render(){
//     const fakeState=store.getState()
//     ReactDom.render(
//         <App rooms={fakeState.get("rooms") }
//         messages={fakeState.get("messages") }
//         currentRoom={fakeState.get("currentRoom") }
//         username={fakeState.get("username") } />,$app
//         )
// }

 store.subscribe(()=>{
    saveToStorage(store.getState())
 })


