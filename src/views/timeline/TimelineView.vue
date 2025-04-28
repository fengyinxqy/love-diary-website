<template>
  <div class="timeline-view">
    <!-- 页面头部 -->
    <div class="page-header">
      <el-page-header @back="goBack">
        <template #content>
          <div class="header-content">
            <h1 class="title">我们的时光轴</h1>
            <p class="subtitle">记录每一个值得铭记的瞬间</p>
          </div>
        </template>
      </el-page-header>
    </div>

    <!-- 时间轴内容 -->
    <div class="timeline-container">
      <el-timeline>
        <el-timeline-item
          v-for="(event, index) in loveEvents"
          :key="index"
          :timestamp="event.date"
          :type="getTimelineItemType(index)"
          :hollow="index % 2 === 0"
          placement="top"
        >
          <el-card
            class="timeline-card"
            shadow="hover"
          >
            <div class="card-content">
              <div
                class="image-container"
                v-if="event.image"
              >
                <el-image
                  :src="event.image"
                  :alt="event.title"
                  fit="cover"
                  :preview-src-list="[event.image]"
                  class="event-image"
                >
                  <template #placeholder>
                    <div class="image-placeholder">
                      <el-icon><Picture /></el-icon>
                    </div>
                  </template>
                </el-image>
              </div>
              <div class="text-content">
                <h3 class="event-title">{{ event.title }}</h3>
                <p class="event-description">{{ event.description }}</p>
                <div class="event-meta">
                  <el-tag
                    size="small"
                    :type="getTagType(index)"
                  >
                    {{ event.category || '美好回忆' }}
                  </el-tag>
                </div>
              </div>
            </div>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <!-- 添加新事件按钮 -->
      <div class="add-event">
        <el-button
          type="primary"
          round
          @click="handleAddEvent"
        >
          <el-icon><Plus /></el-icon>
          添加新回忆
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Picture, Plus, Location } from '@element-plus/icons-vue'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

const getTimelineItemType = (index: number) => {
  const types = ['primary', 'success', 'warning', 'danger', 'info']
  return types[index % types.length] || 'primary'
}

const getTagType = (index: number) => {
  const types = ['primary', 'success', 'warning', 'danger', 'info']
  return types[index % types.length] || 'primary'
}

const handleAddEvent = () => {
  // 添加新事件的逻辑
  console.log('添加新回忆')
}

const loveEvents = ref([
  {
    date: '2023-01-01',
    title: '我们的相遇',
    description: '在这个特别的日子，我们相遇了，这是我们故事的开始...',
    image: '@/assets/first-meet.jpg',
    category: '初识',
  },
  {
    date: '2023-02-14',
    title: '第一个情人节',
    description: '一起度过了浪漫的情人节，永远记得那天的点点滴滴...',
    image: '@/assets/valentine.jpg',
    category: '节日',
  },
  {
    date: '2023-05-20',
    title: '520告白日',
    description: '在这个特别的日子里，我们互相表达了爱意...',
    image: '@/assets/confession.jpg',
    category: '重要时刻',
  },
])
</script>

<style lang="scss" scoped>
@use '@/assets/styles/variables';
@use '@/assets/styles/mixins';

.timeline-view {
  padding: 20px;
  background-color: #f8f9fa;
  min-height: 100vh;

  .page-header {
    margin-bottom: 40px;

    .header-content {
      .title {
        margin: 0;
        font-size: 28px;
        color: #2c3e50;
        font-weight: 600;
      }

      .subtitle {
        margin: 8px 0 0;
        color: #7f8c8d;
        font-size: 16px;
      }
    }
  }

  .timeline-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;

    :deep(.el-timeline) {
      padding-left: 20px;

      .el-timeline-item {
        padding-bottom: 30px;

        .el-timeline-item__timestamp {
          font-size: 16px;
          color: #7f8c8d;
          margin-bottom: 10px;
        }
      }
    }

    .timeline-card {
      margin-top: 10px;
      border-radius: 12px;
      transition: all 0.3s ease;
      border: none;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      }

      .card-content {
        display: flex;
        flex-direction: column;

        .image-container {
          height: 200px;
          overflow: hidden;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;

          .event-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;

            &:hover {
              transform: scale(1.05);
            }
          }

          .image-placeholder {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f5f7fa;

            .el-icon {
              font-size: 40px;
              color: #c0c4cc;
            }
          }
        }

        .text-content {
          padding: 20px;

          .event-title {
            margin: 0 0 10px;
            font-size: 20px;
            color: #2c3e50;
          }

          .event-description {
            margin: 0 0 15px;
            color: #666;
            line-height: 1.6;
          }

          .event-meta {
            display: flex;
            align-items: center;
            gap: 10px;

            .location {
              display: flex;
              align-items: center;
              color: #7f8c8d;
              font-size: 14px;

              .el-icon {
                margin-right: 5px;
              }
            }
          }
        }
      }
    }

    .add-event {
      text-align: center;
      margin-top: 40px;

      .el-button {
        padding: 12px 24px;
        font-size: 16px;

        .el-icon {
          margin-right: 8px;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 15px;

    .page-header {
      margin-bottom: 30px;

      .header-content {
        .title {
          font-size: 24px;
        }

        .subtitle {
          font-size: 14px;
        }
      }
    }

    .timeline-container {
      padding: 10px;

      :deep(.el-timeline) {
        padding-left: 10px;
      }

      .timeline-card {
        .card-content {
          .image-container {
            height: 160px;
          }

          .text-content {
            padding: 15px;

            .event-title {
              font-size: 18px;
            }
          }
        }
      }
    }
  }
}
</style>
