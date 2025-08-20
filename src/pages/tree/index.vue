<template>
  <div class="w-vw bg-gray-50">
    <div class="flex h-vh">
      <!-- 左侧文件树 -->
      <div class="w-80 bg-white border-r border-gray-200 flex-shrink-0">
        <file-dir-tree 
          :app-id="appId"
          :selected-commit="selectedCommit"
          @file-select="handleFileSelect"
        />
      </div>
      
      <!-- 中间内容区域 -->
      <div class="flex-1 flex flex-col bg-white">
        <!-- 分支选择器 -->
        <branch-selector 
          :app-id="appId"
          @branch-change="handleBranchChange"
          @commit-change="handleCommitChange"
        />
        
        <!-- 文件预览区域 -->
        <div class="flex-1 overflow-hidden">
          <file-preview
            :app-id="appId"
            :current-file="currentFile"
            :selected-commit="selectedCommit"
            @file-change="handleFileChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import FileDirTree from '@/components/FileTree/FileDirTree.vue'
import BranchSelector from '@/components/FileTree/BranchSelector.vue'
import FilePreview from '@/components/FileTree/FilePreview.vue'

// 应用ID - 这里可以从路由参数或props获取
const appId = ref('1952934473607139329') // 示例ID，实际应该从路由获取

// 当前选中的提交
const selectedCommit = ref('')

// 当前选中的文件
const currentFile = ref(null)

// 处理分支切换
const handleBranchChange = (branchName) => {
  console.log('分支切换:', branchName)
  // 分支切换时清空当前文件
  currentFile.value = null
}

// 处理提交切换
const handleCommitChange = (commitId) => {
  console.log('提交切换:', commitId)
  selectedCommit.value = commitId
  // 提交切换时清空当前文件
  currentFile.value = null
}

// 处理文件选择
const handleFileSelect = (file) => {
  console.log('文件选择:', file)
  currentFile.value = file
}

// 处理文件变化
const handleFileChange = (file) => {
  console.log('文件变化:', file)
}

onMounted(() => {
  // 组件挂载后的初始化逻辑
  console.log('GitLab仓库文件视图组件已加载')
})
</script>

