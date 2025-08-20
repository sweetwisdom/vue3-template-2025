<template>
  <div>
    <a-tree-select
      v-model:value="value"
      show-search
      style="width: 100%"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      placeholder="Please select"
      :field-names="{
        children: 'children',
        label: 'appName',
        value: 'id',
      }"
      :tree-data="treeData"
      tree-node-filter-prop="label"
    >
    </a-tree-select>
  </div>
</template>

<script setup>
defineOptions({
  name: 'select',
})
import { ref } from 'vue'
const value = ref('')
const props = defineProps()
const emit = defineEmits()
const treeData = [
  {
    id: '1952931553259999234',
    appCode: 'abc202508061048',
    appName: 'BBBBBB应用',
    appType: 'SOFTWARE',
    parentId: '0',
    ownerId: '123456789',
    ownerName: '老八',
    projectId: '111222',
    itemId: '202508061113',
    appDesc: '应用简介',
    appIntroduction: '应用介绍',
    appPurpose: '应用用途',
    createBy: '666',
    createTime: '2025-08-06T11:15:41',
    updater: null,
    updateTime: null,
    role: null,
    children: [
      {
        id: '1952934473607139329',
        appCode: 'abc202508061048001',
        appName: 'BBBBBB应用子应用1',
        appType: 'SOFTWARE',
        parentId: '1952931553259999234',
        ownerId: '123456789',
        ownerName: '老八',
        projectId: '111222',
        itemId: '202508061113',
        appDesc: null,
        appIntroduction: null,
        appPurpose: null,
        createBy: '666',
        createTime: '2025-08-06T03:27:16',
        updater: '666',
        updateTime: '2025-08-06T15:35:30',
        role: null,
        children: [],
        appVersion: null,
        appBranch: null,
      },
      {
        id: '1952970417001340929',
        appCode: 'abc202508061048003',
        appName: 'BBBBBB应用子应用3',
        appType: 'SOFTWARE',
        parentId: '1952931553259999234',
        ownerId: null,
        ownerName: null,
        projectId: '111222',
        itemId: '202508061113',
        appDesc: null,
        appIntroduction: null,
        appPurpose: null,
        createBy: '666',
        createTime: '2025-08-06T05:50:06',
        updater: null,
        updateTime: null,
        role: null,
        children: [],
        appVersion: null,
        appBranch: null,
      },
      {
        id: '1952934473607139330',
        appCode: 'abc202508061048002',
        appName: 'BBBBBB应用子应用2',
        appType: 'SOFTWARE',
        parentId: '1952931553259999234',
        ownerId: '',
        ownerName: '',
        projectId: '111222',
        itemId: '202508061113',
        appDesc: null,
        appIntroduction: null,
        appPurpose: null,
        createBy: '666',
        createTime: '2025-08-06T03:27:16',
        updater: '666',
        updateTime: '2025-08-06T14:43:30',
        role: null,
        children: [],
        appVersion: null,
        appBranch: null,
      },
    ],
    appVersion: null,
    appBranch: null,
  },
]
</script>


