<template>
  <div id="photoGraph">
    <!-- 拍照对话框 -->
    <div v-show="active == 0" class="video-box">
      <video ref="video" muted autoplay />
    </div>
    <div v-show="active == 1" class="cut-box">
      <div class="cropper">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :output-size="option.size"
          :output-type="option.outputType"
          :info="option.info"
          :can-scale="option.canScale"
          :fixed="option.fixed"
          :auto-crop="option.autoCrop"
          :auto-crop-height="option.autoCropHeight"
          :auto-crop-width="option.autoCropWidth"
          :center-box="option.centerBox"
          :high="option.high"
          :info-true="option.infoTrue"
          :max-img-size="option.maxImageSize"
          :enlarge="option.enlarge"
          :mode="option.mode"
          :fixed-number="option.fixedNumber"
        />
      </div>
      <div style="display: none">
        <canvas ref="canvas" width="360" height="320">您的浏览器不支持</canvas>
        <a ref="downloadImg" href="" />
      </div>
    </div>
    <div class="btn-box">
      <button
        v-if="selectVideoList.length > 1"
        type="primary"
        @click="nextVideo"
      >
        切换摄像头
      </button>
      <button v-show="active == 0" type="primary" @click="setImage()">
        拍照
      </button>
      <button v-show="active == 1" type="primary" @click="screenshot()">
        截图
      </button>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  components: {
    VueCropper
  },
  props: {},
  data () {
    return {
      selectId: '',
      selectVideo: false,
      selectVideoList: [],
      option: {
        img: '', // 裁剪图片的地址
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        full: true, // 是否输出原图比例的截图
        info: true, // 图片大小信息
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: '190px', // 默认生成截图框宽度
        autoCropHeight: '240px', // 默认生成截图框高度
        canMove: false, // 上传图片是否可以移动
        fixedBox: false, // 固定截图框大小 不允许改变
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        enlarge: 1, // 图片根据截图框输出比例倍数
        mode: 'contain' // 图片默认渲染方式
      },
      imgBase64: '',
      active: 0,
      cameraStop: ''
    }
  },
  created () {
    this.dialogVisibleShow()
  },
  methods: {
    nextVideo () {
      let selectId = this.selectId
      if (this.selectId) {
        this.selectVideoList.forEach((item, index) => {
          if (item.deviceId === this.selectId) {
            if (index + 1 === this.selectVideoList.length) {
              selectId = this.selectVideoList[0].deviceId
            } else {
              selectId = this.selectVideoList[index + 1].deviceId
            }
          }
        })
      }
      this.selectId = selectId
      this.initVideo(this.selectId)
    },
    handleClose () {
      if (this.cameraStop.length >= 1) {
        this.cameraStop.forEach((element, index) => {
          this.cameraStop[index].stop()
        })
      }
    },
    dialogVisibleShow () {
      this.active = 0
      this.option.img = ''
      this.$nextTick(() => {
        this.getAudio()
      })
    },
    getAudio () {
      const that = this
      if (
        navigator.mediaDevices.getUserMedia ||
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia
      ) {
        if (
          !navigator.mediaDevices ||
          !navigator.mediaDevices.enumerateDevices
        ) {
          // 使用默认
          that.initVideo()
          return
        }
        // 列出相机和麦克风。
        navigator.mediaDevices
          .enumerateDevices()
          .then(function (devices) {
            const sourceIdList = []
            devices.forEach(function (device, index) {
              if (device.kind === 'videoinput') {
                sourceIdList.push(device)
              }
            })
            that.selectVideoList = sourceIdList
            console.log(that.selectVideoList)
            if (sourceIdList.length > 1) {
              // that.selectVideo = true;
              // that.initVideo();
              that.selectId = that.selectVideoList[0].deviceId
              that.initVideo(that.selectId)
            } else {
              that.initVideo()
            }
          })
          .catch(function (err) {
            console.log(err)
            this.initVideo()
            // console.log(err.name + ": " + err.message);
          })
      } else {
        return this.$confirm(`你的浏览器不支持访问用户媒体设备!`, '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: false
        })
          .then(() => {
            this.handleClose()
          })
          .catch(() => {})
      }
    },
    handleCloseselece () {
      this.selectVideo = false
      this.initVideo(this.selectId)
    },
    // 调用摄像头
    initVideo (id) {
      if (id) {
        const constraints = {
          video: {
            width: 360,
            height: 320,
            deviceId: id
          }
        }
        this.getUserMedia(constraints) // 调用用户媒体设备，访问摄像头、录音、
      } else {
        const constraints = {
          video: {
            width: 360,
            height: 320
          }
        }
        this.getUserMedia(constraints) // 调用用户媒体设备，访问摄像头、录音、
      }
    },
    getUserMedia (constrains) {
      const that = this
      if (navigator.mediaDevices.getUserMedia) {
        // 最新标准API、
        navigator.mediaDevices
          .getUserMedia(constrains)
          .then(stream => {
            that.success(stream)
          })
          .catch(err => {
            that.error(err)
          })
      } else if (navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
        // webkit内核浏览器
        if (navigator.mediaDevices === undefined) {
          navigator.mediaDevices = {}
        }
        // 一些浏览器部分支持 mediaDevices。我们不能直接给对象设置 getUserMedia
        // 因为这样可能会覆盖已有的属性。这里我们只会在没有getUserMedia属性的时候添加它。
        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function (constraints) {
            // 首先，如果有getUserMedia的话，就获得它
            var getUserMedia =
              navigator.webkitGetUserMedia || navigator.mozGetUserMedia

            // 一些浏览器根本没实现它 - 那么就返回一个error到promise的reject来保持一个统一的接口
            if (!getUserMedia) {
              return Promise.reject(
                new Error('getUserMedia is not implemented in this browser')
              )
            }

            // 否则，为老的navigator.getUserMedia方法包裹一个Promise
            return new Promise(function (resolve, reject) {
              getUserMedia.call(navigator, constraints, resolve, reject)
            })
          }
        }
        navigator.mediaDevices
          .getUserMedia(constrains)
          .then(stream => {
            that.success(stream)
          })
          .catch(err => {
            that.error(err)
          })
      } else if (navigator.getUserMedia) {
        // 旧版API
        navigator
          .getUserMedia(constrains)
          .then(stream => {
            that.success(stream)
          })
          .catch(err => {
            that.error(err)
          })
      }
    },
    // 成功的回调函数
    success (stream) {
      const video = this.$refs.video
      video.srcObject = stream
      this.cameraStop = stream.getTracks()
      video.onloadedmetadata = function (e) {
        video.play() // 等摄像头数据加载完成后，开始播放
      }
    },
    // 异常的回调函数
    error (error) {
      this.$confirm(
        `访问用户媒体设备失败：${(error.name, error.message)}!`,
        '提示',
        {
          confirmButtonText: '确定',
          showCancelButton: false,
          closeOnClickModal: false
        }
      )
        .then(() => {
          this.handleClose()
        })
        .catch(() => {})
    },
    // 调用权限（打开摄像头功能）
    getCompetence () {
      const video = this.$refs.video
      const constraints = {
        video: { width: 360, height: 320 }
      }
      const promise = navigator.mediaDevices.getUserMedia(constraints)
      promise
        .then(MediaStream => {
          video.srcObject = MediaStream
          this.cameraStop = MediaStream.getTracks()
          video.onloadedmetadata = function (e) {
            video.play() // 等摄像头数据加载完成后，开始播放
          }
        })
        .catch(PermissionDeniedError => {
          if (
            PermissionDeniedError.toString() ===
            'NotFoundError: Requested device not found'
          ) {
            return this.$confirm(`您的浏览器不支持!`, '提示', {
              confirmButtonText: '确定',
              showCancelButton: false,
              closeOnClickModal: false
            })
              .then(() => {
                this.handleClose()
              })
              .catch(() => {})
          } else {
            return this.$confirm(
              `开启摄像头失败，请检查电脑相机和摄像头以及浏览器权限是否开启!`,
              '提示',
              {
                confirmButtonText: '确定',
                showCancelButton: false,
                closeOnClickModal: false
              }
            )
              .then(() => {
                this.handleClose()
              })
              .catch(() => {})
          }
        })
    },
    //  绘制图片（拍照功能）
    setImage () {
      setTimeout(() => {
        // 获得Canvas对象
        const video = this.$refs.video
        const canvas = this.$refs.canvas
        const ctx = canvas.getContext('2d')
        ctx.drawImage(video, 0, 0, 360, 320)
        this.option.img = canvas.toDataURL('image/jpeg')
        if (this.active++ > 1) this.active = 0
        console.log(this.active)
      }, 500)
    },
    // 截图
    screenshot () {
      this.$refs.cropper.getCropData(data => {
        if (data) {
          this.imgBase64 = data
          this.$emit('set-img', data)
          if (this.active++ > 1) this.active = 0
          this.handleClose()
        }
      })
    },
    // 保存到本地
    SaveLocally () {
      const a = this.$refs.downloadImg
      a.href = this.imgBase64
      a.download = 'photo.jpeg'
      a.click()
    }
  }
}
</script>
<style lang="scss">
#photoGraph {
  .el-radio {
    color: #606266;
    cursor: pointer;
    margin-right: 30px;
    margin: 10px;
  }
}
</style>
<style lang="scss" scoped>
#photoGraph {
  .video-box {
    video {
      margin: 0 auto;
    }
  }
  video,
  .cut-box {
    width: 360px;
    height: 320px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    display: block;
    margin: 0 auto;
    .cropper {
      height: 100%;
    }
    .model {
      position: fixed;
      z-index: 10;
      width: 100vw;
      height: 100vh;
      overflow: auto;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.8);
      .model-show {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        img {
          display: block;
          margin: auto;
          max-width: 80%;
          user-select: none;
          background-position: 0px 0px, 10px 10px;
          background-size: 20px 20px;
          background-image: linear-gradient(
              45deg,
              #eee 25%,
              transparent 25%,
              transparent 75%,
              #eee 75%,
              #eee 100%
            ),
            linear-gradient(
              45deg,
              #eee 25%,
              white 25%,
              white 75%,
              #eee 75%,
              #eee 100%
            );
        }
      }
    }
  }
  .btn-box {
    margin-top: 10px;
    text-align: center;
  }
  .camera_outer {
    .take-box {
      // display: flex;
      // justify-content: space-between;
      width: 740px;
      margin: 0 auto;
      video,
      .cut-box {
        width: 360px;
        height: 320px;
        border: 1px solid #ccc;
        box-sizing: border-box;
        display: inline-block;
        margin: 0 5px;
        .cropper {
          height: 100%;
        }
        .model {
          position: fixed;
          z-index: 10;
          width: 100vw;
          height: 100vh;
          overflow: auto;
          top: 0;
          left: 0;
          background: rgba(0, 0, 0, 0.8);
          .model-show {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100vw;
            height: 100vh;
            img {
              display: block;
              margin: auto;
              max-width: 80%;
              user-select: none;
              background-position: 0px 0px, 10px 10px;
              background-size: 20px 20px;
              background-image: linear-gradient(
                  45deg,
                  #eee 25%,
                  transparent 25%,
                  transparent 75%,
                  #eee 75%,
                  #eee 100%
                ),
                linear-gradient(
                  45deg,
                  #eee 25%,
                  white 25%,
                  white 75%,
                  #eee 75%,
                  #eee 100%
                );
            }
          }
        }
      }
    }
    .btn-box {
      margin: 10px 0 0 5px !important;
      margin: 0 auto;
    }
  }
}
</style>
