'use strict'

class AndroidController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
  async onMessage(data){
    try {
      console.log(data)
      if(data.source == 'android') {
        this.socket.broadcastToAll('message', `From Android: ${data.info}`)
      }else {
        this.socket.broadcastToAll('message', `From Angular: ${data.info}`)
      }      
    } catch (error) {      
    }
  }
}

module.exports = AndroidController
