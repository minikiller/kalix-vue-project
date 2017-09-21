<!--
描述：baseUpload 上传组件
开发人：hqj
开发日期：2017年9月19日
-->

<template lang="pug">
  div.block
    el-upload.upload-demo(v-bind:action="action" v-bind:headers="headers" v-bind:multiple="false" v-bind:file-list="fileList"
    v-bind:on-change="handleChange" v-bind:before-upload="handleBeforeUpload" v-bind:on-success="handleSuccess" v-bind:on-error="handleError"
    v-bind:on-preview="handlePreview" v-bind:on-remove="handleRemove")
      el-button(size="small" type="primary") 点击上传
</template>

<script type="text/ecmascript-6">
  // import Vue from 'vue'
  import {baseURL, uploadURL} from 'config/global.toml'
  import Cache from 'common/cache.js'

  let fileCount = 0
  export default {
    mounted () {
      this.fentch()
    },
    data() {
      return {
        action: baseURL + uploadURL,
        headers: {'access_token': Cache.get('access_token'), 'jsessionid': Cache.get('user_token')},
        fileList: []
      }
    },
    methods: {
      // 组件初始化
      fentch () {
        if (this.value !== '') {
          let pathParts = this.value.split('/')
          // let fileName = pathParts[pathParts.length - 1]
          let fileName = pathParts.pop()
          let obj = {'name': fileName, 'url': this.value}
          this.fileList.push(obj)
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
      },
      handleSuccess(response, file, fileList) {
        if (response.success) {
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
          this.$emit('input', '')
        } else {
          this.$emit('input', file.url)
        }
      }
    },
    props: {
      value: {
        type: String
      }
    }
  }
</script>
