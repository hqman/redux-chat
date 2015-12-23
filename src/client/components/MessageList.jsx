import React ,{ Component }from "react"
import ReactDom from "react-dom"
import Message from "./Message"


class MessageList extends Component{
    isSelf( message ){
        return this.props.username === message.get("user")
    }

    $getMessages(megs){
        if(!megs || megs.size==0){
            return <p>还没有消息</p>
        }
     // 通过 map 函数把数组 渲染成 message 组件
       return megs.map((message,index)=>{
            return <Message key={index}
            isSelf={this.isSelf(message)}
            message={message}
            />
        })
    }

    render () {
        console.log("messages html ...",this.$getMessages(this.props.messages))
        return (
             <ul className="chat-messages">
                {
                    this.$getMessages(this.props.messages)
                }
             </ul>
        );
    }
}


import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from "react-mixin";
reactMixin.onClass( MessageList, PureRenderMixin )

export default MessageList