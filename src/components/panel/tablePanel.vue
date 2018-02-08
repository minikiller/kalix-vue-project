<template lang="pug">
  div.panel(v-bind:class="cls")
    panel-header
      template(slot="title")
        div {{title}}
      template(slot="right")
        panel-header-button(type="close" v-on:click="close")
    div.panel-body
      div.article
        el-form(ref="dialogForm" v-bind:model="formModel" label-width="80px")
          slot(name="panelSlot")
      div.aside
        el-button(v-on:click="onCancelClick") 取消
        el-button(v-on:click="onSubmitClick") 确定
</template>
<script type="text/ecmascript-6">
  import EventBus from 'common/eventbus'
  import {ON_REFRESH_DATA} from '../custom/event.toml'
  import Message from 'common/message'
  import PanelHeader from './panelHeader.vue'
  import panelHeaderButton from './panelHeaderButton.vue'

  export default {
    props: {
      title: {
        default: ''
      },
      formModel: { // dialog中的form的数据模型，由父组件传递
        type: Object,
        required: true
      },
      rules: {  // form的校验规则
        type: Object
//        required: true
      },
      targetURL: {  // 业务数据提交的url,包括add，delete，update
        type: String
//        required: true
      },
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isVisible: false,
        isMin: false,
        groupTitle: '',
        treeData: [],
        groupData: {},
        cls: '',
        submitBefore: {  // 提交前执行  submitBefore(baseDialog,function Submit)
          type: Function
        },
        submitAfter: {  // 提交后执行  submitBefore(baseDialog)
          type: Function
        },
        submitCustom: {  // 自定义提交事件  submitBefore(baseDialog)
          type: Function
        }
      }
    },
    methods: {
      submitComplete() { // 提交完成后执行
        if (this.submitAfter && typeof (this.submitAfter) === 'function') {
          this.submitAfter(this)
        }
      },
      submitAction() {  // 提交
        this.$refs.dialogForm.validate((valid) => {
          console.log('valid', valid)
          if (valid) {
            this.$http.request({
              method: this.isEdit ? 'PUT' : 'POST',
              url: this.isEdit ? `${this.targetURL}/${this.formModel.id}` : this.targetURL,
              data: this.formModel,
              params: {}
            }).then(response => {
              if (response.data.success) {
                Message.success(response.data.msg)
                this.visible = false
                this.$refs.dialogForm.resetFields()
                this.submitComplete()
                // 关闭对话框
//                this.close()
                // 清空form
//                this.$parent.resetDialogForm()
//                this.$emit('resetDialogForm')
              } else {
                Message.error(response.data.msg)
                this.submitComplete()
              }
              // 刷新列表
              EventBus.$emit(ON_REFRESH_DATA)
              this._afterDialogClose()
              console.log('[kalix] dialog submit button clicked !')
              this.visible = false
            })
          } else {
            Message.error('请检查输入项！')
            this.submitComplete()
            return false
          }
        })
      },
      onCancelClick() {
        console.log('dialog cancel button clicked !')
        this.visible = false
        if (!this.isView) {
          this.$refs.dialogForm.resetFields()
        }
//        this.$emit('update:formModel', JSON.parse(this.tempFormModel))
        this._afterDialogClose()
      },
      onSubmitClick() {
        if (this.submitCustom && typeof (this.submitCustom) === 'function') {
          this.submitCustom(this)
        } else if (this.submitBefore && typeof (this.submitBefore) === 'function') {
          this.submitBefore(this, () => {
            this.submitAction()
          })
        } else {
          this.submitAction()
        }
      },
      open(item) {
        this.isVisible = true
        this.groupData = item
        setTimeout(() => {
          this.cls = 'open'
        }, 20)
        console.log('TablePanel OPEN')
      },
      close() {
        // 关闭窗体
        EventBus.$emit('ON_CLOSE_BASETABLE')
      },
      _afterDialogClose() {
      }
    },
    components: {
      PanelHeader,
      panelHeaderButton
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../assets/stylus/panel-base.styl"
  .panel
    position: absolute;
    top: 5%;
    height: 80%;
    left: 50%;
    margin-left: -195px;
    width 700px !important
    overflow: hidden;
    z-index 99
    background-color rgba(254, 254, 240, 0.94)
    border-radius $borderRadius
    display flex
    flex-flow column
    transition all .5s
    &.open
      opacity 1
    &.close,
    &.min
      opacity 0
      transform scale(.5)
    .group-title
      text-align center
      font-size 18px
      margin 0 54px
      line-height 53px
      border-bottom 4px solid #686868
    .panel-body
      flex 1
      padding 27px 54px
      width 100%
      box-sizing border-box
      overflow hidden
      display flex
      flex-flow column
      .article
        flex 1
        overflow auto
      .aside
        text-align right

  /* 翻板 */
  .turn-enter-active,
  .turn-leave-active
    transition all .3s
    transform-style preserve-3d

  .turn-enter-active
    transform-origin center top

  .turn-leave-active
    transform-origin center bottom

  .turn-enter,
  .turn-leave-active
    opacity 0

  .turn-enter
    transform scale(.9) rotateX(-10deg)

  .turn-leave-active
    transform scale(.9) rotateX(10deg)

  /* 缩放 */
  .zoom-enter-active,
  .zoom-leave-active
    transition all .5s

  .zoom-enter,
  .zoom-leave-active
    opacity 0
    transform scale(.9)
</style>
