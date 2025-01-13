<template>
  <v-header class="alt" />
  <div class="v-chat-current">
    <div class="v-chat-current__container container flex">
      <v-left-menu />
      <div class="v-chat-current__content">
        <div class="v-chat-current__header flex justify-between" v-if="user2Info">
          <div class="flex">
            <div class="v-chat-current__header-back mr-6 flex items-center" @click="toPrevPage">
              <img src="../../assets/images/back.svg" alt="" />
            </div>
            <div class="flex gap-7">
              <div class="v-chat-current__header-img avatar">
                <div class="avatar__img-author">
                  <img v-if="user2Info.photo" :src="user2Info.photo" alt="" />
                </div>
                <div class="avatar__online" :class="{ online: isOnline }">
                  <!--    <img src="" alt="" /> -->
                </div>
              </div>
              <div class="flex flex-col gap-2">
                <div class="flex gap-4">
                  <div class="v-chat-current__header-name user-name" v-if="user2Info">
                    {{ user2Info.username }}
                  </div>
                  <div class="v-chat-current__header-online">
                    <span class="user-status" v-if="user2">{{ userStatus }}</span>
                  </div>
                </div>
                <div class="v-chat-current__header-product">Toyota Camry</div>
              </div>
            </div>
          </div>
          <button
            :class="{ hide: numberShowed }"
            class="v-chat-current__header-button"
            v-if="user2Info.user_profile && user2Info.user_profile.phone"
            @click="numberShowed = !numberShowed"
          >
            Показать телефон
          </button>
          <button
            :class="{ show: numberShowed }"
            class="v-chat-current__header-number"
            v-if="user2Info.user_profile && user2Info.user_profile.phone"
            @click="numberShowed = !numberShowed"
          >
            {{ user2Info.user_profile.phone }}
          </button>
        </div>
        <div class="v-chat-current__header-mob flex justify-between" v-if="user2Info">
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
                <div class="v-chat-current__header-mob-name user-name" v-if="user2Info">
                  {{ user2Info.username }}
                </div>
                <div class="v-chat-current__header-mob-online">{{ isOnline }}</div>
              </div>
            </div>
          </div>
          <button class="v-chat-current__header-mob-button">
            <img src="../../assets/images/phone.svg" alt="" />
          </button>
        </div>
        <div class="v-chat-current__messages">
          <ul
            class="v-chat-current__messages-list styled-scrollbar"
            ref="messagesContainer"
            @scroll="checkVisibleMessages"
          >
            <li
              class="v-chat-current__messages-list-item message"
              v-for="msg in messages"
              :key="msg.id"
              :class="{ 'my-message': msg.sender == userId }"
            >
              <div class="message__mark" v-if="msg.sender == userId && (msg.is_read || userRead)">
                <img src="../../assets/images/message-mark.svg" alt="" />
              </div>

              <div class="message__text" v-if="msg.content && !msg.file">{{ msg.content }}</div>
              <div class="message__time">{{ getMessageDate(msg.timestamp) }}</div>
              <div class="message__content" v-if="msg.content">
                <img
                  class="message__image-preview"
                  v-if="isImage(msg.file)"
                  :src="msg.file"
                  alt=""
                />
              </div>
              <div v-if="msg.file && !isImage(msg.file)" class="message__file">
                <a class="message__file-link flex gap-2" download :href="msg.file">
                  <img src="../../assets/images/upload.svg" alt="" />
                  {{ msg.content }}
                </a>
              </div>
            </li>
          </ul>
          <form @submit.prevent="sendMessage" class="v-chat-current__send flex items-center gap-8">
            <file-container ref="addFileComponent" @setFile="setFileData">
              <div class="input__wrapper">
                <!-- @click="triggerFileUpload" -->
                <label class="input__file-button">
                  <img
                    class="input__file-icon"
                    src="../../assets/images/add-file.svg"
                    alt="Выбрать файл"
                    width="25"
                  />
                </label>
              </div>
            </file-container>

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
import fileContainer from '../generalComponents/file-container.vue'

