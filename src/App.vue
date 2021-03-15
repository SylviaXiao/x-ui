<template>
  <div id="app">
    <div>
      <x-button type="default">确认按钮</x-button>
      <x-button type="primary">普通按钮</x-button>
      <x-button type="success">圆角按钮</x-button>
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
  </div>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style>
</style>
