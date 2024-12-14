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
                params: { id: chat.id },
                state: { chatName: chat.user2_name }
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
                  <div class="chat-item__name user-name">{{ chat.user2_name }}</div>
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
import { fetchChats } from '@/api/requests'
import { getUserById } from '@/api/requests'
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
        console.log(chats)
      })
    }
  },
  mounted() {
    this.setChats()
  }
}
</script>
