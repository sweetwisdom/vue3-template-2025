<template>
  <FormModal
    v-model:visible="modalVisible"
    :formConfig="formFields"
    :modelValue="currentRecord"
    :title="isEdit ? '编辑用户' : '新增用户'"
    :loading="loading"
    @submit="handleSubmit"
  />
  <a-button @click="modalVisible = true"> 打开 </a-button>
</template>

<script setup>
import { ref } from 'vue'
import FormModal from '@/components/FormModal.vue'

const modalVisible = ref(false)
const isEdit = ref(false)
const loading = ref(false)

const currentRecord = ref({}) // 编辑时赋值

const formFields = [
  {
    field: 'username',
    label: '用户名',
    type: 'input',
    defaultValue: '',
    rules: [{ required: true, message: '请输入用户名' }],
  },
  {
    field: 'role',
    label: '角色',
    type: 'select',
    options: [
      { label: '管理员', value: 'admin' },
      { label: '用户', value: 'user' },
    ],
    rules: [{ required: true, message: '请选择角色' }],
  },
]

const handleSubmit = (formData) => {
  loading.value = true
  setTimeout(() => {
    console.log('提交数据：', formData)
    loading.value = false
    modalVisible.value = false
  }, 1000)
}
</script>
