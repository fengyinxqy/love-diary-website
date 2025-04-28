<template>
  <div class="home">
    <!-- Banner Section -->
    <section class="banner">
      <div class="banner-content">
        <div class="avatar-container">
          <div class="avatar-wrapper">
            <div class="avatar avatar-left">
              <img
                src="@/assets/images/qingqing.jpg"
                alt="Ta"
              />
            </div>
            <div class="avatar-name">青青</div>
          </div>
          <div class="love-icon">❤️</div>
          <div class="avatar-wrapper">
            <div class="avatar avatar-right">
              <img
                src="@/assets/images/qiyan.jpg"
                alt="我"
              />
            </div>
            <div class="avatar-name">祺彦</div>
          </div>
        </div>
        <h1 class="banner-title">Our Love Story</h1>
        <p class="banner-subtitle">记录我们的每一个甜蜜瞬间</p>
        <p class="love-time">{{ loveTime }}</p>
      </div>
    </section>

    <!-- Navigation Cards -->
    <section class="navigation-cards">
      <el-row :gutter="30">
        <el-col
          :xs="24"
          :sm="24"
          :md="8"
          :lg="8"
          v-for="card in cards"
          :key="card.path"
          class="nav-col"
        >
          <el-card
            shadow="hover"
            class="nav-card"
            @click="router.push(card.path)"
          >
            <div class="card-content">
              <div class="card-icon">
                <el-icon :size="40">
                  <component :is="card.icon" />
                </el-icon>
              </div>
              <h3>{{ card.title }}</h3>
              <p>{{ card.description }}</p>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section>

    <!-- Timeline Preview -->
    <section class="timeline-preview">
      <h2 class="section-title">我们的时光</h2>
      <div class="preview-events">
        <el-card
          v-for="(event, index) in loveEvents.slice(0, 3)"
          :key="index"
          class="preview-event"
          @click="router.push('/timeline')"
        >
          <div class="event-date">{{ event.date }}</div>
          <h3 class="event-title">{{ event.title }}</h3>
          <p class="event-description">{{ event.description }}</p>
        </el-card>
      </div>
      <el-button
        type="primary"
        plain
        @click="router.push('/timeline')"
        class="view-more"
      >
        查看全部时光记录
      </el-button>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, shallowReactive } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import { Clock, ChatDotRound, Picture } from '@element-plus/icons-vue'

dayjs.extend(duration)

const loveTime = ref('')
const startDate = '2023-01-01'

const updateLoveTime = () => {
  const start = dayjs(startDate)
  const now = dayjs()
  const diff = dayjs.duration(now.diff(start))

  const days = Math.floor(diff.asDays())
  const hours = diff.hours()
  const minutes = diff.minutes()
  const seconds = diff.seconds()

  loveTime.value = `已在一起 ${days} 天 ${hours} 时 ${minutes} 分 ${seconds} 秒`
}

let timer: number

onMounted(() => {
  updateLoveTime()
  timer = window.setInterval(updateLoveTime, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})

const router = useRouter()

const cards = shallowReactive([
  {
    title: '时光轴',
    description: '记录我们的每一个重要时刻',
    icon: Clock,
    path: '/timeline',
  },
  {
    title: '留言板',
    description: '朋友们的祝福和留言',
    icon: ChatDotRound,
    path: '/guestbook',
  },
  {
    title: '恋爱相册',
    description: '珍藏我们的美好回忆',
    icon: Picture,
    path: '/gallery',
  },
])

const loveEvents = ref([
  {
    date: '2023-01-01',
    title: '我们的相遇',
    description: '在这个特别的日子，我们相遇了，这是我们故事的开始...',
    image: '@/assets/first-meet.jpg',
  },
  {
    date: '2023-02-14',
    title: '第一个情人节',
    description: '一起度过了浪漫的情人节，永远记得那天的点点滴滴...',
    image: '@/assets/valentine.jpg',
  },
  {
    date: '2023-05-20',
    title: '520告白日',
    description: '在这个特别的日子里，我们互相表达了爱意...',
    image: '@/assets/confession.jpg',
  },
])
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables';
@use '@/assets/styles/mixins';

.home {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;

  section {
    position: relative;
    overflow: hidden;

    &:not(:last-child) {
      margin-bottom: 0;
    }

    &.banner {
      position: relative;
      z-index: 1;
    }

    &.navigation-cards {
      position: relative;
      z-index: 2;
      padding-top: 100px;
      padding-bottom: 80px;
    }

    &.timeline-preview {
      position: relative;
      z-index: 1;
      margin-top: 0;
      background-color: #f9f9f9;
    }
  }
}

// 调整 banner 内容的位置以适应新的布局
.banner {
  &-content {
    padding-bottom: 100px;
  }
}

.banner {
  height: 100vh;
  background:
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)),
    url('@/assets/images/banner.png') center/cover no-repeat;
  @include mixins.flex-center;
  color: variables.$background-color;
  text-align: center;

  &-content {
    padding: variables.$spacing-large;
  }

  &-title {
    @include mixins.heading-1;
    margin-bottom: variables.$spacing-base;
  }

  &-subtitle {
    font-size: variables.$font-size-large;
    opacity: 0.9;
    margin-bottom: variables.$spacing-base;
  }
}

