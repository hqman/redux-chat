
/**
 * action 定义
 * @param {[type]} room [description]
 */
export function addRoom( room ) {
    return {
        type: "ADD_ROOM",room :room
    }
}

/**
 * action 定义
 * @param {[type]} room [description]
 */
export function removeRoom( payload ) {
    return {
        type: "REMOVE_ROOM",payload :payload
    }
}


