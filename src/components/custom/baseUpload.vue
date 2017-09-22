<!--
描述：baseUpload 上传组件
开发人：hqj
开发日期：2017年9月19日
-->

<template lang="pug">
  div.block
    el-upload(v-bind:class="{'avatar-uploader':isImage,'upload-demo':!isImage}" v-bind:action="action" v-bind:headers="headers"
    v-bind:multiple="false" v-bind:show-file-list="true" v-bind:file-list="fileList"
    v-bind:on-change="handleChange" v-bind:before-upload="handleBeforeUpload"
    v-bind:on-success="handleSuccess" v-bind:on-error="handleError"
    v-bind:on-preview="handlePreview" v-bind:on-remove="handleRemove")
      template(v-if="isImage")
        img.avatar(v-if="imageUrl" v-bind:src="imageUrl")
        i.el-icon-plus.avatar-uploader-icon(v-else)
      template(v-else)
        template(v-if="!readonly")
          el-button(size="small" type="primary") 点击上传
        template(v-else)
          el-button(size="small" type="primary") 点击上传
</template>

<script type="text/ecmascript-6">
  import {baseURL, uploadURL, couchdbDelURL} from 'config/global.toml'
  import Cache from 'common/cache.js'
  import Vue from 'vue'

  let fileCount = 0
  // let attachmentId = ''
  export default {
    mounted () {
      this.fentch()
    },
    data() {
      return {
        action: baseURL + uploadURL,
        headers: {'access_token': Cache.get('access_token'), 'jsessionid': Cache.get('user_token')},
        fileList: [],
        imageUrl: ''
      }
    },
    methods: {
      // 组件初始化
      fentch () {
        if (this.value !== '') {
          let pathParts = this.value.split('/')
          // let fileName = pathParts[pathParts.length - 1]
          let fileName = pathParts.pop()
          // attachmentId = pathParts.pop()
          let obj = {'name': fileName, 'url': this.value}
          this.fileList.push(obj)

          if (this.isImage) {
            this.imageUrl = this.value
          }
        }
      },
      handleChange(file, fileList) {
        fileCount = fileList.length
      },
      handleBeforeUpload(file) {
        if (fileCount > 1) {
          this.$message.error('只允许上传一个文件且文件已经存在,请先删除原有文件再进行上传！')
          return false
        }

        if (this.isImage) {
          const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
          const isLt2M = file.size / 1024 / 1024 < 2
          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!')
          }
          return isJPG && isLt2M
        }
      },
      handleSuccess(response, file, fileList) {
        if (response.success) {
          if (this.isImage) {
            this.imageUrl = URL.createObjectURL(file.raw)
          }
          // attachmentId = response.attachmentId
          this.$emit('input', response.attachmentPath)
        } else {
          this.$emit('input', this.value)
        }
      },
      handleError(err, file, fileList) {
        console.log(err, file, fileList)
      },
      handlePreview(file) {
        window.open(file.url)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList)
        if (file.status === 'success') {
          let attachmentId = ''
          let rev = ''
          if (file.response) {
            attachmentId = file.response.attachmentId
            rev = file.response.attachmentRev
          } else {
            let pathParts = file.url.split('/')
            pathParts.pop()
            attachmentId = pathParts.pop()
          }
          // 删除couchdb数据库中附件
          if (attachmentId !== '' && rev !== '') {
            Vue.axios.request({
              method: 'DELETE',
              url: couchdbDelURL,
              params: {'id': attachmentId, 'rev': rev},
              data: {}
            }).then((response) => {
              console.log(response.data.success)
            })
          }

          if (this.isImage) {
            this.imageUrl = ''
          }
          this.$emit('input', '')
        }
      }
    },
    props: {
      value: {
        type: String
      },
      isImage: {
        type: Boolean,
        default: true
      },
      readonly: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
