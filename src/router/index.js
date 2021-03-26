import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'
import DocxExport from '@/views/Export/docxExport'
import DocxExportImg from '@/views/Export/imgExport'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/DocxExport',
      name: 'DocxExport',
      component: DocxExport
    },
    {
      path: '/DocxExportImg',
      name: 'DocxExportImg',
      component: DocxExportImg
    }
  ]
})