export default {
  name: 'vChatCurrent',
  emits: ['setFile'],
  components: { VHeader, VLeftMenu, VHeaderAlt, fileContainer },

  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },

  data() {
    return {
      messages: [],
      userStatuses: {},
      newMessage: '',
      selectedFile: null,
      nextUrl: '',
      numberShowed: false,
      userRead: false,

      socketService: null, // Экземпляр WebSocketService
      imagesAdded: true,
      imagePreview: null,
      user2: null,
      user2Info: null,
      isOnline: false
    }
  },

  methods: {
    markMessageAsRead(messageId) {
      if (this.socketService) {
        this.socketService.sendReadReceipt(messageId)
      }
    },
    checkVisibleMessages() {
      const container = this.$refs.messagesContainer
      const currentScrollTop = container.scrollTop
      const containerHeight = container.offsetHeight

      // Если прокрутка достигла верхней части контейнера, загружаем новые сообщения
      if (currentScrollTop === 0 && this.nextUrl) {
        // Сохраняем текущую позицию прокрутки
        const scrollPositionBeforeLoad = container.scrollTop

        // Загружаем новые сообщения
        fetchChatMessages(this.$route.params.id, this.nextUrl).then((messages) => {
          // Объединяем новые и старые сообщения
          messages.results.reverse()
          const allMessages = messages.results.concat(this.messages)
          this.messages = allMessages
          console.log(messages)
          this.nextUrl = messages.next || null

          // Восстанавливаем позицию прокрутки после загрузки сообщений
          this.$nextTick(() => {
            // Важно восстанавливать позицию после того, как DOM обновится
            container.scrollTop = scrollPositionBeforeLoad + containerHeight
          })
        })
      }
    },

    handleUserStatus(data) {
      this.isOnline = data.is_online
    },
    handleReadReceipt(data) {
      if (data.user_id === this.user2) {
        this.userRead = true
      }
    },

    setFileData(fileData) {
      this.selectedFile = fileData
    },
    // Инициализация WebSocket
    // Инициализация WebSocket с учётом нового обработчика
    initializeWebSocket() {
      this.socketService = new WebSocketService(this.user2Info.username, this.handleIncomingMessage)
      this.socketService.initialize()

      this.socketService.registerReadReceiptCallback(this.handleReadReceipt)
      // Регистрируем обработчик статуса
      this.socketService.registerUserStatusCallback(this.handleUserStatus)
    },
    getUserStatus(userId) {
      const status = this.userStatuses[userId]
      if (status) {
        return status.is_online ? 'в сети' : `был в сети: ${status.last_seen})`
      }
      return 'не в сети'
    },
    isImage(file) {
      if (file) {
        const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp']
        const fileExtension = file.split('.').pop().toLowerCase()
        console.log(fileExtension)
        return validExtensions.includes(fileExtension)
      }
    },

    triggerFileUpload() {
      console.log('Зашли')
      // Вызываем метод handleFileChange в дочернем компоненте через ref
      const fileInput = this.$refs.addFileComponent.$refs.fileInput
      if (fileInput) {
        fileInput.click() // Имитируем клик по инпуту для выбора файла
      }
    },

    // Обработка входящих сообщений
    handleIncomingMessage(data) {
      if (data && data.is_online) {
        this.isOnline = data.is_online
      }
      if (data && data.content) {
        this.messages.push(data) // Добавляем новое сообщение в список
      }
    },

    toPrevPage() {
      this.socketService.close()
      window.history.back()
    },

    scrollToBottom() {
      console.log('Зашли')
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
        this.nextUrl = messages.next
        this.messages = messages.results.reverse()
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
        this.user2Info = userInfo
        this.isOnline = userInfo.is_online
        /*  console.log(userInfo.is_online) */

        // Инициализируем WebSocket
        this.initializeWebSocket()
      } catch (error) {
        console.error('Ошибка при загрузке информации о чате:', error)
      }
    },

    sendMessage(e) {
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
        this.$refs.addFileComponent.deletePreview()
      }
      this.scrollToBottom()
    }
  },

  computed: {
    userId() {
      return getUserId()
    },
    userStatus() {
      return this.isOnline ? 'в сети' : `не в сети`
    }
  },

  async mounted() {
    this.setChatMessage()
    await this.setUserInfo()
    this.scrollToBottom()
  },

  /* watch: {
    messages() {
      this.$nextTick(() => {
        this.scrollToBottom()
      })
    }
  }, */

  destroyed() {
    if (this.socketService) {
      this.socketService.close() // Закрытие WebSocket при уничтожении компонента
    }
  }
}
</script>
<style>
.file-upload__preview {
  width: 100px;
  height: 100px;
  position: absolute;
  top: -90px;
  left: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border: 1px solid #cfcfcf;
  padding: 10px;
}
.file-upload__block {
  width: 100%;
}
.file-upload__name {
  font-size: 12px;
}
.file-upload__delete-preview {
  position: absolute;
  top: -14px;
  right: -15px;
  background-color: #fff;
  border: 1px solid #cfcfcf;
  border-radius: 50%;
  padding: 5px;
}
.input__wrapper {
  width: 20px;

  position: relative;
  margin: 15px 0;
  text-align: center;
}

.input__file {
  opacity: 0;
  visibility: hidden;
  position: absolute;
}

.input__file-icon-wrapper {
  height: 20px;
  width: 20px;
  margin-right: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}

.input__file-button-text {
  line-height: 1;
  margin-top: 1px;
}

.input__file-button {
  width: 100%;
  max-width: 290px;
  height: 20px;
  color: #fff;
  font-size: 1.125rem;
  font-weight: 700;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 auto;
}
</style>
