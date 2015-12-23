import React from "react"
import ReactDom from "react-dom"
import {fromJS, Map, List} from "immutable"

import {expect} from "chai"

import MessageList from "../../src/client/components/MessageList"

import TestUtil, {
    findRenderedDOMComponentWithTag,
    Simulate,
    renderIntoDocument,
    isCompositeComponentWithType,
    scryRenderedDOMComponentsWithTag,
    scryRenderedDOMComponentsWithClass,} from "react-addons-test-utils"


describe('MessageList组件', () => {
    it('render message and my message', () => {
            const messages = fromJS([{
                user: "hqman",
                content: "some 111",
                time: "23:00"
            }, {
                user: "jing",
                content: "some 222",
                time: "22:00"
            }])
         const component = renderIntoDocument(
            <MessageList username="hqman" messages={messages}/>
            )
         // console.dir(component)
         // TODO 测试 结果 不对  DEBUG

        const $messages = scryRenderedDOMComponentsWithTag(component,'li')
        const $myMessages = scryRenderedDOMComponentsWithClass(component,'message-self')
        expect( $messages.length ).to.equal(2)
        expect( $myMessages.length ).to.equal(1)


    })
})
