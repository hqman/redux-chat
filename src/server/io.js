const DEFAULT_ROOM = "0"

// 监听  连接  断开 和 发送 状态
export default function listenWebSocket(io, store) {
    io.on('connection', socket => {
        console.log('user connected')
        socket.emit("state",store.getState())

        socket.on("disconnect", () => {
            console.log('user disconnected');
        });

    })
}
