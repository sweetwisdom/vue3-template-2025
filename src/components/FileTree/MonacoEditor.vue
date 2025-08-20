<template>
  <div ref="editorContainer" class="monaco-editor-container"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import * as monaco from 'monaco-editor'

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  language: {
    type: String,
    default: 'plaintext'
  },
  options: {
    type: Object,
    default: () => ({})
  },
  height: {
    type: [String, Number],
    default: '600px'
  }
})

const emit = defineEmits(['change', 'update:value'])

const editorContainer = ref(null)
let editor = null

// 默认编辑器配置
const defaultOptions = {
  value: props.value,
  language: props.language,
  theme: 'vs',
  automaticLayout: true,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  fontSize: 14,
  lineNumbers: 'on',
  wordWrap: 'on',
  readOnly: false,
  ...props.options
}

// 初始化编辑器
const initEditor = () => {
  if (!editorContainer.value) return
  
  editor = monaco.editor.create(editorContainer.value, defaultOptions)
  
  // 监听内容变化
  editor.onDidChangeModelContent(() => {
    const value = editor.getValue()
    emit('change', value)
    emit('update:value', value)
  })
  
  // 设置编辑器高度
  if (props.height) {
    editorContainer.value.style.height = typeof props.height === 'number' ? `${props.height}px` : props.height
  }
}

// 更新编辑器值
const updateValue = (newValue) => {
  if (editor && newValue !== editor.getValue()) {
    editor.setValue(newValue)
  }
}

// 更新编辑器语言
const updateLanguage = (newLanguage) => {
  if (editor) {
    monaco.editor.setModelLanguage(editor.getModel(), newLanguage)
  }
}

// 更新编辑器选项
const updateOptions = (newOptions) => {
  if (editor) {
    editor.updateOptions(newOptions)
  }
}

// 销毁编辑器
const destroyEditor = () => {
  if (editor) {
    editor.dispose()
    editor = null
  }
}

// 监听值变化
watch(() => props.value, (newValue) => {
  updateValue(newValue)
})

// 监听语言变化
watch(() => props.language, (newLanguage) => {
  updateLanguage(newLanguage)
})

// 监听选项变化
watch(() => props.options, (newOptions) => {
  updateOptions(newOptions)
}, { deep: true })

// 监听高度变化
watch(() => props.height, (newHeight) => {
  if (editorContainer.value) {
    editorContainer.value.style.height = typeof newHeight === 'number' ? `${newHeight}px` : newHeight
  }
})

onMounted(() => {
  nextTick(() => {
    initEditor()
  })
})

onBeforeUnmount(() => {
  destroyEditor()
})

// 暴露编辑器实例
defineExpose({
  editor,
  getValue: () => editor?.getValue(),
  setValue: (value) => editor?.setValue(value),
  focus: () => editor?.focus(),
  layout: () => editor?.layout()
})
</script>

<style scoped>
.monaco-editor-container {
  width: 100%;
  height: 100%;
  min-height: 200px;
}
</style> 