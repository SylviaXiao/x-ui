<template>
  <div id="docxExport">
    <div @click="exportDocx">
      点击下载图片
    </div>
    <div style="width:375px;height:570px">
      <canvas id="roadModel5" width="375" height="570"></canvas>
    </div>
  </div>
</template>
<script>
import Docxtemplater from 'docxtemplater'
import ImageModule from 'docxtemplater-image-module-free'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
import img from '@/assets/img/export.jpg'
export default {
  name: 'exportDocTemplate',
  data () {
    return {
      interModelCanvasId: 'roadModel5', // 路口模型对应的id
      acsInfo: {
        name: '导出图片',
        interImg: null
      },
      table: [
        {
          type: 'type1',
          light1: 'light1',
          light2: 'light1',
          light3: 'light1',
          light4: 'light1',
          light5: 'light1'
        },
        {
          type: '南向北',
          light1: '左转箭头2',
          light2: '圆盘2',
          light3: '右转箭头2',
          light4: '非机动车灯2',
          light5: '人行灯2'
        },
        {
          type: '西向东',
          light1: '左转箭头3',
          light2: '圆盘3',
          light3: '右转箭头3',
          light4: '非机动车灯3',
          light5: '人行灯3'
        },
        {
          type: '北向南',
          light1: '左转箭头4',
          light2: '圆盘4',
          light3: '右转箭头4',
          light4: '非机动车灯4',
          light5: '人行灯4'
        }
      ]
    }
  },
  created () {
    this.created_page()
  },
  methods: {
    // 画布上面画图
    created_page () {
      this.show = true

      this.$nextTick(() => {
        var canvas = document.getElementById('roadModel5')

        var context = canvas.getContext('2d')

        var imgbg = new Image()

        imgbg.src = img

        var imgcode = new Image()

        imgcode.src = img

        imgbg.onload = function () {
          // console.log(imgbg.complete)
          if (imgbg.complete) {
            context.drawImage(imgbg, 0, 0, 375, 570)

            context.fillText('Hello World', 10, 50)

            imgcode.onload = function () {
              if (imgbg.complete) {
                context.drawImage(imgcode, 100, 200, 50, 50)
              }
            }
          }
        }
      })
    },
    // 获取文件路径
    getStaticPath (appendPath) {
      // 模板文件放在静态目录下，需要从静态目录下获取路径
      const origin = location.origin
      const pathNameArr = location.pathname.split('\/')
      const linkPath = pathNameArr.slice(0, pathNameArr.length - 2).join('\/')
      const configFile = `${origin}${linkPath}${appendPath}`
      return configFile
    },
    // 导出图片表格
    exportDocx () {
      // 这个是导出的方法
      let docxUrl = this.getStaticPath('/static/img.docx')
      JSZipUtils.getBinaryContent(docxUrl, (err, content) => {
        if (err) {
          throw err
        }
        let interModelCanvas = document.getElementById(this.interModelCanvasId)
        if (interModelCanvas) {
          // 路口模型图片
          this.acsInfo.interImg = interModelCanvas.toDataURL()
        }
        interModelCanvas = undefined
        let opts = {
          centered: false,
          getImage (tagValue, tagName) {
            return new Promise((resolve, reject) => {
              JSZipUtils.getBinaryContent(tagValue, (error, content) => {
                if (error) {
                  return reject(error)
                }
                return resolve(content)
              })
            })
          },
          getSize (img, tagValue, tagName) {
            return [375, 570]
          }
        }
        const imageModule = new ImageModule(opts)
        const zip = new PizZip(content)
        const doc = new Docxtemplater()
          .loadZip(zip)
          .attachModule(imageModule)
          .compile()
        doc
          .resolveData({
            // 如果包含异步数据，用resolveData，在回调之后再处理，如果都是同步数据，直接用setData就可以
            name: this.acsInfo.name,
            exportImg: this.acsInfo.interImg,
            table: this.table
          })
          .then(() => {
            try {
              doc.render()
            } catch (err) {
              throw err
            }
            const out = doc.getZip().generate({
              type: 'blob',
              mimeType:
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
            })
            saveAs(out, this.acsInfo.name + '导出图片模板' + '.doc') // 注意这里加下后缀，因为有些地方导出文件类型的文件，不能识别类型
          })
      })
    }
  }
}
</script>
<style>
#docxExport {
}
</style>