.navigation-cards {
  padding: 60px 20px;
  background-color: #fff;
  max-width: 1200px;
  margin: 0 auto;

  .el-row {
    justify-content: center;
    margin: -15px;
    width: calc(100% + 30px);
  }

  .nav-col {
    padding: 15px;
    display: flex;
  }

  .nav-card {
    cursor: pointer;
    transition: all 0.3s ease;
    height: 260px;
    flex: 1;
    margin: 0;
    border: 1px solid #ebeef5;

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
    }

    .card-content {
      text-align: center;
      padding: 40px 24px;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: #fff;

      .card-icon {
        margin-bottom: 24px;
        color: var(--el-color-primary);
        background-color: rgba(var(--el-color-primary-rgb), 0.1);
        width: 80px;
        height: 80px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      h3 {
        margin: 0 0 16px;
        font-size: 20px;
        color: #2c3e50;
        font-weight: 600;
      }

      p {
        margin: 0;
        color: #606266;
        font-size: 14px;
        line-height: 1.6;
        max-width: 240px;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 40px 20px;

    .nav-card {
      height: 220px;

      .card-content {
        padding: 30px 20px;

        .card-icon {
          width: 64px;
          height: 64px;
          margin-bottom: 20px;
        }

        h3 {
          font-size: 18px;
          margin-bottom: 12px;
        }
      }
    }
  }
}

.love-time {
  font-size: variables.$font-size-large;
  color: variables.$background-color;
  background-color: rgba(0, 0, 0, 0.4);
  padding: variables.$spacing-base variables.$spacing-large;
  border-radius: calc(variables.$border-radius * 2);
  display: inline-block;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: fade-in 0.8s ease-out;
  font-weight: 500;
  letter-spacing: 0.5px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    border: 1px solid rgba(255, 255, 255, 0.3);
    animation: pulse 2s infinite;
  }
}

@keyframes pulse {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.3;
    transform: scale(1.05);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.avatar {
  & {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    overflow: hidden;
    border: 4px solid variables.$background-color;
    box-shadow: variables.$box-shadow-large;

    @include mixins.respond-to(md) {
      width: 100px;
      height: 100px;
    }
  }

  &-container {
    @include mixins.flex-center;
    gap: variables.$spacing-large;
    margin-bottom: variables.$spacing-large;
  }

  &-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: variables.$spacing-base;
  }

  &-name {
    color: variables.$background-color;
    font-size: variables.$font-size-large;
    font-weight: 500;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.love-icon {
  font-size: 3rem;
  animation: heartbeat 1.5s infinite;
}

.timeline-preview {
  padding: 80px 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%);
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.05) 50%,
      rgba(0, 0, 0, 0) 100%
    );
  }

  .section-title {
    margin-bottom: 48px;
    font-size: 32px;
    color: #2c3e50;
    font-weight: 700;
    position: relative;
    display: inline-block;

    &::after {
      content: '';
      position: absolute;
      bottom: -16px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, var(--el-color-primary), #ff6b6b);
      border-radius: 2px;
    }
  }

  .preview-events {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: -15px;
    width: calc(100% + 30px);
  }

  .preview-event {
    width: calc(33.333% - 30px);
    margin: 15px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    border: none;
    border-radius: 12px;
    min-width: 300px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    position: relative;
    overflow: hidden;

    @media (max-width: 1024px) {
      width: calc(50% - 30px);
    }

    @media (max-width: 768px) {
      width: 100%;
      margin: 10px 15px;
    }

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);

      &::after {
        opacity: 1;
      }
    }

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, var(--el-color-primary), #ff6b6b);
      opacity: 0.7;
      transition: opacity 0.3s ease;
    }

    .el-card__body {
      padding: 28px;
    }

    .event-date {
      color: var(--el-color-primary);
      font-weight: 600;
      margin-bottom: 16px;
      font-size: 14px;
      display: inline-block;
      padding: 6px 16px;
      background-color: rgba(var(--el-color-primary-rgb), 0.1);
      border-radius: 16px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, rgba(var(--el-color-primary-rgb), 0.2), transparent);
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(var(--el-color-primary-rgb), 0.1);

        &::after {
          opacity: 1;
        }
      }
    }

    .event-title {
      color: #2c3e50;
      margin: 16px 0;
      font-size: 20px;
      font-weight: 700;
      transition: color 0.3s ease;
      position: relative;
      padding-bottom: 8px;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 40px;
        height: 2px;
        background: rgba(var(--el-color-primary-rgb), 0.3);
        transition: all 0.3s ease;
      }
    }

    .event-description {
      color: #606266;
      line-height: 1.7;
      font-size: 15px;
      display: -webkit-box;
      line-clamp: 3;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin: 16px 0 0;
      transition: color 0.3s ease;
    }

    &:hover {
      .event-title {
        color: var(--el-color-primary);

        &::after {
          width: 60px;
          background: var(--el-color-primary);
        }
      }

      .event-description {
        color: #303133;
      }
    }
  }

  .view-more {
    margin-top: 40px;
    padding: 12px 36px;
    font-size: 16px;
    height: auto;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(var(--el-color-primary-rgb), 0.2);
    }
  }

  @media (max-width: 768px) {
    padding: 40px 20px;

    .section-title {
      font-size: 24px;
      margin-bottom: 30px;
    }

    .preview-events {
      margin: -10px;
      width: calc(100% + 20px);
    }
  }
}

@keyframes heartbeat {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
