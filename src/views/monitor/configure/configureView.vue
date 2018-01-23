<!--
描述：硬件管理-硬件信息-检测历史
开发人：fwb
开发日期：2017年8月22日
-->
<template lang="pug">
  kalix-dialog.user-add(bizKey="hardwarelog" ref="kalixBizDialog"
  v-bind:submitCustom="submitCustom"  v-bind:form-model="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      div(class="test" v-for='(item,index) in items')
        div(v-for="(data, key) in item") {{divLoad(data,key)}}
          div.s-flex(v-if="formModel[key]")
            el-form-item.s-flex_item(v-bind:label="data.name" label-width="120px")
              el-input(v-bind:type="data.type" v-bind:id="data.id" v-bind:placeholder="data.desc" v-model="formModel[key].value")
            div.popover
              base-help(v-bind:ref="popover1" v-bind:placement="placement" v-bind:classname="classname" v-bind:title="data.desc" v-bind:width="200" v-bind:trigger="trigger")
</template>
<script type="text/ecmascript-6">
  import FormModel from './model'
  import Vue from 'vue'
  import {HardwareLogMailURL, HardwareLogConfigureMailURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  import Help from '@/components/custom/baseHelp.vue'
  import { Message } from 'element-ui'
  // import qs from 'qs'
  export default {
    data() {
      return {
        targetRestURL: HardwareLogMailURL,
        targetURL: HardwareLogConfigureMailURL,
        formModel: Object.assign({}, FormModel),
        items: {},
        classname: 'el-icon-question',
        placement: 'top-start',
        trigger: 'hover'
      }
    },
    components: {
      KalixDialog: Dialog,
      baseHelp: Help
    },
    created() {
      console.log('this.formModel : ', this.formModel['mail'].value)
    },
    mounted() {
      this.axios.request({
        method: 'GET',
        url: this.targetRestURL + '/all',
        params: {},
        dataType: 'json',
        data: {
        }
      }).then(response => {
        if (response.data) {
          this.items = response.data.data
        } else {
          // Message.success('重置失败')
        }
      }).catch(() => {
      })
    },
    methods: {
      divLoad(_data, _key) {
//        this.formModel[_key].value = _data.value
        this.formModel[_key] = _data
        console.log('divLoad', _data, _key)
      },
      submitCustom(baseDialog) {
        baseDialog.$refs.dialogForm.validate((valid) => {
          console.log('valid', baseDialog.formModel)
//          let _data ={model:JSON.stringify(this.formModel)}
          if (valid) {
            Vue.axios.request({
              method: baseDialog.isEdit ? 'PUT' : 'POST',
              url: baseDialog.isEdit ? `${baseDialog.targetURL}/${this.formModel.id}` : baseDialog.targetURL,
              params: {
                content: baseDialog.formModel
              }
            }).then(response => {
              if (response.data.success) {
                // Message.success(response.data.msg)
                baseDialog.visible = false
                baseDialog.$refs.dialogForm.resetFields()
                baseDialog.submitComplete()
                Message.success('保存成功')
                // 关闭对话框
                baseDialog.close()
                // 清空form
                //   baseDialog.$parent. .resetDialogForm()
                //   baseDialog.$emit('resetDialogForm')
              } else {
                Message.error('保存失败')
                baseDialog.submitComplete()
              }
              // 刷新列表
              //   EventBus.$emit(ON_REFRESH_DATA)
              baseDialog._afterDialogClose()
              console.log('[kalix] dialog submit button clicked !')
              baseDialog.visible = false
            })
          } else {
            // Message.error('请检查输入项！')
            baseDialog.submitComplete()
            return false
          }
        })
      },
      listen(oldValue, newValue) {
        console.log('[formModel]:', this.formModel)
      }
    },
    watch: {
      formModel: {
        deep: true,
        handler: 'listen'
      }
    }
  }
</script>
<style scoped lang="stylus">
  .el-form
    padding 30px 70px 30px 20px
  .popover
    height 40px
    display flex
    align-items center
    padding-left 16px
    font-size 20px

</style>
