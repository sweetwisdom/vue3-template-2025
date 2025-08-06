<template>
  <a-modal
    v-model:open="visible2"
    :title="modalTitle"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :confirmLoading="loading"
    destroyOnClose
  >
  
  </a-modal>
</template>

<script setup>
import { ref, reactive, watch, toRefs, computed } from 'vue'
import { message } from 'ant-design-vue'

const props = defineProps({
    visible: Boolean,
  formConfig: Array, // [{ field, label, type, rules, defaultValue, options, componentProps }]
  title: String,
  loading: Boolean,
  modelValue: Object, // 用于编辑回显
})
const visible2 = ref(true)

const emit = defineEmits(['update:visible', 'submit'])

const formRef = ref()
const formModel = reactive({})
const formRules = reactive({})

// 初始化表单
const initForm = () => {
  props.formConfig.forEach((item) => {
    formModel[item.field] = props.modelValue?.[item.field] ?? item.defaultValue ?? ''
    if (item.rules) {
      formRules[item.field] = item.rules
    }
  })
}

// 弹窗打开时初始化
watch(
  () => props.visible,
  (val) => {
    if (val) {
      initForm()
    }
  },
)

const modalTitle = computed(() => props.title || (props.modelValue ? '编辑' : '新增'))

const handleSubmit = () => {
  formRef.value
    .validate()
    .then(() => {
      emit('submit', { ...formModel })
    })
    .catch(() => {
      message.warning('请完善表单信息')
    })
}

const handleCancel = () => {
  emit('update:visible', false)
}

const getComponent = (type) => {
  switch (type) {
    case 'input':
      return 'a-input'
    case 'textarea':
      return 'a-textarea'
    case 'select':
      return 'a-select'
    case 'date':
      return 'a-date-picker'
    case 'time':
      return 'a-time-picker'
    default:
      return 'a-input'
  }
}
</script>
