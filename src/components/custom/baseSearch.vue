<!--
描述：table上方查询组件的二次封装
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  div.kalix-search
    div.kalix-search-hd
      i.iconfont.icon-query
      | {{title}}
    div.kalix-search-bd
      el-form.search-container(ref="searchForm" v-bind:rules="formRules" v-bind:model="form" v-bind:inline="true")
        slot(name="searchFormSlot")
          el-form-item(v-for="item in searchFields" v-bind:label="item.label" v-bind:prop="item.prop" v-bind:key="item.prop")
            el-select(v-if="item.type==='select'" v-model="form[item.prop]")
              el-option(v-for="option in item.options" v-bind:key="option.value" v-bind:label="option.label" v-bind:value="option.value")
            el-input-number(v-else-if="item.type==='number'" v-model="form[item.prop]")
            el-input(v-else v-model="form[item.prop]")
        el-form-item
          el-button(type="primary" v-on:click="onSubmitClick")
            i.iconfont.icon-query
            | 查询
          el-button(type="success" v-on:click="onResetClick")
            i.iconfont.icon-reset
            | 重置
</template>

<script>
  import {strToUnicode} from 'common/unicode-convert'
  import {isEmptyObject} from 'common/util'
  import EventBus from 'common/eventbus'
  import {ON_SEARCH_BUTTON_CLICK} from './event.toml'

  export default {
    activated() {
      console.log('[kalix] base search ' + '  is activated')
    },
    deactivated() {
      console.log('[kalix] base search ' + '  is deactivated')
    },
    data() {
      return {
        form: {},
        isSearch: false
      }
    },
    props: {
      searchForm: {
        type: Object
      },
      title: {
        type: String,
        default: ''
      },
      formRules: {}, // 查询校验规则
      searchFields: { // 搜索查询的字段
        type: Array
      }
    },
    created() {
      this._currentForm()
    },
    mounted() {
    },
    methods: {
      _currentForm() {
        if (!isEmptyObject(this.searchForm)) {
          this.form = this.searchForm
        }
      },
      // 提交查询
      onSubmitClick() {
        this._currentForm()
        this.$refs.searchForm.validate((valid) => {
          if (valid) {
//            todo: 增加查询组成json串
            let requestDatas = []
            for (let item in this.form) {
              const itemVal = this.form[item]
              if (itemVal.length > 0) {
                const dateType = typeof itemVal
                console.log(item, itemVal)
                let val = null
                if (dateType === 'string' && itemVal.length) {
                  val = strToUnicode(itemVal)
                } else {
                  val = itemVal
                }
                requestDatas.push(`{"%${item}%": "` + val + `"}`)
              }
            }
            if (requestDatas.length > 0) {
              this.isSearch = true
              EventBus.$emit(ON_SEARCH_BUTTON_CLICK, {jsonStr: requestDatas.join(',')})
            }
          } else {
            console.log('ERR')
          }
        })
      },
      // 重置搜索框
      onResetClick() {
        this.$refs.searchForm.resetFields()
        if (this.isSearch) {
          EventBus.$emit(ON_SEARCH_BUTTON_CLICK, {})
          this.isSearch = false
        }
      }
    },
    components: {},
    computed: {},
    watch: {}
  }

</script>

<style scoped lang='stylus' type='text/stylus'>
  @import "~@/assets/stylus/color.styl"
  .kalix-search
    margin 5px
    .kalix-search-hd
      background-color bg-color_1
      color txt-color_1
      line-height 44px
      padding 0 15px
      text-align left
    .kalix-search-bd
      border 1px solid border-color_1
      font-size 0
      padding 5px 15px
      text-align left
      .search-container
        display flex

    .el-button
      .iconfont
        font-size 14px
</style>
