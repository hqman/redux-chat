import {expect} from "chai"
import {v1} from "uuid"
import {fromJS, Map, List} from "immutable"
import {addRoom, removeRoom} from "../../src/server/core.js"

describe("第一个测试", () => {
    it("it should works", () => {
        expect(1 + 1).to.equal(2)
    })
})

describe("rooms", () => {
    it("能够添加房间： addRoom", () => {
        var firstRoom = {
            name: "first Room",
            id: v1(),
            owner: "hqman"
        }
        const nextState = addRoom(undefined, firstRoom)
        const rooms = nextState.get("rooms")
        expect(rooms).to.be.ok
        expect(rooms.get(0)).to.equal(Map(firstRoom))


        const nextNextState = addRoom(nextState, {
            name: "second room",
            owner: "jing"
        })
        expect(nextNextState.getIn(["rooms", 1, 'name'])).to.equal("second room")
    })

    const mockState = fromJS({
        rooms: [{
            name: "第一个房间",
            id: v1(),
            owner: 'hqman'
        }]
    })

    it('能背创建者删除', () => {
        const state = removeRoom(mockState, {
            id: mockState.getIn(["rooms", 0, "id"]),
            user: "hqman"
        })

        expect(state.get("rooms").size).to.equal(0)
    })

    it('不能被创建者删除', () => {
        const state = removeRoom(mockState, {
            id: mockState.getIn(["rooms", 0, "id"]),
            user: "jing"
        })

        expect(state.get("rooms").size).to.equal(1)
    })
})
