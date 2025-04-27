import { createRouter, createWebHistory } from 'vue-router'
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
  ],
})

// 设置页面标题
router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? `${to.meta.title} | Love Diary` : 'Love Diary'
  next()
})

export default router
