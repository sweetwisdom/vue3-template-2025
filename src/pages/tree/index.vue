<template>
  <div>
    <div style="margin-bottom: 16px">
      showLine:
      <a-switch v-model:checked="showLine" />
      <br />
      <br />
      showIcon:
      <a-switch v-model:checked="showIcon" />
    </div>
    <a-tree
      :show-line="showLine"
      :show-icon="showIcon"
      :default-expanded-keys="['0-0-0']"
      :tree-data="treeData"
      @select="onSelect"
    >
      <template #title="{ dataRef }">
        <template v-if="dataRef.key === '0-0-0-1'">
          <div>multiple line title</div>
          <div>multiple line title</div>
        </template>
        <template v-else>{{ dataRef.title }}</template>
      </template>
      <template #icon="{ key, selected }">
        <smile-outlined /> 🤭{{ key }} {{ selected }}
      </template>
      <!-- <template #switcherIcon="{ dataRef, defaultIcon, data, expanded }">
        
        <file-svg :treeNode="data" :data="data"  :expanded="expanded" />
        <span v-if="dataRef.key === '0-0-2'"> 🤭 </span>

        <component :is="defaultIcon" v-else />
      </template> -->
    </a-tree>
  </div>
</template>
<script setup>
import fileSvg from './fileSvg.vue'
import { ref } from 'vue'
const showLine = ref(true)
const showIcon = ref(false)
const treeData = ref([
  {
    title: 'parent 1',
    key: '0-0',
    fileType: 'FOLD',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        fileType: 'FOLD',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            name: '111.txt',
            fileType: 'FILE',
          },
          {
            key: '0-0-0-1',
            name: '111.mo',
            fileType: 'FILE',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
            name: '111.xls',
            fileType: 'FILE',
          },
        ],
      },

      {
        title: 'parent 1-2',
        key: '0-0-2',
        fileType: 'FOLD',
        name: '00',
        children: [
          {
            title: 'leaf 1',
            key: '0-0-2-0',
            name: '111.xls',
            fileType: 'FILE',
          },
          {
            title: 'leaf 2',
            key: '0-0-2-1',
            name: '111.xls',
            fileType: 'FILE',
          },
        ],
      },
    ],
  },
])
const onSelect = (selectedKeys, info) => {
  console.log('selected', selectedKeys, info)
}
</script>
