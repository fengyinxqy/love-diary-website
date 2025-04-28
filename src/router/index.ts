import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/home/HomeView.vue'
import TimelineView from '@/views/timeline/TimelineView.vue'
import GuestbookView from '@/views/guestbook/GuestbookView.vue'
import GalleryView from '@/views/gallery/GalleryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: TimelineView,
      meta: { title: '时光轴' },
    },
    {
      path: '/guestbook',
      name: 'guestbook',
      component: GuestbookView,
      meta: { title: '留言板' },
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: GalleryView,
      meta: { title: '恋爱相册' },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/AdminView.vue'),
      meta: {
        title: '网站管理',
        requiresAuth: true
      },
    },
  ],
})

// 路由守卫：权限控制和页面标题设置
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title ? `${to.meta.title} | Love Diary` : 'Love Diary'

  // 权限控制
  if (to.meta.requiresAuth) {
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
      // 如果需要登录但未登录，重定向到首页
      next({ name: 'home' })
      return
    }
  }

  next()
})

export default router
