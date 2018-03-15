<!--
描述：我的首页-收件箱组件
开发人：桑杨
开发日期：2017年8月30日
-->
<!--v-bind:tableFields="tableFields"-->
<template lang="pug">
  keep-alive
    base-table(v-bind:bizKey="bizKey" title='收件列表'
    ref="kalixTable"
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
    v-bind:isBeforeView="true"
    v-bind:isAfterView="true"
    v-bind:dialogOptions="dialogOptions"
    v-bind:deleteAllUrl="batchDeleteUrl"
    v-on:handleAfterView="handleAfterView"
    v-on:afterDialogClose="handleAfterDialogClose"
    bizToolBar="CommonReceiverTableToolBar"
    bizSearch="CommonReceiverSearch")
      template(slot="tableColumnSlot")
        el-table-column(prop="senderName" label="发件人" align="center" )
        el-table-column(prop="categoryName" label="消息类别" align="center")
        el-table-column(prop="title" label="消息主题" align="center")
        el-table-column(prop="creationDate" label="发布时间" )
        el-table-column(label="是否已读" align="center")
          template(slot-scope="scope")
            span {{scope.row.read?'已读':'未读'}}
</template>
<script type="text/ecmascript-6">
  // import EventBus from 'common/eventbus'
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
        bizKey: 'receiver',
        batchDeleteUrl: `${ReceiverURL}/remove`,
        hasTableSelection: true,
        toolbarBtnList: [
          {id: 'add', title: '写消息', isShow: true, icon: 'icon-add'},
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
        dialogOptions: {
          row: {}
        },
        // tableFields: [
        //   {prop: 'senderName', label: '发件人'},
        //   {prop: 'categoryName', label: '消息类别'},
        //   {prop: 'title', label: '消息主题'},
        //   {prop: 'creationDate', label: '发布时间'},
        //   {prop: 'read', label: '是否已读'}
        //
        // ],
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
      // EventBus.$on('deleteCheckedClick', this.onDeleteChecked)
    },
    methods: {
      customRender(_data) {
        _data.forEach(function (e) {
          e.isRead = e.read ? '已读' : '未读'
        })
      },
      handleAfterView(row) {
        if (row.read === false) {
          row.read = true
          // row.isRead = '是'
          this.axios.request({
            method: 'PUT',
            url: `${this.targetURL}/${row.id}`,
            data: row,
            params: {}
          }).then(response => {
          })
        }
      },
      handleAfterDialogClose(bizKey, closeParam) {
        if (closeParam) {
          this.$refs.kalixTable.getData()
        }
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
