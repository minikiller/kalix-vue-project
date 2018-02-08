<!--
描述：系统应用-模板管理-模板修改
开发人：yangz
开发日期：2018年02月01日
-->
<template lang="pug">
  kalix-dialog.user-add(title='修改' bizKey="template" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="模板名称" prop="name" v-bind:label-width="labelWidth" v-bind:rules="rules.name")
        el-input(v-model="formModel.name")
      el-form-item(label="模板描述" prop="desc" v-bind:label-width="labelWidth")
        el-input(type="textarea" v-model="formModel.desc" v-bind:rows="3")
      el-form-item(label="模板内容" prop="content" v-bind:label-width="labelWidth")
        <!--el-input(type="textarea" v-model="formModel.content" v-bind:rows="3")-->
        tinymce(v-model="formModel.content" ref="editor" v-bind:showCustomButton="true"
          bizPop = "AdminTemplatePopTable"
          v-bind:popData="popTableData" v-bind:tinymcePlugins="tinymcePlugins"
          v-on:popoverData="getPopoverTableRow" v-on:contentClick="onContentClick")
</template>

<script type="text/ecmascript-6">
  import FormModel from './templateModel'
  import Dialog from '@/components/custom/baseDialog.vue'
  import Tinymce from '@/third/Tinymce'
  import {templateURL, templateConfigURL, TemplateEditComponent} from '../config.toml'
  import {registerComponent} from '@/api/register'
  registerComponent(TemplateEditComponent)

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        templateId: '-1',
        labelWidth: '140px',
        rules: {
          name: [{required: true, message: '请输入模板名称', trigger: 'blur'}]
        },
        targetURL: templateURL,
        tinymcePlugins: 'advlist,autolink,code,paste,textcolor, colorpicker,fullscreen,link,lists,media,wordcount,imagetools,fullpage'
      }
    },
    computed: {
      popTableData() {
        return {
          buttonName: '模板属性',
          placement: 'right',
          width: '300px',
          trigger: 'click',
          targetUrl: templateConfigURL,
          tableFields: [
            {prop: 'fieldName', label: '属性名', width: '100px'},
            {prop: 'fieldDesc', label: '属性描述', width: '100px'}
          ],
          bizKey: 'templateAttr',
          jsonStr: `{'templateId': '` + this.templateId + `', '%fieldName%': ''}`
        }
      }
    },
    components: {
      KalixDialog: Dialog,
      Tinymce
    },
    mounted() {
    },
    methods: {
      init(dialogOption) {
        this.templateId = dialogOption.row.id
      },
      kalixDialogOpen() {
        this.$nextTick(() => {
          this.$refs.editor.initTinymce()
        })
      },
      kalixDialogClose() {
        this.$refs.editor.destroyTinymce()
      },
      getPopoverTableRow(row) {
        let attrVal = '${' + row.fieldName + '}'
        this.$refs.editor.setInsertContent(attrVal)
      },
      onContentClick() {
        this.$refs.editor.getKalixPop((_kalixPop) => {
          let kalixPop = _kalixPop
          setTimeout(() => {
            kalixPop.$refs.kalixPopTable.closePopover()
          }, 20)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">

</style>
