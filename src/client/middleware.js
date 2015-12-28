//根据meta信息判断是否往socket io 发送请求
export const socketMiddleware = socket => store => next => action => {
    if (action.meta && action.meta.remote) {
      socket.emit('action', action);
    }

    return next(action)
}

export const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  const nextState=store.getState()
  console.log('next state', nextState.toJS() ? nextState.toJS() : nextState)
  return result
}

// const crashReporter = store => next => action => {
//   try {
//     return next(action)
//   } catch (err) {
//     console.error('Caught an exception!', err)
//     Raven.captureException(err, {
//       extra: {
//         action,
//         state: store.getState()
//       }
//     })
//     throw err
//   }
// }