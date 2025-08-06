<template>
  <a-tree
    class="custom-tree"
    v-model:selectedKeys="selectedKeys"
    :tree-data="treeData"
    show-icon
    default-expand-all
  >
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
        title: '111.txt',
        key: '0-0-0',
        fileType: 'txt',
      },
      {
        title: '111.mp4',
        key: '0-0-1',
        fileType: 'mp4',
      },
      {
        title: '222.mo',
        key: '0-0-2',
        fileType: 'mo',
      },
    ],
  },
]
const selectedKeys = ref(['0-0-0'])
</script>

<style>
/* 修改所有节点文字大小 */

/* 针对特定节点 */
.custom-tree .ant-tree-title {
  font-size: 26px !important;
  margin-left: 10px;
}
.custom-tree .ant-tree-treenode {
  /* margin-bottom: 20px; */
}
.custom-tree .ant-tree-node-content-wrapper {
  padding: 10px 5px;
}
</style>
