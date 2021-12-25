<template>

  <div>
    <el-upload
      v-show="!isShowProgress"
      class="avatar-uploader"
      action="#"
      :before-upload="beforeUpload"
      :on-preview="onPreview"
      :http-request="onResult"
      :file-list="fileList"
      :on-change="onChange"
      :limit="limit"
      :on-remove="imgRemove"
      :on-exceed="onExceed"
      list-type="picture-card"
    >
      <i class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
    <el-progress v-if="isShowProgress" type="circle" :percentage="progressData" />
    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <img :src="imgUrl" alt="" style="width:100%">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDnNhlY4JI1TeYCZeT2KL5YlhMltkKdgSz',
  SecretKey: 'IJ3OTGm1zg7ICpBH6evwg9LGuHNCk11k'
})
export default {
  props: {
    limit: {
      type: Number,
      default: () => 0
    }
  },
  data() {
    return {
      fileList: [
        // { name: 'food.jpeg', url: 'https://hrsaas-1308960771.cos.ap-shanghai.myqcloud.com/ceb00ff961ade0b0751137f358e828be.jpg' }
      ],
      dialogVisible: false,
      imgUrl: '',
      isShowProgress: false,
      progressData: 1
    }
  },

  created() {

  },

  methods: {
    beforeUpload(file) {
      console.log(file)
      const ImgType = ['image/gif', 'image/jpeg']
      if (!ImgType.includes(file.type)) {
        this.$message.error('图片格式出错')
        this.isShowProgress = false
        return false
      }
      const maxImg = 10 * 1024 * 1024
      if (file.size > maxImg) {
        this.$message.error('图片超出限制')
        this.isShowProgress = false
        return false
      }
    },
    onResult(data) {
      const key = data.file.name
      this.id = setInterval(() => {
        if (this.progressData < 97) {
          this.progressData++
        } else {
          clearInterval(this.id)
        }
      }, 800)
      cos.putObject({
        Bucket: 'hrsaas-1308960771', /* 必须 */
        Region: 'ap-shanghai', /* 存储桶所在地域，必须字段 */
        Key: key, /* 必须 */
        StorageClass: 'STANDARD',
        Body: data.file, // 上传文件对象
        onProgress: (progressData) => {
          console.log(progressData)
          if (progressData.percent === 1) {
            this.progressData = 100
            clearInterval(this.id)
            setTimeout(() => {
              this.isShowProgress = false
            }, 500)
          }
        }
      }, (err, data) => {
        console.log(err || data)
        if (err) {
          this.isShowProgress = false
          this.$message.error('图片上传失败,请重试')
          this.fileList.splice(this.fileList.length - 1, 1)
        }
        if (!err && data.statusCode === 200) {
          console.log(data)
          console.log(this)
          const inx = this.fileList.length - 1
          this.fileList[inx].url = 'https://' + data.Location
          this.$emit('on-success', this.fileList)
        }
      })
    },
    onPreview(file) {
      this.dialogVisible = true
      console.log(file)
      this.imgUrl = file.url
    },
    imgRemove(file, fileList) {
      this.fileList = fileList
    },
    onChange(file, fileList) {
      this.isShowProgress = true
      this.fileList = fileList
    },
    onExceed() {
      this.$message.error(`最多只能上传${this.limit}张`)
    }
  }
}
</script>

<style  lang='scss'>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
