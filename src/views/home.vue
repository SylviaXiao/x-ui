<template>
  <div id="Home">
    <div @click="toButtonURL">按钮</div>
    <div @click="toExportURL">导出Word</div>
    <div @click="toTakePhotoURL">拍照</div>
    <div @click="toExportExcelURL">导出Excel</div>
    <div @click="toMap">高德地图</div>
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
    },
    toMap () {
      this.$router.push(`/map`)
    }
  }
}
</script>
<style>
#Home {
}
</style>
