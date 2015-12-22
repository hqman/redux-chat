import {addRoom ,removeRoom} from "./core.js"



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