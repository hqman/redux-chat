import React from "react"
import MessageList from "./MessageList"
import InputBox from "./InputBox"
import RoomList from "./RoomList"
import {switchRoom,addRoom,setState,newMessage ,removeRoom} from "../actionCreators"

class App extends React.Component {
    getCurrentRoomName() {
        if (!this.props.currentRoom) return "无"
        const room = this.props.rooms.find(r => r.get("id") === this.props.currentRoom)
        return (room && room.get) ? room.get("name") : room
    }

    isOwner() {
        if (!this.props.currentRoom || !this.props.username) return false
        const room = this.props.rooms.find(r => r.get("id") === this.props.currentRoom)
        if (!room) return false;
        return room.get("owner") == this.props.username
    }

    getMessages() {
        const ret=this.props.messages ?
            this.props.messages.get(this.props.currentRoom) : []
            console.log("message >>>>>")
            console.dir(ret);
        return ret
    }
    addRoom() {
        //发送到后台添加房间
        var name = prompt("房间名称")
        if(!name) return alert("房间名称不能为空")

        this.props.dispatch(addRoom({
            name,owner:this.props.username
        }) )

    }

    removeRoom() {
       this.props.dispatch(switchRoom( ))

        this.props.dispatch( removeRoom(
            this.props.currentRoom, this.props.username
        ) )

    }

    sendMessage(message) {
        this.props.dispatch(newMessage(
             {
            roomId: this.props.currentRoom,
            user: this.props.username,
            content: message

            }
         ))
    }
    render() {
        const { currentRoom, rooms, username,dispatch } = this.props

        return (
            <div className="flex-row">
                <nav id="chat-nav">
                    <p>聊天室列表</p>
                    <RoomList rooms={ rooms }
                        currentRoom={currentRoom}
                        switchRoom={ id => dispatch( switchRoom(id) )}
                    />
                    <button className="btn color-2"
                        onClick={ this.addRoom.bind(this) }> + 创建聊天室</button>
                </nav>
                { !currentRoom ? <h2>请选择一个聊天室</h2>:
                    <section id="chat-main" className="flex">
                        <header className="flex-row">
                            <h3>当前聊天室：{ this.getCurrentRoomName() }</h3>
                            <span className="flex"></span>
                            { !this.isOwner() ? "":
                                <button onClick={this.removeRoom.bind(this)}
                                className="btn sm color-5">X 删除该聊天室</button>
                            }
                        </header>
                        <MessageList messages={ this.getMessages() } username={username} />
                        <InputBox sendMessage={this.sendMessage.bind(this)}/>
                    </section>
                }
            </div>
            );
    }
}


import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from "react-mixin";
reactMixin.onClass(App, PureRenderMixin)

import { connect } from 'react-redux'
function mapStateToProps ( state ){
    return {
        rooms:  state.get("rooms"),
        currentRoom: state.get("currentRoom"),
        username: state.get("username"),
        messages: state.get("messages")
    }
}

export const ConnectedApp = connect(mapStateToProps)(App)


export default App