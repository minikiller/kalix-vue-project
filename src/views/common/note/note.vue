<!--
描述：我的首页-公司公告组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  keep-alive
    base-table(bizKey="note" title='公告列表' v-bind:tableFields="tableFields" v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel" v-bind:formRules="formRules" v-bind:bizDialog="bizDialog"
    bizSearch="CommonNoteSearch" v-bind:btnList="btnList"
    v-bind:customTableTool="customTableTool")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {NoteURL, NoteComponent, ToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(NoteComponent)

  export default {
    data() {
      return {
        toolbarBtnList: [
          {id: 'add', isShow: false}
        ],
        btnList: ToolButtonList,
        targetURL: NoteURL,
        tableFields: [
          {prop: 'title', label: '标题'},
          {prop: 'content', label: '内容'},
          {prop: 'publishPeople', label: '发布人'},
          {prop: 'publishDate', label: '发布时间'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'CommonNoteView'},
          {id: 'edit', dialog: 'CommonNoteAdd'},
          {id: 'add', dialog: 'CommonNoteAdd'},
          {id: 'preview', dialog: 'CommonNotePreview'}
        ],
        formModel: {
          title: '',
          content: '',
          publishPeople: '',
          publishDate: ''
        },
        formRules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
//      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
    },
    methods: {
      customTableTool(row, btnId, that) {
        switch (btnId) {
          case 'preview': { // 启用/停用
            console.log('开始预览咯！！！')
            that.whichBizDialog = ''
            let dig =
              that.bizDialog.filter((item) => {
                return item.id === 'preview'
              })
            that.whichBizDialog = dig[0].dialog
            setTimeout(() => {
              that.$refs.kalixDialog.open(row)
            }, 20)
            break
          }
        }
      }
    },
    components: {
      BaseTable
//      KalixUserAdd: UserAdd
    }
  }
</script>

<style scoped lang="stylus">

</style>
