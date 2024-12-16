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

      if (data.type === 'read_receipt') {
        console.log(`Сообщение ${data.message_id} было прочитано пользователем ${data.user_id}`)
        if (this.onReadReceiptCallback) {
          this.onReadReceiptCallback(data)
        }
      } else if (data.type === 'user_status') {
        console.log(`Пользователь ${data.user_id} ${data.is_online ? 'в сети' : 'не в сети'}`)
        if (this.onUserStatusCallback) {
          this.onUserStatusCallback(data)
        }
      } else if (this.onMessageCallback) {
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

  // Метод для прочтения сообщений
  sendReadReceipt(messageId) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const receiptData = {
        type: 'read_receipt',
        message_id: messageId
      }
      this.socket.send(JSON.stringify(receiptData))
    }
  }

  // Новый метод для регистрации обратного вызова статуса пользователя
  registerUserStatusCallback(callback) {
    this.onUserStatusCallback = callback
  }

  registerReadReceiptCallback(callback) {
    this.onReadReceiptCallback = callback
  }

  close() {
    if (this.socket) {
      this.socket.close()
    }
  }
}
