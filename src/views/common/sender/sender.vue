<!--
描述：我的首页-发件箱组件
开发人：桑杨
开发日期：2017年8月29日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="sender" title='发件列表'
    ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel"
    v-bind:formRules="formRules"
    v-bind:bizDialog="bizDialog"
    v-bind:btnList="btnList"
    v-bind:dictDefine="dictDefine"
    v-bind:hasTableSelection="hasTableSelection"
    v-bind:isShowToolBar="isShowToolBar"
    v-bind:toolbarBtnList="toolbarBtnList"
    v-bind:deleteAllUrl="deleteAllUrl"
    v-bind:customToolbarClickEvents="customToolbarClickEvents"
    bizSearch="CommonSenderSearch")
</template>
<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import {SenderURL, SenderComponent, SenderToolButtonList} from '../config.toml'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(SenderComponent)

  export default {
    data() {
      return {
        deleteAllUrl: `${SenderURL}/remove`,
        isShowToolBar: true,
        hasTableSelection: true,
        toolbarBtnList: [
          {id: 'deleteChecked', isShow: true},
          {id: 'customBtn1', icon: 'icon-edit', title: '自定义按钮 1', isShow: true},
          {id: 'customBtn2', icon: 'icon-edit', title: '自定义按钮 2', isShow: true},
          {id: 'customBtn3', icon: 'icon-edit', title: '自定义按钮 3', isShow: true},
          {id: 'customBtn4', icon: 'icon-edit', title: '自定义按钮 4', isShow: true},
          {id: 'add', isShow: false}
        ],
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: 'COMMON-DICT-KEY',
          type: '消息类别',
          targetField: 'categoryName',
          sourceField: 'category'
        }],
        btnList: SenderToolButtonList,
        targetURL: SenderURL,
        tableFields: [
          {prop: 'receiverNames', label: '收件人'},
          {prop: 'categoryName', label: '消息类别'},
          {prop: 'title', label: '消息主题'},
          {prop: 'creationDate', label: '发布时间'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'CommonSenderView'}
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
//      this.customToolbarClickEvents = this
      const that = this
      this.customToolbarClickEvents = {
        customBtn1() {
          that.customEventBtn1()
        },
        customBtn2() {
          that.customEventBtn2()
        },
        customBtn3() {
          that.customEventBtn3()
        },
        customBtn4() {
          that.customEventBtn4()
        }
      }
    },
    methods: {
      customEventBtn1() {
        console.log('This is "自定义按钮 1" click event ~~~~')
      },
      customEventBtn2() {
        console.log('This is "自定义按钮 2" click event ~~~~')
      },
      customEventBtn3() {
        console.log('This is "自定义按钮 3" click event ~~~~')
      },
      customEventBtn4() {
        console.log('This is "自定义按钮 4" click event ~~~~')
      }
    },
    components: {
      BaseTable
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
