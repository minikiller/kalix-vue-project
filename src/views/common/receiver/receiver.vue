<!--
描述：我的首页-收件箱组件
开发人：桑杨
开发日期：2017年8月30日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="receiver" title='收件列表'
    ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="targetURL"
    v-bind:formModel="formModel"
    v-bind:formRules="formRules"
    v-bind:bizDialog="bizDialog"
    v-bind:btnList="btnList"
    v-bind:dictDefine="dictDefine"
    v-bind:customRender="customRender"
    v-on:tableSelectionChange="onTableSelectionChange"
    v-bind:toolbarBtnList="toolbarBtnList"
    v-bind:hasTableSelection="hasTableSelection"
    v-bind:customToolBar="customToolBar"
    bizToolBar="CommonReceiverTableToolBar"
    bizSearch="CommonReceiverSearch")
</template>
<script type="text/ecmascript-6">
  import EventBus from 'common/eventbus'
  import BaseTable from '@/components/custom/baseTable'
  import {ReceiverURL, ReceiverComponent, SenderToolButtonList} from '../config.toml'
  import {receiverSenderMixin} from '../receiverSenderMixin'
  import {registerComponent} from '@/api/register'

  // 注册全局组件
  registerComponent(ReceiverComponent)

  const RECEIVER_CATEGORY = 2
  export default {
    mixins: [receiverSenderMixin],
    data() {
      return {
        batchDeleteUrl: `${ReceiverURL}/remove`,
        hasTableSelection: true,
        toolbarBtnList: [
          {id: 'deleteChecked', isShow: true}
        ],
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
      EventBus.$on('deleteCheckedClick', this.onDeleteChecked)
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
