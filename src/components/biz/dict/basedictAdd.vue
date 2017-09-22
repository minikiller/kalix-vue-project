<!--
描述：我的首页-数据字典-新增组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="dict" ref="kalixBizDialog" v-bind:formModel.sync="formModel" v-bind:targetURL="dictTargetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="类型" prop="type" v-bind:rules="rules.type")
        el-select(v-model="formModel.type" v-on:visible-change="visibleChange")
          el-option(v-for="item in items" v-bind:key="item.name" v-bind:label="item.name" v-bind:value="item.name")
      el-form-item(label="标签名" prop="label" v-bind:rules="rules.label")
        input(type="hidden" v-model="formModel.id")
        el-input(v-model="formModel.label" placeholder="请输入标签名" auto-complete="off")
      el-form-item(label="备注")
        el-input(v-model="formModel.description" type="textarea" v-bind:rows="3" placeholder="请输入内容")
</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {FormModel} from './model.toml'

  export default {
    methods: {
      init(options) {
        console.log(options)
        this.dictTargetURL = options.targetURL
        this.dictTypesListURL = options.dictTypesListURL
        this.dictBizKey = options.bizKey
      },
      visibleChange() {
        // 加载类型选项
//        let that = this
//        if (sessionStorage.getItem(DIALOG_FORM_TYPES_KEY)) {
//          that.formModel.types = JSON.parse(sessionStorage.getItem(DIALOG_FORM_TYPES_KEY))
//          return
//        }
        let _data = {
          query: '',
          page: 1,
          start: 0,
          limit: 25
        }
        this.$http.get(this.dictTypesListURL, {
          params: _data
        }).then(response => {
          console.log(response.data)
          this.items = response.data
//          sessionStorage.setItem(DIALOG_FORM_TYPES_KEY, JSON.stringify(response.data))
        })
      }
    },
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        dictTypesListURL: '',
        dictTargetURL: '',
        dictBizKey: '',
        rules: {
          type: [{required: true, message: '请输入标题', trigger: 'blur'}],
          label: [{required: true, message: '请输入标签名', trigger: 'blur'}]
        },
        items: []
      }
    },
    created() {
    },
    components: {
      KalixDialog: Dialog
    }
  }
</script>
