<template>
  <div class="file-preview">
    <!-- 工具栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <span class="file-name">{{ currentFile?.name || '未选择文件' }}</span>
        <span v-if="fileSize" class="file-size">({{ fileSize}})</span>
      </div>
      <div class="toolbar-right">
        <a-button 
          type="primary" 
          size="small" 
          @click="handleDownload"
          :disabled="!currentFile"
        >
          <template #icon>
            <span class="i-carbon-download"></span>
          </template>
          下载
        </a-button>
        <a-button 
          size="small" 
          @click="handleCopyPath"
          :disabled="!currentFile"
        >
          <template #icon>
            <span class="i-carbon-copy"></span>
          </template>
          复制路径
        </a-button>
      </div>
    </div>

    <!-- 文件内容区域 -->
    <div class="file-content">
      <!-- 加载状态 -->
      <div v-if="loading" class="loading-container">
        <a-spin size="large">
          <template #indicator>
            <span class="i-carbon-document text-2xl text-blue-500"></span>
          </template>
        </a-spin>
        <div class="mt-4 text-gray-500">正在加载文件内容...</div>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="error-container">
        <span class="i-carbon-warning text-2xl text-red-500"></span>
        <div class="mt-2 text-red-500">{{ error }}</div>
        <a-button type="primary" @click="retryLoad" class="mt-4">重试</a-button>
      </div>

      <!-- 文件内容 -->
      <div v-else-if="currentFile && fileContent" class="content-container">
        <!-- 代码文件 -->
        <div v-if="isCodeFile" class="code-editor">
          <MonacoEditor
            v-model:value="fileContent"
            :language="getLanguage()"
            :options="editorOptions"
            :height="editorHeight"
            @change="handleCodeChange"
          />
        </div>

        <!-- 图片文件 -->
        <div v-else-if="isImageFile" class="image-preview">
          <img 
            :src="imageSrc" 
            :alt="currentFile.name"
            class="max-w-full max-h-full object-contain"
            @load="handleImageLoad"
            @error="handleImageError"
          />
        </div>

        <!-- 文本文件 -->
        <div v-else-if="isTextFile" class="text-preview">
          <pre class="text-content">{{ fileContent }}</pre>
        </div>

        <!-- 其他文件类型 -->
        <div v-else class="other-file">
          <div class="text-center py-8">
            <span class="i-carbon-document text-4xl text-gray-400"></span>
            <div class="mt-2 text-gray-500">不支持预览此文件类型</div>
            <a-button type="primary" @click="handleDownload" class="mt-4">下载文件</a-button>
          </div>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-else class="empty-container">
        <span class="i-carbon-document text-4xl text-gray-400"></span>
        <div class="mt-2 text-gray-500">请选择一个文件进行预览</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { message } from 'ant-design-vue'
import { getFileContent, downloadFile } from '@/api'
import MonacoEditor from './MonacoEditor.vue'

