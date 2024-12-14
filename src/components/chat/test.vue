<template>
  <div class="chat">
    <div class="messages">
      <div v-for="(msg, index) in messages" :key="index" class="message">
        <strong>{{ msg.sender }}:</strong>
        <span v-if="msg.type === 'text'">{{ msg.content }}</span>
        <img v-if="msg.type === 'file'" :src="msg.content" alt="file" width="200" />
      </div>
    </div>
    <form @submit.prevent="sendMessage">
      <input v-model="newMessage" placeholder="Напишите сообщение" />
      <input type="file" @change="onFileChange" />
      <button type="submit">Отправить</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
      messages: [],
      newMessage: '',
      selectedFile: null,
      user2Username: this.$route.params.user2Username // Получаем имя собеседника из URL
    }
  },
  methods: {
    // Инициализация WebSocket
    initializeWebSocket() {
      const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1NzQwODQxLCJpYXQiOjE3MzMxNDg4NDEsImp0aSI6ImEyMWU4YjljMGIzOTRjNmM4ZDY2NjBmZTliYjZhZjNlIiwidXNlcl9pZCI6Miwic3RhdHVzIjoidXNlciIsInByb2ZpbGVfaWQiOjV9.D-hf4sLhsssb_e1v5fXu5iL1MVRmWoBMWqE7-ODTFTU'
      const wsUrl = ` ws://api.rcarentacar.com/ws/chat/pocoxe/?token=${accessToken}`
      this.socket = new WebSocket(wsUrl)

      this.socket.onopen = () => {
        console.log('WebSocket соединение установлено')
      }

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        this.messages.push({
          sender: data.sender,
          content: data.message || data.file,
          type: data.message ? 'text' : 'file'
        })
      }

      this.socket.onerror = (error) => {
        console.error('WebSocket ошибка:', error)
      }
    },

    // Отправка сообщения (текстового или файла)
    sendMessage() {
      if (this.socket.readyState !== WebSocket.OPEN) {
        console.error('WebSocket не открыт')
        return // Прерываем выполнение, если WebSocket не открыт
      }

      if (this.newMessage.trim()) {
        const messageData = {
          message: this.newMessage,
          type: 'text' // Тип сообщения — текст
        }
        this.socket.send(JSON.stringify(messageData))
        this.newMessage = ''
      }

      if (this.selectedFile) {
        const reader = new FileReader()
        reader.onload = () => {
          const fileData = reader.result.split(',')[1] // base64 кодировка
          const fileMessageData = {
            file: fileData,
            file_name: this.selectedFile.name,
            type: 'file' // Тип сообщения — файл
          }
          this.socket.send(JSON.stringify(fileMessageData))
          this.selectedFile = null // Очищаем выбранный файл
        }
        reader.readAsDataURL(this.selectedFile)
      }
    },

    // Обработка выбора файла
    onFileChange(event) {
      this.selectedFile = event.target.files[0]
    }
  },
  created() {
    // Подключаемся к WebSocket
    this.initializeWebSocket()
  }
}
</script>

<style scoped>
.chat {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
}

.messages {
  border: 1px solid #ccc;
  padding: 10px;
  height: 300px;
  overflow-y: auto;
}

.message {
  margin-bottom: 10px;
}

form {
  display: flex;
  gap: 10px;
}
</style>
