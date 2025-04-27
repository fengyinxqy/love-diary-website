<template>
  <div class="guestbook-view">
    <el-page-header
      @back="goBack"
      title="返回首页"
    >
      <template #content>
        <h1 class="title">留言板</h1>
      </template>
    </el-page-header>

    <div class="guestbook-container">
      <el-card class="guestbook-form">
        <el-form
          :model="form"
          label-width="80px"
        >
          <el-form-item label="昵称">
            <el-input
              v-model="form.name"
              placeholder="请输入昵称"
            ></el-input>
          </el-form-item>
          <el-form-item label="留言内容">
            <el-input
              v-model="form.message"
              type="textarea"
              :rows="4"
              placeholder="写下你想对我们说的话..."
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submitMessage"
              >提交留言</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>

      <div class="message-list">
        <el-card
          v-for="(msg, index) in messages"
          :key="index"
          class="message-item"
        >
          <div class="message-header">
            <span class="name">{{ msg.name }}</span>
            <span class="date">{{ msg.date }}</span>
          </div>
          <div class="message-content">
            {{ msg.message }}
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

const form = ref({
  name: '',
  message: '',
})

const messages = ref([
  {
    name: '小明',
    date: '2023-06-01',
    message: '祝你们幸福美满！',
  },
  {
    name: '小红',
    date: '2023-06-02',
    message: '好羡慕你们的爱情故事~',
  },
])

const submitMessage = () => {
  if (!form.value.name || !form.value.message) {
    return
  }

  messages.value.unshift({
    name: form.value.name,
    date: new Date().toLocaleDateString(),
    message: form.value.message,
  })

  form.value.message = ''
}
</script>

<style lang="scss" scoped>
.guestbook-view {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  .title {
    margin: 0;
    font-size: 24px;
  }

  .guestbook-container {
    margin-top: 30px;
  }

  .guestbook-form {
    margin-bottom: 30px;
  }

  .message-list {
    .message-item {
      margin-bottom: 20px;

      .message-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;

        .name {
          font-weight: bold;
        }

        .date {
          color: #999;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
