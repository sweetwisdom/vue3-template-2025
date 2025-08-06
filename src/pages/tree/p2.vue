<template>
  <a-tree v-model:selectedKeys="selectedKeys" :tree-data="treeData" show-icon default-expand-all >
    <template #switcherIcon="{ switcherCls }"><down-outlined :class="switcherCls" /></template>
    <template #icon="{ key, data, expanded }">
      <FileIcon :fileType="data.fileType" :opend="expanded" />
      <!-- <template v-if="key === '0-0'">
        <smile-outlined />
      </template>
      <template v-else-if="key === '0-0-0'">
        <smile-outlined />
      </template> -->
    </template>
  </a-tree>
</template>
<script setup>
import { SmileOutlined, FrownFilled, FrownOutlined, DownOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'
import FileIcon from './FileIcon.vue'
const treeData = [
  {
    title: 'parent 1',
    key: '0-0',
    fileType: 'FOLD',
    children: [
      {
        title: 'leaf',
        key: '0-0-0',
        fileType: 'txt',
      },
       {
        title: 'leaf',
        key: '0-0-1',
        fileType: 'mp4',
      },
      {
        title: 'leaf',
        key: '0-0-1',
        fileType: 'mo',
      },
    ],
  },
]
const selectedKeys = ref(['0-0-0'])
</script>
