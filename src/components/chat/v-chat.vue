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
                name: 'current_chat',
                params: { id: chat.id }
              }"
            >
              <div class="chat-item__info flex gap-6">
                <div class="chat-item__img avatar">
                  <div class="avatar__img-author">
                    <!--   <img src="" alt="" /> -->
                  </div>
                  <div class="avatar__online">
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
              <div class="chat-item__date">16 сентября</div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </main>
  <v-bottom-menu :active-item="'chat'" />
</template>
<script>
import { getUserId } from '@/utils'
import { fetchChats } from '@/api/requests'
import vHeader from '../generalComponents/v-header.vue'
import vLeftMenu from '../generalComponents/v-left-menu.vue'
import vBottomMenu from '../generalComponents/v-bottom-menu.vue'
export default {
  name: 'vChat',
  components: { vHeader, vLeftMenu, vBottomMenu },
  data() {
    return {
      chats: [],
      users: {}
    }
  },
  methods: {
    setChats() {
      fetchChats().then((chats) => {
        this.chats = chats
      })
    },
    getName(chat) {
      const userId = getUserId()
      if (chat.user1 != userId) {
        return chat.user1_name
      }
      return chat.user2_name
    }
  },
  mounted() {
    this.setChats()
  }
}
</script>
