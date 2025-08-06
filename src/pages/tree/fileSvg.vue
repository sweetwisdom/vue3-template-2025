<template>
  <svg class="icon" aria-hidden="true" v-if="data.fileType === 'FOLD' && expanded">
    <use xlink:href="#icon-wenjianleixing-biaozhuntu-wenjianjia"></use>
  </svg>
  <svg class="icon" aria-hidden="true" v-else-if="data.fileType === 'FOLD' && !expanded">
    <use xlink:href="#icon-wenjianleixing-suolvetu-wenjianjia"></use>
  </svg>
  <svg
    v-else-if="data.fileType === 'FILE' && getFileType() === 'txt'"
    class="icon"
    aria-hidden="true"
  >
    <use xlink:href="#icon-wenjianleixing-biaozhuntu-jishiben"></use>
  </svg>
  <svg
    v-else-if="data.fileType === 'FILE' && getFileType() === 'ppt'"
    class="icon"
    aria-hidden="true"
  >
    <use xlink:href="#icon-wenjianleixing-biaozhuntu-huandengpian"></use>
  </svg>
  <svg
    v-else-if="data.fileType === 'FILE' && getFileType() === 'doc'"
    class="icon"
    aria-hidden="true"
  >
    <use xlink:href="#icon-wenjianleixing-biaozhuntu-Wordwendang"></use>
  </svg>
  <svg
    v-else-if="data.fileType === 'FILE' && getFileType() === 'pdf'"
    class="icon"
    aria-hidden="true"
  >
    <use xlink:href="#icon-wenjianleixing-biaozhuntu-PDFwendang"></use>
  </svg>
  <svg
    v-else-if="data.fileType === 'FILE' && getFileType() === 'xls'"
    class="icon"
    aria-hidden="true"
  >
    <use xlink:href="#icon-wenjianleixing-biaozhuntu-gongzuobiao"></use>
  </svg>
  <svg
    v-else-if="data.fileType === 'FILE' && getFileType() === 'zip'"
    class="icon"
    aria-hidden="true"
  >
    <use xlink:href="#icon-wenjianleixing-biaozhuntu-yasuowenjian"></use>
  </svg>
  <svg
    v-else-if="data.fileType === 'FILE' && getFileType() === 'jpg'"
    class="icon"
    aria-hidden="true"
  >
    <use xlink:href="#icon-wenjianleixing-biaozhuntu-tupianwenjian"></use>
  </svg>
  <svg
    v-else-if="data.fileType === 'FILE' && getFileType() === 'mp4'"
    class="icon"
    aria-hidden="true"
  >
    <use xlink:href="#icon-wenjianleixing-biaozhuntu-shipinwenjian"></use>
  </svg>
  <svg
    v-else-if="data.fileType === 'FILE' && getFileType() === 'mo'"
    class="icon"
    aria-hidden="true"
  >
    <use xlink:href="#icon-mo"></use>
  </svg>
  <svg class="icon" aria-hidden="true" v-else>
    <use xlink:href="#icon-wenjianleixing-biaozhuntu-weizhiwenjian"></use>
  </svg>
</template>

<script>
export default {
  props: {
    treeNode: {
      type: Object,
    },
    data: {
      type: Object,
    },
    expanded: {},
  },
  methods: {
    getFileType() {
      let nameArr = this.data.name.split('.')
      if (nameArr.length < 2) {
        return 'unknown'
      }
      const suffix = nameArr[nameArr.length - 1].toLowerCase()
      switch (suffix) {
        case 'txt':
          return 'txt'
        case 'mo':
        case 'order':
          return 'mo'
        case 'ppt':
        case 'pptx':
          return 'ppt'
        case 'doc':
        case 'docx':
          return 'doc'
        case 'pdf':
          return 'pdf'
        case 'xls':
        case 'xlsx':
          return 'xls'
        case 'zip':
        case 'rar':
        case 'gz':
          return 'zip'
        case 'jpg':
        case 'png':
        case 'svg':
        case 'jpeg':
        case 'gif':
          return 'jpg'
        case 'mp4':
        case 'mkv':
          return 'mp4'
      }
    },
  },
}
</script>

<style>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  display: inline-block;
}
</style>
