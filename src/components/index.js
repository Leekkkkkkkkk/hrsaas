import PageTools from '@/components/pageTools'
import UploadExcel from './UploadExcel'
import UploadImage from './UploadImage'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('UploadImage', UploadImage)
  }
}
