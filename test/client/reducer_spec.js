import {expect} from "chai"
import {v1} from "uuid"
import {fromJS, Map, List} from "immutable"


import rootReducer from "../../src/client/reducer"
import {newMessage,setState,switchRoom,setUsername} from "../../src/client/actionCreators"

const fakeState = fromJS({
    //转化为  immutable js
    rooms: [
        {id:"0",name:"room1",owner:"jing"},
        {id:"1",name:"room2",owner:"hqman"},
        ] ,
    currentRoom:"1",
    username:"hqman",
    messages: {
        "1":[
        {user:"hqman",content:"haha react",time:"19:00"},
        {user:"jing",content:"yeh react",time:"19:01"},
        ]
    },
})

describe('client root reducer', ()=> {
    it('set state',   ()=> {

        const nextState = rootReducer(fakeState,setState(
            fromJS({username:"jonny",currentRoom:"0"})
            ))
        expect(nextState.get("username")).to.equal("jonny")
        expect(nextState.get("rooms").size).to.equal(2)
    })

    it('set username',   ()=> {
        const nextState = rootReducer(fakeState, setUsername("hqman"))

        expect(nextState.get("username")).to.equal("hqman")
    })

    it('switch room',   ()=> {
        const nextState = rootReducer(fakeState, switchRoom("0"))
        expect(nextState.get("currentRoom")).to.equal("0")
    })
    it('send messages',   ()=> {
        const action ={
            roomId:"0",user:"hqman",content:"message haha",time:"23:00"
        }
        expect(action.time).to.be.ok
        const nextState = rootReducer(fakeState, newMessage(action))
        // console.log("debug >>>>>>>>>")
        // console.dir(nextState.getIn(["messages","0"]))
        expect(nextState.getIn(["messages","0"]).size).to.equal(1)

         const action1 ={
            roomId:"1",user:"hqman",content:"message haha",time:"23:00"
        }
        const nextState1 = rootReducer(nextState, newMessage(action1))
        console.dir(nextState1.getIn(["messages","1"]).first())
        expect(nextState1.getIn(["messages","1"]).size).to.equal(3)

    })
})