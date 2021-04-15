<template>
  <div id="Takephoto">
    <Xtakephoto ref="Photograph" @set-img="getImg">拍照</Xtakephoto>
    <img v-if="photoBase64" :src="photoBase64" class="avatar" />
  </div>
</template>
<script>
import Xtakephoto from '@/components/TakePhoto/index.vue'
export default {
  name: 'Takephoto',
  components: {
    Xtakephoto
  },
  data () {
    return {
      photoBase64: ''
    }
  },
  methods: {
    // 裁剪的图片base64
    getImg (base64) {
      this.photoBase64 = base64
    }
  }
}
</script>
<style>
#Takephoto {
}
</style>
