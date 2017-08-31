<!--
描述：我的首页-发件箱组件
开发人：桑杨
开发日期：2017年8月29日
-->
<template lang="pug">
  keep-alive
    base-table(bizKey="sender" title='发件列表'
    v-bind:tableFields="tableFields"
    v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel"
    v-bind:formRules="formRules"
    v-bind:bizDialog="bizDialog"
    v-bind:btnList="btnList"
    v-bind:dictDefine="dictDefine"
    bizSearch="CommonSenderSearch")
</template>
<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import Vue from 'vue'
  import {DictKeyValueObject} from 'common/keyValueObject'
  import {SenderURL, SenderComponent, SenderToolButtonList} from '../config.toml'

  // 注册全局组件
  SenderComponent.forEach((item) => {
    console.log('[kalix]-[research] registry name is: ' + item.name, '; registry path is: ' + item.path)
    Vue.component(item.name, require('' + item.path))
  })

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
//      this.tempFormModel = JSON.stringify(Object.assign({}, this.formModel))
    },
    methods: {
    },
    components: {
      BaseTable
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
