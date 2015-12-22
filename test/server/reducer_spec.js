import {expect} from "chai"
import {v1} from "uuid"
import {fromJS, Map, List} from "immutable"


import coreReducer from "../../src/server/reducer"

describe('server核心reducer', ()=> {
     it('可以当做一个reducer',   ()=> {
        var id = v1()
        console.log("id ====",id)
        var actions = [
            {type:"ADD_ROOM",room:{id:"1",owner:"hqman"}},
            {type:"ADD_ROOM",room:{id:"2",owner:"jing"}},
            {type:"ADD_ROOM",room:{id:"3",owner:"hqman"}},
            {type:"REMOVE_ROOM",payload:{id:"1",user:"hqman"}},
        ]

        const finalState = actions.reduce(coreReducer,undefined)
        expect(finalState.get("rooms").size).to.equal(2)
        expect(finalState.getIn(["rooms",0,"owner"])).to.equal("jing")
     })
})