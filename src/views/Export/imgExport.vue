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
export default {
  name: 'exportDocTemplate',
  data () {
    return {
      interModelCanvasId: 'roadModel5', // 路口模型对应的id
      interModelCanvasId2: 'roadModel5', // 路口模型对应的id
      interModelCanvasId3: 'roadModel5', // 路口模型对应的id
      acsInfo: {
        areaCode: '420607',
        certificateType: 'bzp',
        examCount: 1,
        examGrades: 0,
        examStatus: -1,
        examinationDay: '2021-03-25',
        examinationDuration: 1,
        examinationId: '2113534cd56941179fce10103a507d67',
        examinationName: '襄阳金龙考场',
        finishTime: '2021-03-25 20:47:32',
        id: 'e6b50cc1458645b68c7a7aa5afc7ed89',
        idcard: '42022219981104791X',
        loginPhotoPath:
          'https://img1.beidouxingxueche.com/imgs/824738867147051008/zgz/1616676377508.jpg',
        logoutPhotoPath:
          'https://img1.beidouxingxueche.com/imgs/824738867147051008/zgz/1616676452807.jpg',
        qcUserId: '824738867147051008',
        qcUserName: '吴琪',
        randomPhotoPath:
          'https://img1.beidouxingxueche.com/imgs/824738867147051008/zgz/1616676442235.jpg',
        schoolId: '2113534cd56941179fce10103a507d67',
        startTime: '2021-03-25 20:46:17',
        zgzExaminerOne: '金龙考官1',
        zgzExaminerTwo: '金龙考官2'
      },
      show: false
    }
  },
  created () {
    this.created_page()
  },
  methods: {
    created_page () {
      this.show = true

      this.$nextTick(() => {
        var canvas = document.getElementById('roadModel5')

        var context = canvas.getContext('2d')

        var imgbg = new Image()

        imgbg.src =
          'https://static.360myb.com/image/goods_img/20180910/1c027600ea165b3762fb58f02341d1dc.jpg'

        var imgcode = new Image()

        imgcode.src =
          'http://assets.huayupiaowu.com/static/team/2019/0606/15597969991480.jpg'

        imgbg.onload = function () {
          console.log(imgbg.complete)

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
    exportDocx () {
      // 这个是导出的方法
      let docxUrl = '/static/img.docx'
      JSZipUtils.getBinaryContent(docxUrl, (err, content) => {
        if (err) {
          throw err
        }
        let interModelCanvas = document.getElementById(this.interModelCanvasId)
        if (interModelCanvas) {
          console.log(interModelCanvas)
          console.log(interModelCanvas.toDataURL())
          // 路口模型图片
          this.acsInfo.loginPhotoPath = interModelCanvas.toDataURL()
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
            return [470, 210]
            // return new Promise((resolve, reject) => {

            // });
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
            acs_id: this.acsInfo.acs_id,
            exportYear: this.acsInfo.exportYear,
            exportMonth: this.acsInfo.exportMonth,
            exportDay: this.acsInfo.exportDay,
            unit1: this.acsInfo.unit1,
            unit2: this.acsInfo.unit2,
            acs_version: this.acsInfo.acs_version,
            versionDate: this.acsInfo.versionDate,
            ip: this.acsInfo.ip,
            interImg: this.acsInfo.interImg,
            lightTypeArrs: this.lightTypeArrs,
            roadPlanInfo: this.roadPlanInfo,
            historyPlanInfos: this.historyPlanInfos
          })
          .then(() => {
            // doc.setData({
            //   name: this.acsInfo.name,
            //   acs_id: this.acsInfo.acs_id,
            //   exportYear: this.acsInfo.exportYear,
            //   exportMonth: this.acsInfo.exportMonth,
            //   exportDay: this.acsInfo.exportDay,
            //   unit1: this.acsInfo.unit1,
            //   unit2: this.acsInfo.unit2,
            //   acs_version: this.acsInfo.acs_version,
            //   versionDate: this.acsInfo.versionDate,
            //   ip: this.acsInfo.ip,
            //   interImg: this.acsInfo.interImg,
            //   lightTypeArrs: this.lightTypeArrs,
            //   roadPlanInfo: this.roadPlanInfo,
            //   historyPlanInfos: this.historyPlanInfos
            // });
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
            saveAs(out, this.acsInfo.name + '交叉路口模板' + '.doc') // 注意这里加下后缀，因为有些地方导出文件类型的文件，不能识别类型
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
