<template lang="pug">
  el-dialog(v-bind:visible="visible" v-bind:before-close="close" v-bind:close-on-click-modal="false")
    span(slot="title")
      i.iconfont.icon-attachment-column
      | 附件管理
    el-button.upload
      i.iconfont.icon-upload
      | 上 传
      input(type="file" v-on:change="selectedFile")
    div.file-list
      el-table(v-bind:data="files" style="width: 100%"
      v-bind:height="tableHeight")
        el-table-column(label="行号" width="70")
          template(scope="scope")
            div(style="text-align: center") {{ scope.row.rowNumber }}
        el-table-column(prop="attachmentName" label="名称")
          template(scope="scope")
            div.attachment-name {{scope.row.attachmentName}}
        el-table-column(label="大小(MB)" width="100")
          template(scope="scope")
            span {{setFileSize(scope.row.attachmentSize)}}
        el-table-column(prop="attachmentType" label="类型" width="116")
        el-table-column(prop="creationDate" label="上传日期" width="180")
        el-table-column(label="操作" width="120")
          template(scope="scope")
            el-button(size="mini" type="danger" v-on:click="deleteSelectFile(scope.$index, scope.row)")
              | 删除
            a.el-button.el-button--primary.el-button--mini(v-bind:href="scope.row.attachmentPath" target="_blank")
              | 下载
    el-pagination.kalix-table-pagination(v-if="pager.totalCount"
    v-on:size-change="pagerSizeChange"
    v-on:current-change="pagerCurrentChange"
    v-bind:current-page="pager.currentPage"
    v-bind:page-sizes="pager.pageSizes"
    v-bind:page-size="1"
    layout="total, sizes, prev, pager, next, jumper"
    v-bind:total="pager.totalCount")
    div.dialog-footer(slot="footer")
      el-button(type="primary" v-on:click="onCancelClick") 关 闭
</template>
<script type="text/ecmascript-6">
  import Message from 'common/message'
  import EventBus from 'common/eventbus'
  import {AttachmentURL, PageConfig} from 'config/global.toml'

  const MAX_TABLE_HTIGHT = 450
  const MIN_TABLE_HTIGHT = 0
  export default {
    data() {
      return {
        bizKey: '',
        title: '',
        visible: false,
        files: [],
        tableHeight: MAX_TABLE_HTIGHT,
        pager: {
          totalCount: 0,
          pageSizes: PageConfig.sizes,
          currentPage: 1,
          limit: PageConfig.limit,
          start: 0
        }
      }
    },
    methods: {
      setFileSize(size) {
        return (size / (1024 * 1024)).toFixed(2)
      },
      onSubmitClick() {
        console.log('dialog cancel button clicked !')
        if (this.files.length > 0) {
          this._fileUpload(0)
        }
        this.close()
      },
      onCancelClick() {
        this.close()
      },
      close() {
        this.visible = false
        this._afterDialogClose()
      },
      openDialog(_row, _bizKey) {
        console.log('scheduledictAttachment', 'openDialog')
        this.visible = true
        this.row = _row
        this.bizKey = _bizKey
        this._getFilesList()
      },
      selectedFile(e) {
        let that = this
        let file = event.target.files[0]
        let formData = new FormData()
        formData.append('file', file)
        this.$http.post('/camel/rest/upload', formData).then(res => {
          if (res.data.success) {
            this._fileUpload({
              mainId: that.row.id,
              attachmentId: res.data.attachmentId,
              attachmentName: res.data.attachmentName,
              attachmentPath: res.data.attachmentPath,
              attachmentRev: res.data.attachmentRev,
              attachmentSize: res.data.attachmentSize,
              attachmentType: res.data.attachmentType
            }, () => {
              this._getFilesList()
            })
          }
        })
      },
      deleteSelectFile(_index, row) {
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return this.axios.request({
            method: 'DELETE',
            url: AttachmentURL + '/' + row.id,
            params: {},
            data: {
              id: row.id
            }
          })
        }).then(res => {
          if (res.data.success) {
            this.files = this.files.filter((e, i) => {
              return i !== _index
            })
            Message.success(res.data.msg)
          } else {
            Message.error(res.data.msg)
          }
        }).catch(() => {
        })
      },
      pagerSizeChange(val) { //  改变每页记录数
        this.pager.limit = val
        this._getFilesList()
      },
      pagerCurrentChange(val) { //  翻页
        this.pager.currentPage = val
        this._getFilesList()
      },
      _fileUpload(item, callBack) {
        this.$http.post(AttachmentURL, item).then(res => {
          if (res.data.success) {
            Message.success(res.data.msg)
            if (typeof callBack === 'function') {
              callBack()
            }
          }
        })
      },
      _getFilesList() {
        this.files = []
        let _data = {
//          jsonStr:'{"%mainid%":"40"}',
          page: this.pager.currentPage,
          limit: this.pager.limit,
          start: this.pager.start
        }
        this.$http.get(AttachmentURL, {params: _data})
          .then(res => {
            this.files = res.data.data.map((item, index) => {
              item.rowNumber = index + this.rowNo
              return item
            })
            this.pager.totalCount = res.data.totalCount
          })
      },
      _afterDialogClose() {
        EventBus.$emit(this.bizKey + '-' + 'KalixDialogClose')
      }
    },
    computed: {
      rowNo() {
        return (1 + ((this.pager.currentPage - 1) * this.pager.limit)) // 返回当前行号
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

  .file-list
    .el-button
      vertical-align top
      text-decoration none
    .attachment-name
      white-space nowrap
      overflow hidden
      text-overflow ellipsis

  .kalix-table-pagination
    margin-top 20px
</style>
