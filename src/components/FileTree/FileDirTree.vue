<template>
  <div class="file-dir-tree-wrap">
    <div class="tree-header">
      <h3 class="text-lg font-medium text-gray-800">文件结构</h3>
      <a-button type="text" size="small" @click="refreshTree" :loading="loading">
        <template #icon>
          <span class="i-carbon-refresh"></span>
        </template>
      </a-button>
    </div>

    <a-tree
      class="custom-tree"
      v-model:selectedKeys="selectedKeys"
      :tree-data="treeData"
      :load-data="onLoadData"
      show-icon
      :field-names="fieldNames"
      :loading="loading"
      @select="handleFileSelect"
    >
      <template #icon="{ key, data, expanded }">
        <FileIcon :data="data" :expanded="expanded" />
      </template>
    </a-tree>
  </div>
</template>

<script setup>
import FileIcon from './FileIcon.vue'
import { reactive, toRefs, ref, watch, onMounted } from 'vue'
import { getFileTree } from '@/api'

const props = defineProps({
  appId: {
    type: String,
    required: true,
  },
  selectedCommit: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['file-select'])

const treeData = ref([])
const selectedKeys = ref([])
const loading = ref(false)

const fieldNames = {
  children: 'children',
  title: 'name',
  key: 'id',
}

// 加载文件树
const loadFileTree = async (path = '') => {
  if (!props.appId || !props.selectedCommit) return

  try {
    loading.value = true
    const { data: res } = await getFileTree({
      appId: props.appId,
      ref: props.selectedCommit,
      path,
    })

    if (res.data) {
      // 转换数据格式，添加必要的字段
      const transformedData = res.data.map((item) => ({
        ...item,
        id: item.id,
        name: item.name,
        path: item.path,
        type: item.type,
        isLeaf: item.type === 'blob',
        children: item.type === 'tree' ? [] : undefined,
      }))

      if (path === '') {
        // 根目录
        treeData.value = transformedData
      } else {
        // 子目录，需要找到对应的父节点并更新
        updateTreeChildren(path, transformedData)
      }
    }
  } catch (error) {
    console.error('加载文件树失败:', error)
  } finally {
    loading.value = false
  }
}

// 更新树节点的子节点
const updateTreeChildren = (path, children) => {
  const updateNode = (nodes, targetPath) => {
    for (let node of nodes) {
      if (node.path === targetPath) {
        node.children = children
        break
      }
      if (node.children && node.children.length > 0) {
        updateNode(node.children, targetPath)
      }
    }
  }

  updateNode(treeData.value, path)
}

// 刷新文件树
const refreshTree = () => {
  loadFileTree()
}
async function onLoadData(node) {
  console.log('⚠️:[   return; ]🎈：', node.dataRef.path)
  await loadFileTree(node.dataRef.path)
}
// 处理文件选择
const handleFileSelect = (selectedKeys, info) => {
  const selectedNode = info.node
  if (selectedNode) {
    emit('file-select', {
      id: selectedNode.id,
      name: selectedNode.name,
      path: selectedNode.path,
      type: selectedNode.type,
      size: selectedNode.size,
      mode: selectedNode.mode,
    })
  }
}

// 监听appId变化
watch(
  () => props.appId,
  (newAppId) => {
    if (newAppId) {
      treeData.value = []
      selectedKeys.value = []
      loadFileTree()
    }
  },
  { immediate: true },
)

// 监听提交变化
watch(
  () => props.selectedCommit,
  (newCommit) => {
    if (newCommit && props.appId) {
      treeData.value = []
      selectedKeys.value = []
      loadFileTree()
    }
  },
)

onMounted(() => {
  if (props.appId && props.selectedCommit) {
    loadFileTree()
  }
})
</script>

<style>
.custom-tree {
  .ant-tree-switcher {
    margin-right: -10px;
    padding: 2px 2px;
  }
}

.custom-tree .ant-tree-node-content-wrapper {
  padding: 2px 2px;
}

.custom-tree .ant-tree-treenode-selected {
  background-color: #e6f7ff;
  width: 100%;
  border-radius: 6px;
}

.tree-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
}
</style>
