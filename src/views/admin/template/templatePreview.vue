<!--
描述：系统应用-模板管理-预览
开发人：yangz
开发日期：2018年02月07日
-->
<template lang="pug">
  el-dialog.dialog-form(v-bind:visible="visible"
  custom-class="previewDialog"
  v-bind:show-close="false"
  v-bind:before-close="close"
  fullscreen
  v-bind:close-on-click-modal="false"
  v-bind:append-to-body="true" ref="preview")
    el-button(v-on:click="close" type="primary"
      size="mini" style="position: absolute;top: 20px;left: 20px;")
      | 关闭
    div.preview-wrapper(ref="previewWrapper")
      kalix-template(v-bind:content="content")
</template>

<script type="text/ecmascript-6">
  import BaseSysTemplate from '@/components/custom/baseSysTemplate.vue'
  import {templateURL} from '../config.toml'
  export default {
    data() {
      return {
        privateTitle: '',
        visible: false,
        formModel: Object.assign({}, {}),
        configURL: templateURL + '/template',
        content: ''
      }
    },
    components: {
      KalixTemplate: BaseSysTemplate
    },
    methods: {
      close() {
        this.visible = false
      },
      open(row) {
        if (row) {
          this.formModel = row
          let templateContent = this.formModel.content
          if (!this.configURL) {
            this.content = templateContent
            return
          }
          let templateId = this.formModel.templateId
          let templateType = this.formModel.templateType
          let _data = {
            jsonStr: `{'templateId': '` + templateId + `','templateType': '` + templateType + `'}`
          }
          this.$http.get(this.configURL, {
            params: _data
          }).then(response => {
            let tableData = response.data.data
            if (tableData && tableData.length > 0) {
              this.content = tableData[0]
            } else {
              this.content = templateContent
            }
          }).catch(() => {
            console.log('load preview data exception')
          }, 20)
        }
        this.visible = true
        this._setStyle()
      },
      _setStyle() {
        setTimeout(() => {
          this.$refs.previewWrapper.style.height = (window.innerHeight - 100) + 'px'
        }, 20)
      }
    },
    mounted() {
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  .previewDialog
    position relative
    .el-dialog__header
      padding 0
    .el-dialog__body
      padding 50px 4px
  .preview-wrapper
    height 85vh
    overflow auto
    &::-webkit-scrollbar
      width 4px
      height 4px
      background-color #ffffff

    &::-webkit-scrollbar-thumb
      border-radius: 4px;
      background-color: #999999;
</style>
