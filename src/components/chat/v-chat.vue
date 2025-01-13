<template>
  <vHeader />
  <main class="v-chat">
    <div class="v-chat__container container flex">
      <v-left-menu />
      <div class="v-chat__content">
        <input type="text" class="v-chat__search" placeholder="Поиск" />
        <div class="v-chat__filters"></div>
        <ul class="v-chat__list">
          <li class="v-chat__list-item" v-for="(chat, index) in chats" :key="index">
            <router-link
              class="chat-item flex justify-between"
              :to="{
                name: PAGE_TYPE === 'transport' ? 'current_chat' : 'real_estate_current_chat',
                params: { id: chat.id }
              }"
            >
              <div class="chat-item__info flex gap-6">
                <div class="chat-item__img avatar">
                  <div class="avatar__img-author">
                    <img
                      v-if="usersPhoto[getUser2Id(chat)]"
                      :src="usersPhoto[getUser2Id(chat)]"
                      alt=""
                    />
                  </div>
                  <div class="avatar__online" :class="{ online: isUserOnline(chat) }">
                    <!--    <img src="" alt="" /> -->
                  </div>
                </div>
                <div class="flex-col">
                  <div class="chat-item__name user-name">{{ getName(chat) }}</div>
                  <div class="chat-item__message" v-if="chat.last_message">
                    {{ chat.last_message.content }}
                  </div>
                </div>
              </div>
              <div class="chat-item__date" v-if="chat.last_message">
                {{ setPrettyDate(chat.last_message.timestamp) }}
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </main>
  <v-bottom-menu :active-item="'chat'" />
</template>
<script>
import vHeader from '../generalComponents/v-header.vue'
import vLeftMenu from '../generalComponents/v-left-menu.vue'
import vBottomMenu from '../generalComponents/v-bottom-menu.vue'

import { mapGetters } from 'vuex'
import { getUserId, getPrettyDate } from '@/utils'
import { fetchChats, getUserById } from '@/api/requests'

export default {
  name: 'vChat',
  components: { vHeader, vLeftMenu, vBottomMenu },
  data() {
    return {
      chats: [],
      users: {},
      usersPhoto: {}
    }
  },
  computed: {
    ...mapGetters(['PAGE_TYPE']),
    userId() {
      return getUserId()
    }
  },
  methods: {
    async setChats() {
      const chats = await fetchChats()
      this.chats = chats
      console.log(chats)
    },
    isUserOnline(chat) {
      getUserById(this.getUser2Id(chat)).then((userInfo) => {
        return userInfo.is_online
      })
    },

    getName(chat) {
      if (chat.user1 != this.userId) {
        return chat.user1_name
      }
      return chat.user2_name
    },
    getUser2Id(chat) {
      if (chat.user1 != this.userId) {
        return chat.user1
      }
      return chat.user2
    },

    setPrettyDate(timestamp) {
      return getPrettyDate(timestamp)
    },
    getUsersPhoto() {
      for (let chat of this.chats) {
        getUserById(this.getUser2Id(chat)).then((userInfo) => {
          this.usersPhoto[this.getUser2Id(chat)] = userInfo.photo
        })
      }
    },
    async loadData() {
      await this.setChats()
    }
  },
  async mounted() {
    await this.loadData()
    this.getUsersPhoto()
  }
}
</script>
