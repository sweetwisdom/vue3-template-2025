<template>
  <a-modal
    :visible="visible"
    :title="modalTitle"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :confirmLoading="loading"
    destroyOnClose
  >
    <a-form
      :model="formModel"
      :rules="formRules"
      ref="formRef"
      label-col="{ span: 5 }"
      wrapper-col="{ span: 18 }"
    >
      <template v-for="item in formConfig" :key="item.field">
        <a-form-item :label="item.label" :name="item.field">
          <component
            :is="getComponent(item.type)"
            v-model:value="formModel[item.field]"
            v-bind="item.componentProps || {}"
            :placeholder="item.placeholder || `请输入${item.label}`"
          >
            <!-- 如果是 select，则插入空选项 -->
            <a-select-option
              v-if="item.type === 'select'"
              v-for="opt in item.options || []"
              :key="opt.value"
              :value="opt.value"
            >
              {{ opt.label }}
            </a-select-option>
          </component>
        </a-form-item>
      </template>
    </a-form>
  </a-modal>
</template>

<script setup>
import { ref, reactive, watch, toRefs } from 'vue'
import { message } from 'ant-design-vue'

const props = defineProps({
  visible: Boolean,
  formConfig: Array, // [{ field, label, type, rules, defaultValue, options, componentProps }]
  title: String,
  loading: Boolean,
  modelValue: Object, // 用于编辑回显
})

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
