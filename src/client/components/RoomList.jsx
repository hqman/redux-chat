import React ,{ Component }from "react"


class RoomList extends Component {

    isActive( room, currentRoom ){
        return room.get("id") === currentRoom
    }

    render(){
        const {rooms,currentRoom} = this.props

        return (
            <div className="chat-room-list">
            {
                rooms.map((room,index)=>{
                    return (
                        <a className={this.isActive(room,currentRoom)?"active":""}
                        //设置 点击事件 切换房间
                        onClick={ e=>this.props.switchRoom(room.get("id")) }
                            key={index} href="#">

                            {room.get("name")}
                        </a>
                    )
                })
            }
            </div>
        )
    }
}
//componentShouldUpdate 判断 2个对象是否相等 是否渲染
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from "react-mixin";
reactMixin.onClass( RoomList, PureRenderMixin )

export default RoomList