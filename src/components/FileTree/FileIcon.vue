<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup>
import { computed } from 'vue'

// 定义 Props
const props = defineProps({
  treeNode: {
    type: Object,
    default: () => ({}),
  },
  data: {
    type: Object,
    required: true,
  },
  expanded: {
    type: Boolean,
    default: false,
  },
})

// 文件类型与图标的映射
const fileTypeIcons = {
  txt: '#icon-wenjianleixing-biaozhuntu-jishiben',
  mo: '#icon-mo',
  order: '#icon-mo',
  ppt: '#icon-wenjianleixing-biaozhuntu-huandengpian',
  pptx: '#icon-wenjianleixing-biaozhuntu-huandengpian',
  doc: '#icon-wenjianleixing-biaozhuntu-Wordwendang',
  docx: '#icon-wenjianleixing-biaozhuntu-Wordwendang',
  pdf: '#icon-wenjianleixing-biaozhuntu-PDFwendang',
  xls: '#icon-wenjianleixing-biaozhuntu-gongzuobiao',
  xlsx: '#icon-wenjianleixing-biaozhuntu-gongzuobiao',
  zip: '#icon-wenjianleixing-biaozhuntu-yasuowenjian',
  rar: '#icon-wenjianleixing-biaozhuntu-yasuowenjian',
  gz: '#icon-wenjianleixing-biaozhuntu-yasuowenjian',
  jpg: '#icon-wenjianleixing-biaozhuntu-tupianwenjian',
  png: '#icon-wenjianleixing-biaozhuntu-tupianwenjian',
  svg: '#icon-wenjianleixing-biaozhuntu-tupianwenjian',
  jpeg: '#icon-wenjianleixing-biaozhuntu-tupianwenjian',
  gif: '#icon-wenjianleixing-biaozhuntu-tupianwenjian',
  mp4: '#icon-wenjianleixing-biaozhuntu-shipinwenjian',
  mkv: '#icon-wenjianleixing-biaozhuntu-shipinwenjian',
  md: '#icon-wenjianleixing-biaozhuntu-jishiben',
  json: '#icon-wenjianleixing-biaozhuntu-jishiben',
}

// 获取文件类型
const getFileType = (name) => {
  const nameArr = name.split('.')
  if (nameArr.length < 2) return 'unknown'
  return nameArr[nameArr.length - 1].toLowerCase()
}

// 计算图标名称
const iconName = computed(() => {
  const { type:fileType = '', name = '' } = props.data
  if (fileType === 'tree') {
    return props.expanded
      ? '#icon-wenjianleixing-biaozhuntu-wenjianjia'
      : '#icon-wenjianleixing-suolvetu-wenjianjia'
  }
  const suffix = getFileType(name)
  return fileTypeIcons[suffix] || '#icon-file'
})
</script>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  display: inline-block;
}
</style>
