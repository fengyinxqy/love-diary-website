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

    <!-- Timeline Section -->
    <section class="timeline-section">
      <h2 class="section-title">我们的时光</h2>
      <div class="timeline">
        <div
          v-for="(event, index) in loveEvents"
          :key="index"
          class="timeline-item"
          :class="{ left: index % 2 === 0, right: index % 2 === 1 }"
        >
          <div class="timeline-content">
            <div class="date">{{ event.date }}</div>
            <h3 class="title">{{ event.title }}</h3>
            <p class="description">{{ event.description }}</p>
            <img
              v-if="event.image"
              :src="event.image"
              :alt="event.title"
              class="event-image"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

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
@import '@/assets/styles/variables';
@import '@/assets/styles/mixins';

.home {
  width: 100%;
  min-height: 100vh;
}

.banner {
  height: 100vh;
  background:
    linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('@/assets/banner-bg.jpg') center/cover no-repeat;
  @include flex-center;
  color: $background-color;
  text-align: center;

  &-content {
    padding: $spacing-large;
  }

  &-title {
    @include heading-1;
    margin-bottom: $spacing-base;
  }

  &-subtitle {
    font-size: $font-size-large;
    opacity: 0.9;
    margin-bottom: $spacing-base;
  }
}

.love-time {
  font-size: $font-size-large;
  color: $background-color;
  background-color: rgba(0, 0, 0, 0.4);
  padding: $spacing-base $spacing-large;
  border-radius: calc($border-radius * 2);
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
  &-container {
    @include flex-center;
    gap: $spacing-large;
    margin-bottom: $spacing-large;
  }

  &-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-base;
  }

  &-name {
    color: $background-color;
    font-size: $font-size-large;
    font-weight: 500;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid $background-color;
  box-shadow: $box-shadow-large;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @include respond-to(md) {
    width: 100px;
    height: 100px;
  }
}

.love-icon {
  font-size: 3rem;
  animation: heartbeat 1.5s infinite;
}

.timeline {
  &-section {
    padding: $spacing-xlarge $spacing-large;
    background-color: #f5f5f5;
  }

  position: relative;
  max-width: $breakpoint-xl;
  margin: 0 auto;

  &::after {
    content: '';
    position: absolute;
    width: 4px;
    background-color: $primary-color;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);

    @include respond-to(md) {
      left: 31px;
    }
  }

  &-item {
    padding: $spacing-base $spacing-xlarge;
    position: relative;
    width: 50%;
    opacity: 0;
    transform: translateY(20px);
    animation: fade-in $animation-duration ease forwards;

    &.left {
      left: 0;
    }

    &.right {
      left: 50%;
    }

    @include respond-to(md) {
      width: 100%;
      padding-left: 70px;
      padding-right: $spacing-large;

      &.right {
        left: 0;
      }
    }
  }

  &-content {
    @include card;

    .date {
      color: $primary-color;
      font-weight: bold;
      margin-bottom: $spacing-base;
    }

    .title {
      color: $secondary-color;
      margin-bottom: $spacing-base;
    }

    .description {
      color: $light-text-color;
      line-height: 1.6;
    }

    .event-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: $border-radius;
      margin-top: $spacing-base;
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
