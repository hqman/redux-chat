import {addRoom ,removeRoom} from "./core.js"



//处理 action 的 reducer 函数

export default function reducer (state,action) {

    switch(action.type){
        case "ADD_ROOM":
            return addRoom(state,action.room)
        case "REMOVE_ROOM":{
            // console.dir(action)
            return   removeRoom(state,action.payload)
            }
    }

    return state
}