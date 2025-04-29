<template>
  <div id="app">
    <template v-if="!route.path.startsWith('/admin')">
      <el-menu
        :router="true"
        mode="horizontal"
        :class="['nav-menu', { 'nav-fixed': isHomePage }]"
      >
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/timeline">时光轴</el-menu-item>
        <el-menu-item index="/gallery">恋爱相册</el-menu-item>
        <el-menu-item index="/guestbook">留言板</el-menu-item>

        <!-- 右侧菜单项 -->
        <div class="right-menu">
          <template v-if="authStore.isAuthenticated">
            <el-menu-item index="/admin">网站管理</el-menu-item>
            <el-menu-item @click="handleLogout">退出登录</el-menu-item>
          </template>
          <template v-else>
            <el-menu-item @click="showAuthDialog = true">登录</el-menu-item>
          </template>
        </div>
      </el-menu>
    </template>

    <router-view></router-view>

    <!-- 登录对话框 -->
    <auth-dialog v-model="showAuthDialog" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { ElMessage } from 'element-plus'
import AuthDialog from '@/components/AuthDialog.vue'

const authStore = useAuthStore()
const route = useRoute()
const showAuthDialog = ref(false)

// 判断当前是否是首页
const isHomePage = computed(() => route.path === '/')

const handleLogout = async () => {
  try {
    await authStore.logout()
    ElMessage.success('已退出登录')
  } catch {
    ElMessage.error('退出登录失败')
  }
}
</script>

<style scoped lang="scss">
/* 基础导航栏样式 */
.nav-menu {
  padding: 0 20px;
  background-color: #fff;

  &.nav-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
}

/* 右侧菜单容器 */
.right-menu {
  float: right;
  margin-left: auto;
}

/* 菜单项基础样式 */
:deep(.el-menu--horizontal > .el-menu-item) {
  height: 60px;
  line-height: 60px;
  font-weight: 500;
  color: #333;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: #ff4e79;
  }
}

/* 其他样式保持不变 */
.right-menu {
  float: right;
  margin-left: auto;
}

:deep(.el-menu--horizontal > .el-menu-item) {
  height: 60px;
  line-height: 60px;
}

:deep(.el-menu--horizontal.el-menu) {
  border: 0;
}

/* 活动菜单项样式 */
:deep(.el-menu--horizontal > .el-menu-item.is-active) {
  color: #ff4e79;
  border-bottom: 2px solid #ff4e79;
}
</style>
