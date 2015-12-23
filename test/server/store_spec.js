import {expect} from "chai"
import {v1} from "uuid"
import {fromJS, Map, List} from "immutable"
import {makeStore} from "../../src/server/store.js"
import {addRoom,removeRoom} from "../../src/server/actionCreator"

describe('server store', ()=> {
    it('dispatch action',   (done)=> {
        const mockSate =  fromJS({
            rooms:[]
        })
        const store = makeStore(mockSate)

        store.subscribe (()=>{
            const state = store.getState()
            expect(state.get("rooms").size).to.equal(1)
            done()
        })

        store.dispatch(addRoom({
            name:"聊天室",owner:"hqman"
        }))
    })
})