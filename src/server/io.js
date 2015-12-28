const DEFAULT_ROOM = "0"

// 监听  连接  断开 和 发送 状态
export default function listenWebSocket(io, store) {
    io.on('connection', socket => {
        console.log('user connected')
        socket.emit("state",store.getState())


        socket.join(DEFAULT_ROOM)

        socket.on("action", (action) => {
            console.log('get client action',action)

            switch(action.type){
                case "SWITCH_ROOM":
                    return switchRoom( socket, action.roomId || DEFAULT_ROOM )
                case "NEW_MESSAGE":
                    if( socket.rooms && socket.rooms.length>0  ){
                        socket.rooms.forEach(id=>{
                            socket.to( id ).emit("message", action.message)
                        })
                    }else{
                        socket.emit( "message", action.message )
                    }
                    return

            }
           store.dispatch(action)
            // 创建 删除房间 时候 同步到 其他客户端 自动更新
            socket.emit("state", store.getState() )
            if( ["ADD_ROOM","REMOVE_ROOM"].indexOf(action.type) > -1){
                socket.broadcast.emit("state", store.getState() )
            }
        })



        socket.on("disconnect", () => {
            console.log('user disconnected');
        });

    })
}

function switchRoom(socket,roomId){
    socket.rooms.forEach( (room,index)=>{
        console.log("should leave room, skip first one")
        if( index > 0 ){
            socket.leave( room )
        }
    })

    setTimeout(()=>{
        socket.join( roomId )
        console.log( "roomId:",roomId, "socket.rooms:",socket.rooms )
    },200)
}
