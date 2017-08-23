<template lang="pug">
  el-dialog(v-bind:visible="visible" v-bind:before-close="close" v-bind:close-on-click-modal="false")
    span(slot="title")
      i.iconfont.icon-attachment-column
      | 附件管理
    el-button.upload
      i.iconfont.icon-workflow-view
      | 选择文件
      input(type="file" v-on:change="selectedFile")
    div.file-list
      el-table(v-bind:data="files"   style="width: 100%")
        el-table-column(prop="attachmentName" label="附件名")
        el-table-column(prop="attachmentSize" label="大小")
        el-table-column(prop="attachmentType" label="类型")
        el-table-column(label="操作")
          template(scope="scope")
            el-button(size="small" type="danger" v-on:click="deleteSelectFile(scope.$index, scope.row)")
              i.iconfont.icon-schedule-task-failure
              | 删除
    div.dialog-footer(slot="footer")
      el-button(v-on:click="onCancelClick") 关 闭
      el-button(type="primary" v-on:click="onSubmitClick")
        i.iconfont.icon-upload
        | 上 传
</template>
<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        title: '',
        visible: false,
        files: []
      }
    },
    methods: {
      onSubmitClick() {
        console.log('dialog cancel button clicked !')
        if (this.files.length > 0) {
          this._fileUpload(0)
        }
        this.close()
      },
      _fileUpload(i, callBack) {
        let item = this.files[i]
        item.mainId = this.row.id
        this.$http.post('/camel/rest/attachments', item).then(res => {
          if (res.data.success) {
            i++
            if (i < this.files.length) {
              this._fileUpload(i)
            } else {
              console.log('完成')
              if (typeof callBack === 'function') {
                callBack()
              }
            }
          }
        })
      },
      onCancelClick() {
        this.close()
      },
      close() {
        this.visible = false
      },
      openDialog(_row) {
        console.log('scheduledictAttachment', 'openDialog')
        this.visible = true
        this.row = _row
      },
      selectedFile(e) {
        let file = event.target.files[0]
        let formData = new FormData()
        formData.append('file', file)
        this.$http.post('/camel/rest/upload', formData).then(res => {
          if (res.data.success) {
            this.files.push({
              attachmentId: res.data.attachmentId,
              attachmentName: res.data.attachmentName,
              attachmentPath: res.data.attachmentPath,
              attachmentRev: res.data.attachmentRev,
              attachmentSize: res.data.attachmentSize,
              attachmentType: res.data.attachmentType
            })
          }
        })
      },
      deleteSelectFile(_index, row) {
        this.files = this.files.filter((e, i) => {
          return i !== _index
        })
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .upload
    display inline-block
    position relative
    overflow hidden
    margin-bottom 20px
    input
      position absolute
      top 0
      right -1px
      font-size 100px
      cursor pointer
      opacity 0
</style>
