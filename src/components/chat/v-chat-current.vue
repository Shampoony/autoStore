<template>
  <v-header class="alt" />
  <div class="v-chat-current">
    <div class="v-chat-current__container container flex">
      <v-left-menu />
      <div class="v-chat-current__content">
        <div class="v-chat-current__header flex justify-between">
          <div class="flex">
            <div class="v-chat-current__header-back mr-6 flex items-center" @click="toPrevPage">
              <img src="../../assets/images/back.svg" alt="" />
            </div>
            <div class="flex gap-7">
              <div class="v-chat-current__header-img avatar">
                <div class="avatar__img-author">
                  <!--   <img src="" alt="" /> -->
                </div>
                <div class="avatar__online">
                  <!--    <img src="" alt="" /> -->
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex gap-4">
                  <div class="v-chat-current__header-name user-name">{{ chatName }}</div>
                  <div class="v-chat-current__header-online">В сети в 20:58</div>
                </div>
                <div class="v-chat-current__header-product">Toyota Camry</div>
              </div>
            </div>
          </div>
          <button
            :class="{ hide: numberShowed }"
            class="v-chat-current__header-button"
            v-if="number"
            @click="numberShowed = !numberShowed"
          >
            Показать телефон
          </button>
          <button
            :class="{ show: numberShowed }"
            class="v-chat-current__header-number"
            v-if="number"
            @click="numberShowed = !numberShowed"
          >
            {{ number }}
          </button>
        </div>
        <div class="v-chat-current__header-mob flex justify-between">
          <div class="flex">
            <div class="v-chat-current__header-mob-back mr-6 flex items-center" @click="toPrevPage">
              <img src="../../assets/images/back.svg" alt="" />
            </div>
            <div class="flex gap-2">
              <div class="v-chat-current__header-mob-img avatar-mob">
                <div class="avatar-mob__img-author">
                  <!--   <img src="" alt="" /> -->
                </div>
              </div>
              <div class="flex flex-col gap-1">
                <div class="v-chat-current__header-mob-name user-name">Оля</div>
                <div class="v-chat-current__header-mob-online">В сети в 20:58</div>
              </div>
            </div>
          </div>
          <button class="v-chat-current__header-mob-button">
            <img src="../../assets/images/phone.svg" alt="" />
          </button>
        </div>
        <div class="v-chat-current__messages">
          <ul class="v-chat-current__messages-list styled-scrollbar" ref="messagesContainer">
            <li
              class="v-chat-current__messages-list-item message"
              v-for="msg in messages"
              :key="msg.id"
              :class="{ 'my-message': msg.sender == userId }"
            >
              <div class="message__mark" v-if="msg.sender == userId">
                <img src="../../assets/images/message-mark.svg" alt="" />
              </div>
              <div class="message__text">{{ msg.content }}</div>
              <div class="message__time">{{ getMessageDate(msg.timestamp) }}</div>
            </li>
          </ul>
          <form @submit.prevent="sendMessage" class="v-chat-current__send">
            <textarea
              placeholder="Введите сообщение"
              rows="1"
              ref="messageInput"
              class="custom-textarea"
              v-model="newMessage"
              @input="autoResize"
              @keydown.enter="handleEnterKey"
            ></textarea>
            <button class="v-chat-current__submit" type="submit">
              <img src="../../assets/images/submit-message.svg" alt="" />
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserId } from '@/utils'
import { fetchChatMessages, fetchChatById, getUserById } from '@/api/requests'

import VHeader from '../generalComponents/v-header.vue'
import VLeftMenu from '../generalComponents/v-left-menu.vue'
import VHeaderAlt from '../generalComponents/v-header-alt.vue'

export default {
  name: 'vChatCurrent',
  components: { VHeader, VLeftMenu, VHeaderAlt },

  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },

  data() {
    return {
      message: '',
      messages: [],
      chatName: '',
      number: '',
      numberContent: 'Показать телефон',
      numberShowed: false,
      user2: '',

      socket: null,
      newMessage: '',
      selectedFile: null,
      user2Username: this.$route.params.user2Username // Получаем имя собеседника из URL
    }
  },
  methods: {
    handleEnterKey(event) {
      if (event.shiftKey) {
        // Shift + Enter: добавление новой строки
        return
      }
      // Просто Enter: отправить сообщение
      this.sendMessage()
      event.preventDefault() // Предотвращает добавление новой строки
    },
    toPrevPage() {
      window.history.back()
    },
    autoResize() {
      const textarea = this.$refs.messageInput
      textarea.style.height = 'auto' // Сбрасываем высоту, чтобы рассчитать новую
      textarea.style.height = textarea.scrollHeight + 'px' // Устанавливаем новую высоту
    },
    setChatMessage() {
      fetchChatMessages(this.$route.params.id).then((messages) => {
        this.messages = messages
        this.userId = getUserId()
        this.scrollToBottom()
      })
    },
    getMessageDate(timestamp) {
      const date = new Date(timestamp)
      const today = new Date()

      // Проверяем, совпадает ли дата
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()

      if (isToday) {
        // Если сегодня, возвращаем только время
        return date.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit'
        })
      } else {
        // Если не сегодня, возвращаем дату и время
        return date.toLocaleString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      }
    },
    initializeWebSocket() {
      const accessToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM1NzQwODQxLCJpYXQiOjE3MzMxNDg4NDEsImp0aSI6ImEyMWU4YjljMGIzOTRjNmM4ZDY2NjBmZTliYjZhZjNlIiwidXNlcl9pZCI6Miwic3RhdHVzIjoidXNlciIsInByb2ZpbGVfaWQiOjV9.D-hf4sLhsssb_e1v5fXu5iL1MVRmWoBMWqE7-ODTFTU'
      const wsUrl = ` ws://api.rcarentacar.com/ws/chat/${this.chatName}/?token=${accessToken}`
      this.socket = new WebSocket(wsUrl)

      this.socket.onopen = () => {
        console.log('WebSocket соединение установлено')
      }

      this.socket.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log(data)
        this.messages.push({
          sender: data.sender,
          content: data.message || data.file,
          timestamp: data.timestamp,
          type: data.message ? 'text' : 'file'
        })
      }

      this.socket.onerror = (error) => {
        console.error('WebSocket ошибка:', error)
      }
    },
    setUserInfo() {
      fetchChatById(this.$route.params.id).then((chatInfo) => {
        console.log(chatInfo)
        if (chatInfo.user1 != this.user1Id) {
          this.user2 = chatInfo.user1
        } else {
          this.user2 = chatInfo.user2
        }
        getUserById(this.user2).then((userInfo) => {
          this.chatName = userInfo.username
          this.number = userInfo.user_profile.phone
          this.initializeWebSocket()
        })
      })
      console.log(this.chatName)
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

      // Прокрутка каждого нового сообщения в видимую область
      this.$nextTick(() => {
        const lastMessage = this.$refs.messagesContainer.lastElementChild
        lastMessage.scrollIntoView({ behavior: 'smooth' })
      })
    },
    scrollToBottom() {
      const container = this.$refs.messagesContainer
      container.scrollTop = container.scrollHeight + 45 // Прокрутка в самый низ с небольшим отступом
    }
  },
  computed: {
    user1Id() {
      return getUserId()
    }
  },
  mounted() {
    this.setChatMessage()
    this.setUserInfo()

    /*  this.setChatName() */
    console.log(this.$route)
  },
  watch: {
    // Если сообщения обновляются, прокручиваем в низ
    messages: function () {
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  }
}
</script>
