<template lang="pug">
  div
    el-form-item(v-if="isView" label="类型" prop="type")
      el-input(v-model="formModel.type" v-bind:readonly="isView" auto-complete="off")
    el-form-item(v-else label="类型" prop="type")
      el-select(v-model="formModel.type" v-on:visible-change="visibleChange")
        el-option(v-for="item in formModel.types" v-bind:key="item.name" v-bind:label="item.name" v-bind:value="item.name")
    el-form-item(label="标签名" prop="label")
      input(type="hidden" v-model="formModel.id")
      el-input(v-model="formModel.label" placeholder="请输入标签名" v-bind:readonly="isView" auto-complete="off")
    el-form-item(label="备注")
      el-input(v-model="formModel.description" v-bind:readonly="isView" type="textarea" v-bind:rows="3" placeholder="请输入内容")
</template>

<script type="text/ecmascript-6">
  import {ScheduleDictsTypesListURL} from 'config/global.toml'

  const DIALOG_FORM_TYPES_KEY = 'ScheduleDictDialogFormTypes'

  export default {
    name: 'scheculedict-form',
    props: {
      formModel: {
        type: Object
      },
      parentRefs: {
        type: Object
      },
      parentRefName: {
        type: String,
        default: 'kalixDialog'
      }
    },
    data() {
      return {
        // 对话框表单
        isView: false
      }
    },
    mounted() {
//      console.log(this.$parent.$parent.formModel)
//      this._getTypes()
    },
    updated() {
    },
    methods: {
      init(isView = false) {
        this.isView = isView
      },
      visibleChange() {
        this._getTypes()
      },
      _getTypes() {
        // 加载类型选项
        let that = this
        if (sessionStorage.getItem(DIALOG_FORM_TYPES_KEY)) {
          that.formModel.types = JSON.parse(sessionStorage.getItem(DIALOG_FORM_TYPES_KEY))
          return
        }
        let _data = {
          query: '',
          page: 1,
          start: 0,
          limit: 25
        }
        this.$http.get(ScheduleDictsTypesListURL, {
          params: _data
        }).then(response => {
          that.formModel.types = response.data
          sessionStorage.setItem(DIALOG_FORM_TYPES_KEY, JSON.stringify(response.data))
        })
      },
      formCancel() {
        console.log('formCancel')
      },
      dialogFormCancel() {
        this.parentRefs[this.parentRefName].close()
      }
    }
  }

</script>

<style scoped lang='stylus' type='text/stylus'>
</style>
