<template>
  <div class="admin-view">
    <el-card class="settings-card">
      <template #header>
        <div class="card-header">
          <h2>网站设置</h2>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="120px"
        @submit.prevent="handleSubmit"
      >
        <el-form-item
          label="男主名称"
          prop="boyName"
        >
          <el-input
            v-model="form.boyName"
            placeholder="请输入男主名称"
          />
        </el-form-item>

        <el-form-item
          label="女主名称"
          prop="girlName"
        >
          <el-input
            v-model="form.girlName"
            placeholder="请输入女主名称"
          />
        </el-form-item>

        <el-form-item
          label="在一起的时间"
          prop="togetherDate"
        >
          <el-date-picker
            v-model="form.togetherDate"
            type="date"
            placeholder="选择日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>

        <el-form-item
          label="首页文字说明"
          prop="description"
        >
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="4"
            placeholder="记录我们的每一个甜蜜瞬间..."
          />
        </el-form-item>

        <el-form-item>
          <el-button
            type="primary"
            native-type="submit"
            :loading="isSubmitting"
          >
            保存设置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useSettingsStore } from '@/stores/settings'

const settingsStore = useSettingsStore()
const formRef = ref()
const isSubmitting = ref(false)

const form = reactive({
  boyName: '',
  girlName: '',
  togetherDate: '',
  description: '',
})

const rules = {
  boyName: [{ required: true, message: '请输入男主名称', trigger: 'blur' }],
  girlName: [{ required: true, message: '请输入女主名称', trigger: 'blur' }],
  togetherDate: [{ required: true, message: '请选择在一起的时间', trigger: 'change' }],
  description: [{ required: true, message: '请输入首页文字说明', trigger: 'blur' }],
}

// 加载现有设置
onMounted(async () => {
  try {
    const settings = await settingsStore.fetchSettings()
    form.boyName = settings.boyName
    form.girlName = settings.girlName
    form.togetherDate = settings.togetherDate
    form.description = settings.description
  } catch (error) {
    ElMessage.error('加载设置失败')
  }
})

// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    isSubmitting.value = true
    await settingsStore.updateSettings(form)
    ElMessage.success('设置已保存')
  } catch (error) {
    if (error instanceof Error) {
      ElMessage.error(error.message)
    } else {
      ElMessage.error('保存设置失败')
    }
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped lang="scss">
.admin-view {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.settings-card {
  margin-top: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
