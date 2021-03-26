<template>
  <div id="Home">
    <div @click="toDataURL">按钮</div>
    <div>导出</div>
  </div>
</template>
<script>
export default {
  name: 'Home',
  data () {
    return {}
  },
  methods: {
    toDataURL () {
      this.$router.push(`/DocxExportImg`)
    }
  }
}
</script>
<style>
#Home {
  text-align: right;
}
</style>
