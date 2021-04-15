<template>
  <div id="Home">
    <div @click="toButtonURL">按钮</div>
    <div @click="toExportURL">导出</div>
    <div @click="toTakePhotoURL">拍照</div>
    <div @click="toExportExcelURL">导出</div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {}
  },
  methods: {
    toButtonURL () {
      this.$router.push(`/Button`)
    },
    toExportURL () {
      this.$router.push(`/DocxExportImg`)
    },
    toTakePhotoURL () {
      this.$router.push(`/TakePhoto`)
    },
    toExportExcelURL () {
      this.$router.push(`/ExcelExport`)
    }
  }
}
</script>
<style>
#Home {
}
</style>
