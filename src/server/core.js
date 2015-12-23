import {fromJS, Map, List} from "immutable"
import {v1} from "uuid"

// 初始的 state 信息
export const INITAL_STATE = fromJS({
    rooms: [],
})

// 添加 房间
export function addRoom(state = INITAL_STATE, room) {
    if (!room || !room.owner) return state

    return state.update("rooms", rooms => rooms.push(Map({
        id: room.id || v1(),
        name: room.name || "无名称",
        owner: room.owner,
    })))
}

// 删除 房间
export function removeRoom(state,{id,user}){

    const rooms=state.get("rooms")

    var index = rooms.findIndex(r=>r.get("id") === id)
    // console.log(index,rooms.getIn([index,"owner"]),user)
    if(index==-1 || rooms.getIn([index,"owner"])!== user){
    console.log("你不是创建者,不能删除该房间!")
        return state
    }
    return state.update("rooms",rooms=>rooms.splice(index,1))
}