<template>
  <div class="gallery-view">
    <el-page-header
      @back="goBack"
      title="返回首页"
    >
      <template #content>
        <h1 class="title">恋爱相册</h1>
      </template>
    </el-page-header>

    <div class="gallery-container">
      <el-tabs
        v-model="activeTab"
        type="card"
      >
        <el-tab-pane
          label="全部照片"
          name="all"
        >
          <el-image
            v-for="(photo, index) in photos"
            :key="index"
            :src="photo.url"
            :preview-src-list="previewList"
            :initial-index="index"
            fit="cover"
            class="photo-item"
          ></el-image>
        </el-tab-pane>
        <el-tab-pane
          label="精选"
          name="featured"
        >
          <el-image
            v-for="(photo, index) in featuredPhotos"
            :key="index"
            :src="photo.url"
            :preview-src-list="previewFeaturedList"
            :initial-index="index"
            fit="cover"
            class="photo-item"
          ></el-image>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.push('/')
}

const activeTab = ref('all')

const photos = ref([
  { url: '@/assets/gallery/photo1.jpg' },
  { url: '@/assets/gallery/photo2.jpg' },
  { url: '@/assets/gallery/photo3.jpg' },
  { url: '@/assets/gallery/photo4.jpg' },
  { url: '@/assets/gallery/photo5.jpg' },
  { url: '@/assets/gallery/photo6.jpg' },
])

const featuredPhotos = computed(() => {
  return photos.value.filter((_, index) => index % 2 === 0)
})

const previewList = computed(() => {
  return photos.value.map((photo) => photo.url)
})

const previewFeaturedList = computed(() => {
  return featuredPhotos.value.map((photo) => photo.url)
})
</script>

<style lang="scss" scoped>
.gallery-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;

  .title {
    margin: 0;
    font-size: 24px;
  }

  .gallery-container {
    margin-top: 30px;

    .photo-item {
      width: 200px;
      height: 200px;
      margin: 10px;
      border-radius: 8px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      transition: transform 0.3s;

      &:hover {
        transform: scale(1.05);
      }
    }
  }
}
</style>
