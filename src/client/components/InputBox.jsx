import React ,{ Component }from "react"
import ReactDom from "react-dom"

class InputBox extends Component{

    handleSubmit(e){
        e.preventDefault()
        var $textArea = ReactDom.findDOMNode(this.refs.textArea)
        if( typeof this.props.sendMessage === "function" ){
            this.props.sendMessage( $textArea.value )
            $textArea.value = ""
        }else{
            console.log("props.sendMessage not defined!!")
        }

    }
    //es6 不会自动 bind 要手动写bind(this)
    render(){
        return (
            <div id="chat-inputbox">
                <form className="flex-row" onSubmit={this.handleSubmit.bind(this)}>
                        <div className="flex">
                            <textarea ref="textArea" name="message" rows="4"></textarea>
                        </div>
                        <div style={{width:"130px",textAlign:"right"}}>
                            <button type="submit" className="btn lg color-2">发送</button>
                        </div>
                    </form>
            </div>
            )
    }
}



//componentShouldUpdate 判断 2个对象是否相等 是否渲染
import PureRenderMixin from 'react-addons-pure-render-mixin';
import reactMixin from "react-mixin";
reactMixin.onClass( InputBox, PureRenderMixin )

export default InputBox