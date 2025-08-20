<template>
  <div class="branch-selector">
    <a-select
      v-model:value="selectedBranch"
      placeholder="选择分支"
      style="width: 200px"
      @change="handleBranchChange"
      :loading="loading"
    >
      <a-select-option
        v-for="branch in branches"
        :key="branch.branchName"
        :value="branch.branchName"
      >
        <div class="flex items-center gap-2">
          <span class="i-carbon-git-branch text-blue-500"></span>
          {{ branch.branchName }}
        </div>
      </a-select-option>
    </a-select>

    <a-select
      v-model:value="selectedCommit"
      placeholder="选择提交"
      style="width: 300px; margin-left: 12px"
      @change="handleCommitChange"
      :loading="commitsLoading"
      :disabled="!selectedBranch"
    >
      <a-select-option v-for="commit in commits" :key="commit.commitId" :value="commit.commitId">
        <!-- <div >
          <span class="i-carbon-commit text-green-500"></span>
          <span class="text-sm font-medium">{{ commit.commitId.substring(0, 8) }}</span>
        </div> -->
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <span class="i-carbon-commit ">commit:</span>
            <span class="text-sm font-medium">{{ commit.commitId.substring(0, 8) }}</span>
          </div>
          <div class="text-xs text-blue-500 mt-1">{{ commit.commitInfo }}</div>
          <div class="text-xs text-gray-400">{{ formatDate(commit.createdAt) }}</div>
        </div>
      </a-select-option>
    </a-select>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { getAppBranch, getAppVersion } from '@/api'

const props = defineProps({
  appId: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['branch-change', 'commit-change'])

const selectedBranch = ref('')
const selectedCommit = ref('')
const branches = ref([])
const commits = ref([])
const loading = ref(false)
const commitsLoading = ref(false)

// 获取分支列表
const fetchBranches = async () => {
  try {
    loading.value = true
    const { data: res } = await getAppBranch({
      appId: props.appId,
      pageIndex: 1,
      pageSize: 100,
    })
    if (res.data?.data) {
      branches.value = res.data.data
      if (branches.value.length > 0 && !selectedBranch.value) {
        selectedBranch.value = branches.value[0].branchName
      }
    }
  } catch (error) {
    console.error('获取分支列表失败:', error)
  } finally {
    loading.value = false
  }
}

// 获取提交记录
const fetchCommits = async (branchName) => {
  if (!branchName) return

  try {
    commitsLoading.value = true
    const { data: res } = await getAppVersion({
      appId: props.appId,
      branchName,
    })
    if (res.data) {
      commits.value = res.data
      if (commits.value.length > 0 && !selectedCommit.value) {
        selectedCommit.value = commits.value[0].commitId
        handleCommitChange(selectedCommit.value)
      }
    }
  } catch (error) {
    console.error('获取提交记录失败:', error)
  } finally {
    commitsLoading.value = false
  }
}

// 分支切换
const handleBranchChange = (value) => {
  selectedCommit.value = ''
  emit('branch-change', value)
  fetchCommits(value)
}

// 提交切换
const handleCommitChange = (value) => {
  emit('commit-change', value)
}

// 格式化日期
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 监听appId变化
watch(
  () => props.appId,
  (newAppId) => {
    if (newAppId) {
      selectedBranch.value = ''
      selectedCommit.value = ''
      fetchBranches()
    }
  },
  { immediate: true },
)

// 监听分支变化
watch(selectedBranch, (newBranch) => {
  if (newBranch) {
    fetchCommits(newBranch)
  }
})

onMounted(() => {
  if (props.appId) {
    fetchBranches()
  }
})
</script>

<style scoped>
.branch-selector {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
}
</style>
