<!--
描述：我的首页-发件箱组件
开发人：桑杨
开发日期：2017年8月29日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="note" title='发件列表'
    v-bind:tableFields="tableFields"
    v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel"
    v-bind:formRules="formRules"
    v-bind:bizDialog="bizDialog"
    v-bind:btnList="btnList"
    v-bind:restructureFunction="dataRestucture"
    bizSearch="CommonSenderSearch")
</template>
<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import Vue from 'vue'
  import {DictKeyValueObject} from 'common/keyValueObject'
  import {SenderURL, SenderComponent, ToolButtonList} from '../config.toml'

  // 注册全局组件
  SenderComponent.forEach((item) => {
    console.log('[kalix]-[research] registry name is: ' + item.name, '; registry path is: ' + item.path)
    Vue.component(item.name, require('' + item.path))
  })

  export default {
    data() {
      return {
        btnList: ToolButtonList,
        targetURL: SenderURL,
        tableFields: [
          {prop: 'receiverNames', label: '收件人'},
          {prop: 'categoryName', label: '消息类别'},
          {prop: 'content', label: '消息主题'},
          {prop: 'creationDate', label: '发布时间'}
        ],
        bizDialog: [
          {id: 'view', dialog: 'CommonNoteView'}
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
      dataRestucture(_data) {
        //  获取 对应的键值对 对象
        let _keyObj = DictKeyValueObject(`COMMON-DICT-KEY`, '消息类别')
        _data.forEach(function (e) {
          //  检测 _keyObj 是否存在
          if (_keyObj) {
            // 替换对应的列值
            e.categoryName = _keyObj[e.category]
          }
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
