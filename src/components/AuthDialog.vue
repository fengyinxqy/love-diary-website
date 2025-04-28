<template>
  <el-dialog
    v-model="visible"
    :title="isLoginMode ? '登录' : '注册'"
    width="30%"
    :before-close="handleClose"
  >
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
      label-width="80px"
      @submit.prevent="submitForm"
    >
      <el-form-item
        label="用户名"
        prop="username"
      >
        <el-input
          v-model="form.username"
          placeholder="请输入用户名"
        />
      </el-form-item>

      <el-form-item
        v-if="!isLoginMode"
        label="邮箱"
        prop="email"
      >
        <el-input
          v-model="form.email"
          placeholder="请输入邮箱（选填）"
        />
      </el-form-item>

      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          v-model="form.password"
          type="password"
          placeholder="请输入密码"
          show-password
        />
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          :loading="authStore.isLoading"
          native-type="submit"
        >
          {{ isLoginMode ? '登录' : '注册' }}
        </el-button>
        <el-button @click="toggleMode">
          {{ isLoginMode ? '去注册' : '去登录' }}
        </el-button>
      </el-form-item>

      <el-alert
        v-if="authStore.error"
        :title="authStore.error"
        type="error"
        show-icon
        :closable="false"
      />
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { LoginParams, RegisterParams } from '@/types/auth'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const authStore = useAuthStore()
const formRef = ref()
const isLoginMode = ref(true)

const form = reactive({
  username: '',
  email: '',
  password: '',
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [{ required: false, type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
  ],
}

const visible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const toggleMode = () => {
  isLoginMode.value = !isLoginMode.value
  formRef.value?.resetFields()
  authStore.error = null
}

const handleClose = () => {
  visible.value = false
  formRef.value?.resetFields()
  authStore.error = null
}

const submitForm = async () => {
  try {
    await formRef.value.validate()
    const { username, password, email } = form

    if (isLoginMode.value) {
      const loginParams: LoginParams = {
        username,
        password,
      }
      await authStore.login(loginParams)
    } else {
      const registerParams: RegisterParams = {
        username,
        password,
        ...(email ? { email } : {}),
      }
      await authStore.register(registerParams)
    }

    handleClose()
  } catch (error) {
    console.error(error)
  }
}
</script>

<style scoped>
.el-form {
  padding: 20px;
}
</style>
