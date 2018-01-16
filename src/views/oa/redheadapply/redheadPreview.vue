<template lang="pug">
  el-dialog.dialog-form(v-bind:visible="visible"
  fullscreen
  custom-class="previewDialog"
  v-bind:before-close="close"
  v-bind:close-on-click-modal="false"
  v-bind:append-to-body="true")
    div.preview-wrapper(ref="previewWrapper")
      red-head-document(v-bind:formModel="formModel")
</template>
<script type="text/ecmascript-6">
  import RedHeadDocument from 'components/fileProview/redHeadDocument'

  export default {
    data() {
      return {
        privateTitle: '',
        visible: false,
        formModel: Object.assign({}, {})
      }
    },
    methods: {
      close() {
        this.visible = false
      },
      open(row) {
        this.visible = true
        if (row) {
          this.formModel = row
        }
        this._setStyle()
      },
      _setStyle() {
        setTimeout(() => {
          this.$refs.previewWrapper.style.height = (window.innerHeight - 100) + 'px'
        }, 20)
      }
    },
    components: {
      RedHeadDocument
    }
  }
</script>
<style lang="stylus" type="text/stylus">
  .previewDialog
    position relative
    .el-dialog__header
      padding 0
    .el-dialog__body
      padding 50px 4px
</style>
<style scoped lang="stylus" type="text/stylus">
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
