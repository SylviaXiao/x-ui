/* eslint-disable */
/**
  *导出docx
  *@param { String } tempDocxPath 模板文件路径
 * @param { Object } data 文件中传入的数据
 * @param { String } fileName 导出文件名称
*/
import Docxtemplater from 'docxtemplater'
import ImageModule from 'docxtemplater-image-module-free'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import { saveAs } from 'file-saver'
// 导出纯文档
export const exportDocx = (tempDocxPath, data, fileName) => {
  // 读取并获得模板文件的二进制内容
  JSZipUtils.getBinaryContent(tempDocxPath, (error, content) => {
    if (error) {
      throw error
    }
    let zip = new PizZip(content)
    let doc = new Docxtemplater().loadZip(zip)
    doc.setData(data)
    try {
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      doc.render()
    } catch (error) {
      let e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties
      }
      console.log({
        error: e
      })
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
      throw error
    }
    let out = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    })
    // Output the document using Data-URI
    saveAs(out, fileName)
  })
}
// 导出带图片的文档

