<template lang="pug">
  kalix-dialog.user-add(bizKey="scheduleDict" ref="kalixBizDialog" v-bind:form-model="formModel" v-bind:targetURL="targetURL")
    div.el-form(slot="dialogFormSlot")
      el-form-item(label="类型" prop="type" v-bind:rules="rules.type")
        el-select(v-model="formModel.type")
          el-option(v-for="item in types" v-bind:key="item.name" v-bind:label="item.name" v-bind:value="item.name")
      el-form-item(label="标签名" prop="label" v-bind:rules="rules.label")
        el-input(v-model="formModel.label" placeholder="请输入标签名" auto-complete="off")
      el-form-item(label="备注")
        el-input(v-model="formModel.description" type="textarea" v-bind:rows="3" placeholder="请输入内容")
</template>
<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import {ScheduleDictsURL, ScheduleDictsTypesListURL} from '../config.toml'

  const DIALOG_FORM_TYPES_KEY = 'ScheduleDictDialogFormTypes'

  export default {
    props: {
      formModel: {
        type: Object,
        required: true
      },
      formRules: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        rules: {
          type: [{required: true, message: '请输入类型', trigger: 'blur'}],
          label: [{required: true, message: '请输入 标签名', trigger: 'blur'}]
        },
        types: [],
        targetURL: ScheduleDictsURL
      }
    },
    created() {
      console.log('%cthis.formRules.type:', 'color: #20a0ff', this.formRules.type)
      console.log(`%c[scheduledictAdd.vue created] this.formModel:`, 'color: #20a0ff', this.formModel)
      this._getTypes()
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      visibleChange() {
      },
      _getTypes() {
        // 加载类型选项
        let that = this
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
        this.$http.get(ScheduleDictsTypesListURL, {
          params: _data
        }).then(response => {
          that.types = response.data
          sessionStorage.setItem(DIALOG_FORM_TYPES_KEY, JSON.stringify(response.data))
        })
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
</style>
