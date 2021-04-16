import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>
        import('@/views/home')
    },
    {
      path: '/Button',
      name: 'BUtton',
      component: () =>
        import('@/views/button/button')
    },
    {
      path: '/DocxExport',
      name: 'DocxExport',
      component: () =>
        import('@/views/Export/docxExport')
    },
    {
      path: '/DocxExportImg',
      name: 'DocxExportImg',
      component: () =>
        import('@/views/Export/imgExport')
    },
    {
      path: '/TakePhoto',
      name: 'TakePhoto',
      component: () =>
        import('@/views/takePhoto/index')
    },
    {
      path: '/ExcelExport',
      name: 'ExcelExport',
      component: () =>
        import('@/views/Export/exportExcel')
    },
    {
      path: '/map',
      name: 'map',
      component: () =>
        import('@/views/Map/index')
    }
  ]
})
