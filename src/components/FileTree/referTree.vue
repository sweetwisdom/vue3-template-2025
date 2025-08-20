<template>
  <a-tree
    v-model:expandedKeys="expandedKeys"
    v-model:selectedKeys="selectedKeys"
    :load-data="onLoadData"
    :tree-data="treeData"
  />
</template>
<script setup>
import { ref } from 'vue';
const expandedKeys = ref([]);
const selectedKeys = ref([]);
const treeData = ref([
  {
    title: 'Expand to load',
    key: '0',
  },
  {
    title: 'Expand to load',
    key: '1',
  },
  {
    title: 'Tree Node',
    key: '2',
    isLeaf: true,
  },
]);
const onLoadData = treeNode => {
  return new Promise(resolve => {
    if (treeNode.dataRef.children) {
      resolve();
      return;
    }
    setTimeout(() => {
      treeNode.dataRef.children = [
        {
          title: 'Child Node',
          key: `${treeNode.eventKey}-0`,
        },
        {
          title: 'Child Node',
          key: `${treeNode.eventKey}-1`,
        },
      ];
      treeData.value = [...treeData.value];
      resolve();
    }, 1000);
  });
};
</script>