<template>
  <div class="timeline-management">
    <el-card
      shadow="hover"
      class="form-container"
    >
      <template #header>
        <div class="card-header">
          <span>添加时间轴记录</span>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.prevent="submitForm"
      >
        <el-form-item
          label="日期"
          prop="date"
        >
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </el-form-item>

        <el-form-item
          label="标题"
          prop="title"
        >
          <el-input
            v-model="form.title"
            placeholder="请输入标题"
            clearable
          />
        </el-form-item>

        <el-form-item
          label="描述"
          prop="description"
        >
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="4"
            placeholder="请输入详细描述"
            show-word-limit
            maxlength="500"
          />
        </el-form-item>

        <el-form-item label="图片URL">
          <el-input
            v-model="form.image"
            placeholder="请输入图片URL"
            clearable
          />
        </el-form-item>

        <el-form-item
          label="标签"
          class="tag-form"
        >
          <div class="tag-input-container">
            <el-input
              v-model="tempTag"
              placeholder="输入标签后按回车添加"
              @keyup.enter="addTag"
              clearable
              style="flex: 1"
            />
            <el-select
              v-model="tempTagType"
              placeholder="选择类型"
              style="width: 120px; margin-left: 10px"
            >
              <el-option
                v-for="type in tagTypes"
                :key="type.value"
                :label="type.label"
                :value="type.value"
              />
            </el-select>
            <el-button
              type="primary"
              plain
              @click="addTag"
              style="margin-left: 10px"
            >
              添加
            </el-button>
          </div>
          <div class="tags-container">
            <el-tag
              v-for="tag in form.tags"
              :key="tag.text"
              :type="tag.type || ''"
              closable
              @close="removeTag(tag)"
              class="tag-item"
            >
              {{ tag.text }}
            </el-tag>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm"
            :loading="isSubmitting"
          >
            提交
          </el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'

// 标签类型定义
interface Tag {
  text: string
  type?: string
}

const formRef = ref<FormInstance>()
const isSubmitting = ref(false)
const tempTag = ref('')
const tempTagType = ref('')

const tagTypes = [
  { value: '', label: '默认' },
  { value: 'success', label: '成功' },
  { value: 'info', label: '信息' },
  { value: 'warning', label: '警告' },
  { value: 'danger', label: '危险' },
]

const form = ref({
  date: '',
  title: '',
  description: '',
  image: '',
  tags: [] as Tag[],
})

const rules = ref<FormRules>({
  date: [{ required: true, message: '请选择日期', trigger: 'blur' }],
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
  ],
  description: [
    { required: true, message: '请输入描述', trigger: 'blur' },
    { min: 10, message: '至少输入 10 个字符', trigger: 'blur' },
  ],
})

const addTag = () => {
  if (tempTag.value.trim()) {
    const newTag: Tag = {
      text: tempTag.value.trim(),
      type: tempTagType.value || undefined,
    }

    // 检查是否已存在相同文本和类型的标签
    const exists = form.value.tags.some((t) => t.text === newTag.text && t.type === newTag.type)

    if (!exists) {
      form.value.tags.push(newTag)
      tempTag.value = ''
      tempTagType.value = ''
    }
  }
}

const removeTag = (tag: Tag) => {
  form.value.tags = form.value.tags.filter((t) => !(t.text === tag.text && t.type === tag.type))
}
const submitForm = async () => {
  try {
    await formRef.value?.validate()
    isSubmitting.value = true
    // TODO: 替换为实际API调用
    console.log('提交数据:', form.value)
    ElMessage.success('提交成功')
    resetForm()
  } catch (error) {
    ElMessage.error('提交失败')
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  formRef.value?.resetFields()
  form.value.tags = []
}
</script>

<style lang="scss" scoped>
.timeline-management {
  padding: 20px;
}

.form-container {
  max-width: 800px;
  margin: 0 auto;
}

.card-header {
  font-size: 18px;
  font-weight: 600;
}

.tag-form {
  :deep(.el-form-item__content) {
    flex-direction: column;
    align-items: flex-start;
  }
}

.tag-input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-left: 5px;
}

.el-tag {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
