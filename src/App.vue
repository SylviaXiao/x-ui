<template>
  <div id="app">
    <div>按钮类型</div>
    <div>
      <x-button type="default">默认按钮</x-button>
      <x-button type="primary">主要按钮</x-button>
      <x-button type="success">成功按钮</x-button>
      <x-button type="info">信息按钮</x-button>
      <x-button type="warning">警告按钮</x-button>
      <x-button type="danger">危险按钮</x-button>
    </div>
    <div>自定义按钮颜色</div>
    <div>
      <x-button color="#7232dd">单色按钮</x-button>
      <x-button color="#7232dd" plain>单色按钮</x-button>
      <x-button color="linear-gradient(to right, #4bb0ff, #6149f6)">
        渐变色按钮
      </x-button>
    </div>
    <div>
      <x-button type="default">默认按钮</x-button>
      <x-button type="primary">主要按钮</x-button>
      <x-button type="success">成功按钮</x-button>
      <x-button type="info">信息按钮</x-button>
      <x-button type="warning">警告按钮</x-button>
      <x-button type="danger">危险按钮</x-button>
    </div>
    <div>禁用按钮</div>
    <div>
      <x-button disabled type="default">默认按钮</x-button>
      <x-button disabled type="primary">主要按钮</x-button>
      <x-button disabled type="success">成功按钮</x-button>
      <x-button disabled type="info">信息按钮</x-button>
      <x-button disabled type="warning">警告按钮</x-button>
      <x-button disabled type="danger">危险按钮</x-button>
    </div>
    <div>
      <x-button @click="buttonClick" type="default">确认按钮</x-button>
      <x-button type="primary" disabled>普通按钮</x-button>
      <x-button type="success" icon="x-icon-refresh">圆角按钮</x-button>
    </div>
    <div>
      <x-button type="default" plain>确认按钮</x-button>
      <x-button type="primary" plain>普通按钮</x-button>
      <x-button type="success" plain>圆角按钮</x-button>
    </div>
    <div>
      <x-button type="default" round>确认按钮</x-button>
      <x-button type="primary" round>普通按钮</x-button>
      <x-button type="success" round>圆角按钮</x-button>
    </div>
    <div>
      <x-button type="default" icon="x-icon-close-1"></x-button>
      <x-button type="primary" icon="x-icon-right"></x-button>
      <x-button type="success" icon="x-icon-refresh"></x-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  methods: {
    buttonClick (e) {
      console.log(e)
    }
  }
}
</script>
<style>
#App {
  text-align: right;
}
</style>
