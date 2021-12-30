import PageTools from '@/components/pageTools'
import UploadExcel from './UploadExcel'
import UploadImage from './UploadImage'
import WorkDate from './WorkDate'
import FullScreen from './FullScreen'
import ChangLang from './ChangLang'
export default {
  install(Vue) {
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('UploadImage', UploadImage)
    Vue.component('WorkDate', WorkDate)
    Vue.component('FullScreen', FullScreen)
    Vue.component('ChangLang', ChangLang)
  }
}
