<template>
  <div id="docxExport">
    <div @click="exportTable">
      点击下载报表
    </div>
  </div>
</template>
<script>
import { exportDocx } from '@/utils/docx'
export default {
  name: 'docxExport',
  data () {
    return {}
  },
  methods: {
    exportTable (e) {
      const data = {
        custName: '客户1',
        phoneNumber: '11111111111',
        projectRequirement: '要求',
        remark: '备注',
        totalPrice: '10000',
        checkReason: '原因',
        table: [
          {
            number: 1, // 序号
            name: '设备1', // 设备名称
            num: 1, // 数量
            salePrice: 10, // 销售单价
            saleTotal: 10, // 销售合计
            remark: '啦啦啦' // 备注
          },
          {
            number: 2, // 序号
            name: '设备2', // 设备名称
            num: 2, // 数量
            salePrice: 20, // 销售单价
            saleTotal: 40, // 销售合计
            remark: '啦啦啦' // 备注
          },
          {
            number: 3, // 序号
            name: '设备3', // 设备名称
            num: 3, // 数量
            salePrice: 30, // 销售单价
            saleTotal: 90, // 销售合计
            remark: '啦啦啦' // 备注
          }
        ]
      }
      exportDocx('/static/input.docx', data, `报价.docx`)
    }
  }
}
</script>
<style>
#docxExport {
  text-align: right;
}
</style>
