<template>
  <div class="exportExcel">
    <button
      type="primary"
      :icon="exportName.icon ? '' : 'el-icon-document'"
      @click="handleDownload"
    >
      {{ exportName.name }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    // 文件数据
    list: Array,
    // 导出文件名字
    filename: String,
    // 表格标题
    tHeader: Array,
    // 表格内容
    filterVal: Array,
    confirmName: String,
    exportName: Object
  },
  data () {
    return {
      autoWidth: true,
      bookType: 'xlsx'
    }
  },
  methods: {
    handleDownload () {
      import('@/utils/Export2Excel').then(excel => {
        const tHeader = this.tHeader
        const filterVal = this.filterVal
        const list = this.list
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j]
        })
      )
    }
  }
}
</script>

<style scoped>
.exportExcel {
  display: inline-block;
}
</style>
