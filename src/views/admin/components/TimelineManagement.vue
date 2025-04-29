<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'

const form = ref({
  date: '',
  title: '',
  description: '',
  image: '',
  tags: [] as string[],
})

const tempTag = ref('')
const imageUrl = ref('')

const handleImageUpload: UploadProps['onChange'] = (file) => {
  imageUrl.value = URL.createObjectURL(file.raw!)
  form.value.image = file.name
}

const addTag = () => {
  if (tempTag.value && !form.value.tags.includes(tempTag.value)) {
    form.value.tags.push(tempTag.value)
    tempTag.value = ''
  }
}

const removeTag = (tag: string) => {
  form.value.tags = form.value.tags.filter((t) => t !== tag)
}

const submitForm = async () => {
  try {
    // TODO: 替换为实际API调用
    console.log('提交数据:', form.value)
    ElMessage.success('提交成功')
    resetForm()
  } catch (error) {
    ElMessage.error('提交失败')
    console.error(error)
  }
}

const resetForm = () => {
  form.value = {
    date: '',
    title: '',
    description: '',
    image: '',
    tags: [],
  }
  imageUrl.value = ''
}
</script>

<template>
  <div class="timeline-management">
    <h2>时间轴管理</h2>
    <el-form label-width="100px">
      <el-form-item label="日期">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="选择日期"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item label="标题">
        <el-input
          v-model="form.title"
          placeholder="请输入标题"
        />
      </el-form-item>

      <el-form-item label="描述">
        <el-input
          v-model="form.description"
          type="textarea"
          :rows="3"
          placeholder="请输入描述"
        />
      </el-form-item>

      <el-form-item label="图片">
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-change="handleImageUpload"
        >
          <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
          />
          <el-icon
            v-else
            class="avatar-uploader-icon"
          >
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="标签">
        <el-input
          v-model="tempTag"
          placeholder="输入标签后按回车"
          @keyup.enter="addTag"
        />
        <div class="tags-container">
          <el-tag
            v-for="tag in form.tags"
            :key="tag"
            closable
            @close="removeTag(tag)"
          >
            {{ tag }}
          </el-tag>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="submitForm"
          >提交</el-button
        >
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.timeline-management {
  padding: 20px;
}

.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 150px;
  height: 150px;
}

.avatar-uploader:hover {
  border-color: var(--el-color-primary);
}

.avatar {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.tags-container {
  margin-top: 10px;
}

.tags-container .el-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
