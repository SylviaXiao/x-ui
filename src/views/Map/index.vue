<template>
  <div class="con-box">
    <div id="container" class="mymap"></div>
  </div>
</template>
<script>
import AMap from 'AMap' // 在页面中引入高德地图

export default {
  data () {
    return {
      positions: [
        [116.405467, 39.907761],
        [116.415467, 39.907761],
        [116.415467, 39.917761],
        [116.425467, 39.907761],
        [116.385467, 39.907761]
      ]
    }
  },
  computed: {},
  mounted () {
    this.loadmap() // 加载地图和相关组件
  },
  methods: {
    loadmap () {
      this.positions = [
        [116.405467, 39.907761],
        [116.415467, 39.907761],
        [116.415467, 39.917761],
        [116.425467, 39.907761],
        [116.685467, 39.907761]
      ]
      var map = new AMap.Map('container', {
        resizeEnable: true,
        center: [116.397428, 39.90923],
        zoom: 13,
        features: ['road']
      })
      AMap.plugin(['AMap.ToolBar'], function () {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        map.addControl(
          new AMap.ToolBar({
            // 简易缩放模式，默认为 false
            liteStyle: true
          })
        )
      })
      map.setFitView() // 自适应所有坐标都能显示出来
    }
  }
}
</script>
<style lang="scss" scoped>
.con-box {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  .mymap {
    width: 100%;
    height: 840px;
  }
}
// /deep/ .amap-marker-label {
//   border: 0;
//   background-color: transparent;
// }
</style>
