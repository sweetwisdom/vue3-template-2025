<template>
  <svg class="icon">
    <use :xlink:href="getFileIcon()"></use>
  </svg>
</template>

<script setup>
const props = defineProps({
  fileType: {
    type: String,
    default: 'FILE',
  },
  opend: {
    type: Boolean,
    default: false,
  },
})
function getFileIcon() {
  const icons = {
    doc: '#icon-wenjianleixing-biaozhuntu-wenjianjia',
    pdf: '#icon-wenjianleixing-biaozhuntu-PDFwendang',
    xls: '#icon-wenjianleixing-biaozhuntu-gongzuobiao',
    zip: '#icon-wenjianleixing-biaozhuntu-yasuowenjian',
    jpg: '#icon-wenjianleixing-biaozhuntu-tupianwenjian',
    mp4: '#icon-wenjianleixing-biaozhuntu-shipinwenjian',
    mo: '#icon-mo',
  }
  if (props.fileType === 'FOLD') {
    return !props.opend
      ? '#icon-wenjianleixing-suolvetu-wenjianjia'
      : '#icon-wenjianleixing-biaozhuntu-wenjianjia'
  } else {
    return icons[props.fileType] || '#icon-wenjianleixing-biaozhuntu-weizhiwenjian'
  }
}
</script>

<style>
.icon {
  width: 22px;
  height: 22px;

  fill: currentColor;
  overflow: hidden;
  display: inline-block;
  margin-right: 10px;
}
</style>