const props = defineProps({
  appId: {
    type: String,
    required: true
  },
  currentFile: {
    type: Object,
    default: null
  },
  selectedCommit: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['file-change'])

const fileContent = ref('')
const fileSize=ref('')
const loading = ref(false)
const error = ref('')
const imageSrc = ref('')
const editorHeight = ref(600)

// 编辑器配置
const editorOptions = {
  readOnly: true,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  fontSize: 14,
  lineNumbers: 'on',
  wordWrap: 'on',
  automaticLayout: true,
}

// 判断是否为代码文件
const isCodeFile = computed(() => {
  if (!props.currentFile) return false
  const codeExtensions = ['js', 'ts', 'jsx', 'tsx', 'vue', 'py', 'java', 'cpp', 'c', 'cs', 'php', 'rb', 'go', 'rs', 'swift', 'kt', 'scala', 'mo', 'md', 'json', 'xml', 'html', 'css', 'scss', 'less', 'sql', 'sh', 'yaml', 'yml', 'toml', 'ini', 'cfg', 'conf']
  const extension = props.currentFile.name.split('.').pop()?.toLowerCase()
  return codeExtensions.includes(extension)
})

// 判断是否为图片文件
const isImageFile = computed(() => {
  if (!props.currentFile) return false
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico']
  const extension = props.currentFile.name.split('.').pop()?.toLowerCase()
  return imageExtensions.includes(extension)
})

// 判断是否为文本文件
const isTextFile = computed(() => {
  if (!props.currentFile) return false
  const textExtensions = ['txt', 'log', 'csv', 'md', 'rst', 'tex', 'adoc']
  const extension = props.currentFile.name.split('.').pop()?.toLowerCase()
  return textExtensions.includes(extension)
})

// 获取Monaco Editor语言
const getLanguage = () => {
  if (!props.currentFile) return 'plaintext'
  const extension = props.currentFile.name.split('.').pop()?.toLowerCase()
  const languageMap = {
    'js': 'javascript',
    'ts': 'typescript',
    'jsx': 'javascript',
    'tsx': 'typescript',
    'vue': 'html',
    'py': 'python',
    'java': 'java',
    'cpp': 'cpp',
    'c': 'c',
    'cs': 'csharp',
    'php': 'php',
    'rb': 'ruby',
    'go': 'go',
    'rs': 'rust',
    'swift': 'swift',
    'kt': 'kotlin',
    'scala': 'scala',
    'mo': 'plaintext',
    'md': 'markdown',
    'json': 'json',
    'xml': 'xml',
    'html': 'html',
    'css': 'css',
    'scss': 'scss',
    'less': 'less',
    'sql': 'sql',
    'sh': 'shell',
    'yaml': 'yaml',
    'yml': 'yaml',
    'toml': 'plaintext',
    'ini': 'ini',
    'cfg': 'plaintext',
    'conf': 'plaintext'
  }
  return languageMap[extension] || 'plaintext'
}

// 加载文件内容
const loadFileContent = async () => {
  if (!props.currentFile || !props.selectedCommit) return
  
  try {
    loading.value = true
    error.value = ''
    
    const {data:res} = await getFileContent({
      appId: props.appId,
      ref: props.selectedCommit,
      path: props.currentFile.path
    })
    
    if (res.data?.content) {
      // 处理size
      if(res.data.size){
        fileSize.value= formatFileSize(res.data.size)
      }
      // 如果是base64编码，需要解码
      if (res.data.encoding === 'base64') {
        fileContent.value = atob(res.data.content)
      } else {
        fileContent.value = res.data.content
      }
      
      // 如果是图片文件，设置图片源
      if (isImageFile.value) {
        imageSrc.value = `data:image/${getImageMimeType()};base64,${res.data.content}`
      }
      
      emit('file-change', props.currentFile)
    } else {
      error.value = '文件内容为空'
    }
  } catch (err) {
    console.error('加载文件内容失败:', err)
    error.value = '加载文件内容失败，请重试'
  } finally {
    loading.value = false
  }
}

// 获取图片MIME类型
const getImageMimeType = () => {
  if (!props.currentFile) return 'image/png'
  const extension = props.currentFile.name.split('.').pop()?.toLowerCase()
  const mimeMap = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'bmp': 'image/bmp',
    'webp': 'image/webp',
    'svg': 'image/svg+xml',
    'ico': 'image/x-icon'
  }
  return mimeMap[extension] || 'image/png'
}

// 重试加载
const retryLoad = () => {
  loadFileContent()
}

// 下载文件
const handleDownload = async () => {
  if (!props.currentFile) return
  
  try {
    const res = await downloadFile({
      appId: props.appId,
      ref: props.selectedCommit,
      path: props.currentFile.path
    })
    
    // 创建下载链接
    const blob = new Blob([res.data])
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = props.currentFile.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
    
    message.success('文件下载成功')
  } catch (err) {
    console.error('下载文件失败:', err)
    message.error('下载文件失败，请重试')
  }
}

// 复制文件路径
const handleCopyPath = async () => {
  if (!props.currentFile) return
  
  try {
    await navigator.clipboard.writeText(props.currentFile.path)
    message.success('文件路径已复制到剪贴板')
  } catch (err) {
    console.error('复制失败:', err)
    message.error('复制失败，请手动复制')
  }
}

// 代码变化处理
const handleCodeChange = (value) => {
  fileContent.value = value
}

// 图片加载成功
const handleImageLoad = () => {
  // 图片加载成功后的处理
}

// 图片加载失败
const handleImageError = () => {
  error.value = '图片加载失败'
}

// 格式化文件大小
const formatFileSize = (size) => {
  if (!size) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let index = 0
  let fileSize = parseInt(size)
  
  while (fileSize >= 1024 && index < units.length - 1) {
    fileSize /= 1024
    index++
  }
  
  return `${fileSize.toFixed(1)} ${units[index]}`
}

// 监听文件变化
watch(() => props.currentFile, (newFile) => {
    fileSize.value=''
  if (newFile) {
    loadFileContent()
  } else {
    fileContent.value = ''
    
    imageSrc.value = ''
    error.value = ''
  }
}, { immediate: true })

// 监听提交变化
watch(() => props.selectedCommit, (newCommit) => {
  if (newCommit && props.currentFile) {
    loadFileContent()
  }
})
</script>

<style scoped>
.file-preview {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #fff;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.file-name {
  font-weight: 500;
  color: #262626;
}

.file-size {
  color: #8c8c8c;
  font-size: 12px;
}

.toolbar-right {
  display: flex;
  gap: 8px;
}

.file-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.loading-container,
.error-container,
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #8c8c8c;
}

.content-container {
  height: 100%;
  overflow: hidden;
}

.code-editor {
  height: 100%;
}

.image-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
  overflow: auto;
}

.text-preview {
  height: 100%;
  overflow: auto;
  padding: 16px;
}

.text-content {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.other-file {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style> 