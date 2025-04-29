<script setup lang="ts">
import { ref } from 'vue'

const menuItems = ref([
  { name: '时间轴', path: '/admin/timeline' },
  { name: '恋爱相册', path: '/admin/album' },
  { name: '留言板', path: '/admin/message' },
  { name: '网站信息', path: '/admin/site' },
])

const activeMenu = ref('时间轴')
</script>

<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <h2 class="logo">管理后台</h2>
      <el-menu
        class="menu"
        :default-active="activeMenu"
        background-color="#304156"
        text-color="#fff"
        active-text-color="#409eff"
      >
        <el-menu-item
          v-for="item in menuItems"
          :key="item.path"
          :index="item.name"
          @click="activeMenu = item.name"
        >
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </aside>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 240px;
  background: #304156;
  color: white;
  padding: 20px 0;
}

.logo {
  padding: 0 20px;
  margin-bottom: 20px;
}

.menu li {
  padding: 12px 20px;
  cursor: pointer;
}

.menu li:hover {
  background: rgba(255, 255, 255, 0.1);
}

.menu li.active {
  background: #409eff;
}

.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}
</style>
