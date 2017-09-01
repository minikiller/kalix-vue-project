<!--
描述：我的首页-收件箱组件
开发人：桑杨
开发日期：2017年8月30日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="receiver" title='收件列表'
    v-bind:tableFields="tableFields"
    v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel"
    v-bind:formRules="formRules"
    v-bind:bizDialog="bizDialog"
    v-bind:btnList="btnList"
    v-bind:dictDefine="dictDefine"
    v-bind:customRender="customRender"
    bizSearch="CommonReceiverSearch")
</template>
<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import Vue from 'vue'
  import {ReceiverURL, ReceiverComponent, SenderToolButtonList} from '../config.toml'

  // 注册全局组件
  ReceiverComponent.forEach((item) => {
    console.log('[kalix]-[research] registry name is: ' + item.name, '; registry path is: ' + item.path)
    Vue.component(item.name, require('' + item.path))
  })
  const RECEIVER_CATEGORY = 2
  export default {
    data() {
      return {
        dictDefine: [{ // 定义数据字典的显示
          cacheKey: 'COMMON-DICT-KEY',
          type: '消息类别',
          targetField: 'categoryName',
          sourceField: 'category'
        }],
        btnList: SenderToolButtonList,
        targetURL: ReceiverURL,
        tableFields: [
          {prop: 'senderName', label: '发件人'},
          {prop: 'categoryName', label: '消息类别'},
          {prop: 'title', label: '消息主题'},
          {prop: 'creationDate', label: '发布时间'},
          {prop: 'isRead', label: '是否已读'}

        ],
        bizDialog: [
          {id: 'view', dialog: 'CommonReceiverView'},
          {id: 'add', dialog: 'CommonReceiverAdd'}
        ],
        formModel: {
          title: '',
          content: '',
          receiverIds: '',
          receiverNames: '',
          category: RECEIVER_CATEGORY,
          senderId: '',
          senderName: ''
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
      customRender(_data) {
        _data.forEach(function (e) {
          e.isRead = e.read ? '是' : '否'
        })
      }
    },
    components: {
      BaseTable
//      KalixUserAdd: UserAdd
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
