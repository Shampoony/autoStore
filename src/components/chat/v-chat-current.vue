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
              <div class="message__text" v-if="msg.content">{{ msg.content }}</div>
              <div class="message__text" v-if="msg.message">{{ msg.message }}</div>
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
import { getUserId, getPrettyDate } from '@/utils'
import { WebSocketService } from '@/api/websocket'
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
      messages: [],
      newMessage: '',
      selectedFile: null,
      chatName: '',
      number: '',
      numberShowed: false,
      socketService: null // Экземпляр WebSocketService
    }
  },

  methods: {
    // Инициализация WebSocket
    initializeWebSocket() {
      this.socketService = new WebSocketService(this.chatName, this.handleIncomingMessage)
      this.socketService.initialize()
    },

    // Обработка входящих сообщений
    handleIncomingMessage(data) {
      console.log(data)
      if (data && data.message) {
        this.messages.push(data) // Добавляем новое сообщение в список
      }
    },

    toPrevPage() {
      window.history.back()
    },

    scrollToBottom() {
      const container = this.$refs.messagesContainer
      container.scrollTop = container.scrollHeight + 45 // Прокрутка в самый низ с небольшим отступом
    },

    autoResize() {
      const textarea = this.$refs.messageInput
      textarea.style.height = 'auto' // Сбрасываем высоту, чтобы рассчитать новую
      textarea.style.height = textarea.scrollHeight + 'px' // Устанавливаем новую высоту
    },

    setChatMessage() {
      fetchChatMessages(this.$route.params.id).then((messages) => {
        this.messages = messages
        this.scrollToBottom()
      })
    },

    getMessageDate(timestamp) {
      return getPrettyDate(timestamp)
    },

    handleEnterKey(event) {
      if (event.shiftKey) {
        return
      }
      this.sendMessage()
      event.preventDefault()
    },

    async setUserInfo() {
      try {
        // Запрашиваем данные о чате
        const chatInfo = await fetchChatById(this.$route.params.id)

        // Определяем второго участника
        this.user2 = chatInfo.user1 !== this.userId ? chatInfo.user1 : chatInfo.user2

        // Запрашиваем данные пользователя
        const userInfo = await getUserById(this.user2)

        // Обновляем состояние компонента
        this.chatName = userInfo.username
        this.number = userInfo.user_profile.phone

        // Инициализируем WebSocket
        this.initializeWebSocket()
      } catch (error) {
        console.error('Ошибка при загрузке информации о чате:', error)
      }
    },

    sendMessage() {
      console.log(this.newMessage)
      if (this.newMessage.trim()) {
        const messageData = {
          message: this.newMessage,
          type: 'text'
        }
        this.socketService.sendMessage(messageData)
        this.newMessage = ''
      }

      if (this.selectedFile) {
        const reader = new FileReader()
        reader.onload = () => {
          const fileData = reader.result.split(',')[1]
          const fileMessageData = {
            file: fileData,
            file_name: this.selectedFile.name,
            type: 'file'
          }
          this.socketService.sendMessage(fileMessageData)
          this.selectedFile = null
        }
        reader.readAsDataURL(this.selectedFile)
      }
    }
  },

  computed: {
    userId() {
      return getUserId()
    }
  },

  async mounted() {
    this.setChatMessage()
    await this.setUserInfo()
  },

  watch: {
    messages() {
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  },

  destroyed() {
    if (this.socketService) {
      this.socketService.close() // Закрытие WebSocket при уничтожении компонента
    }
  }
}
</script>
