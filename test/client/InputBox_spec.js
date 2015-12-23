import React from "react"
import ReactDom from "react-dom"
import {fromJS,Map,List} from "immutable"

import { expect } from "chai"

import InputBox from "../../src/client/components/InputBox"
import TestUtil, {
    findRenderedDOMComponentWithTag,
    Simulate,
    renderIntoDocument,
    isCompositeComponentWithType,
    scryRenderedDOMComponentsWithTag,
    scryRenderedDOMComponentsWithClass,} from "react-addons-test-utils"


describe('InpuBox', ()=> {
    it('send message',   ()=> {
           var message
           function sendMessage(msg){
            message=msg
           }
           const instance = renderIntoDocument(
             <InputBox sendMessage={sendMessage} />
            )
        const $textArea = findRenderedDOMComponentWithTag(instance,"textarea")
        expect($textArea).to.be.ok
        // set value of textare
        $textArea.value = "some message"
        const $form = findRenderedDOMComponentWithTag(instance,"form")
        Simulate.submit( $form )
        expect(message ).to.equal( "some message" )
    })
})