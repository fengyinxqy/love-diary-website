<template>
  <div class="home">
    <!-- Banner Section -->
    <section class="banner">
      <div class="banner-content">
        <div class="avatar-container">
          <div class="avatar avatar-left">
            <img
              src="@/assets/avatar-placeholder.png"
              alt="Ta"
            />
          </div>
          <div class="love-icon">❤️</div>
          <div class="avatar avatar-right">
            <img
              src="@/assets/avatar-placeholder.png"
              alt="我"
            />
          </div>
        </div>
        <h1 class="banner-title">Our Love Story</h1>
        <p class="banner-subtitle">记录我们的每一个甜蜜瞬间</p>
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
import { ref } from 'vue'

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
  }
}

.avatar {
  &-container {
    @include flex-center;
    gap: $spacing-large;
    margin-bottom: $spacing-large;
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
