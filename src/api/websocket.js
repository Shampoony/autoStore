import { getAccessToken } from './auth'
export class WebSocketService {
  constructor(chatName, onMessageCallback) {
    this.chatName = chatName
    this.accessToken = getAccessToken()
    this.socket = null
    this.onMessageCallback = onMessageCallback // Функция для обработки сообщений
  }

  initialize() {
    const wsUrl = `ws://api.rcarentacar.com/ws/chat/${this.chatName}/?token=${this.accessToken}`
    this.socket = new WebSocket(wsUrl)

    this.socket.onopen = () => {
      console.log('WebSocket соединение установлено')
    }

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (this.onMessageCallback) {
        this.onMessageCallback(data)
      }
    }

    this.socket.onerror = (error) => {
      console.error('WebSocket ошибка:', error)
    }

    this.socket.onclose = () => {
      console.log('WebSocket соединение закрыто')
    }
  }

  sendMessage(messageData) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(messageData))
    } else {
      console.error('WebSocket не открыт')
    }
  }

  close() {
    if (this.socket) {
      this.socket.close()
    }
  }
}
