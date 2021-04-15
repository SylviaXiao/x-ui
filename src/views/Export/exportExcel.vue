<template>
  <div class="exportExcel">
    <exportExcel
      :confirmName="confirmName"
      :list="teacherList"
      :filename="filename"
      :tHeader="tHeader"
      :filterVal="filterVal"
      :exportName="exportName"
    ></exportExcel>
  </div>
</template>
<script>
import exportExcel from '@/components/ExportExcel'
export default {
  name: 'teachingLogs',
  data () {
    return {
      // 接口导出
      confirmName: '导出',
      teacherList: [
        { 姓名: '111', 性别: '111', 年龄: '111', '222': '222' },
        { 姓名: '111', 性别: '111', 年龄: '111' },
        { 姓名: '111', 性别: '111', 年龄: '111' },
        { 姓名: '111', 性别: '111', 年龄: '111' },
        { 姓名: '111', 性别: '111', 年龄: '111' }
      ],
      filename: 'excel',
      tHeader: ['姓名', '性别', '年龄', '222'],
      filterVal: ['姓名', '性别', '年龄', '222'],
      exportName: {
        name: '导出表格'
      }
    }
  },
  created () {},
  mounted () {},
  watch: {},
  components: {
    exportExcel
  },
  computed: {},
  methods: {}
}
</script>
<style lang="scss" scoped></style>
