<template>
  <div id="app">
    <div>
      <x-button @click="buttonClick" type="default" >确认按钮</x-button>
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
