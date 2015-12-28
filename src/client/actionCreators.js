import {fromJS, Map, List} from "immutable"
import {yymmddhhmm} from "../shared/utils/dateTime"

export function setState(state){
    return {
        type:"SET_STATE",
        state: Map.isMap(state) ? state : fromJS(state)
        //检测一下 是否是 map 对象
     }
}


export function setUsername(username){
    return {
        type:"SET_USERNAME", username
    }
}
export function switchRoom (roomId) {
    return {
        type:"SWITCH_ROOM",roomId,
        meta:{remote:true}
    }
}
//把变量从对象中 取出
export function newMessage ({roomId,content,user,time},isFromServer) {
    return {
        type:"NEW_MESSAGE",
        message:{
        roomId,content:content||"",user,time:yymmddhhmm
        },
        meta:{remote:!isFromServer}
    }
}

export function addRoom( room ){
    if( !room || !room.owner) throw new Error("addRoom() room.owner is required")

    return {
        type:"ADD_ROOM", room,
        meta:{ remote:true },
    }
}

export function removeRoom( id, user ){
    return {
        type:"REMOVE_ROOM",
        payload:{ id, user },
        meta:{ remote:true },
    }
    }
