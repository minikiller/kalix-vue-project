<template lang="pug">
  div.search
    div.hd
      i.iconfont.icon-query
      | {{title}}
    div.bd
      el-form.search-container(ref="searchForm" v-bind:rules="formRules" v-bind:model="form" v-bind:inline="true")
        el-form-item(v-for="item in filters" v-bind:label="item.label" v-bind:prop="item.prop")
          el-select(v-if="item.type==='select'" v-model="form[item.prop]")
            el-option(v-for="option in item.options" v-bind:key="option.value" v-bind:label="option.label" v-bind:value="option.value")
          el-input-number(v-else-if="item.type==='number'" v-model="form[item.prop]")
          el-input(v-else v-model="form[item.prop]")
        el-form-item
          el-button(type="primary" v-on:click="onSubmit")
            i.iconfont.icon-query
            | 查询
          el-button(type="success" v-on:click="onReset")
            i.iconfont.icon-reset
            | 重置
</template>

<script>
  //  import EventBus from 'common/eventbus'
  import {strToUnicode} from 'common/unicode-convert'

  export default {
    data() {
      return {
        form: {}
      }
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      formRules: {},
      filters: {
        type: Array
      }
    },
    mounted() {

    },
    methods: {
      // 提交查询
      onSubmit() {
        this.$refs.searchForm.validate((valid) => {
          if (valid) {
//            todo: 增加查询组成json串
            let requestDatas = []
            for (let item in this.form) {
              const itemVal = this.form[item]
              const dateType = typeof itemVal

              let val = null
              if (dateType === 'string' && itemVal.length) {
                val = strToUnicode(itemVal)
              } else {
                val = itemVal
              }
              requestDatas.push(`{"%${item}%": "` + val + `"}`)
            }
            this.$emit('onDataRefresh', {jsonStr: requestDatas.join(',')})
          } else {
            console.log('ERR')
          }
        })
      },
      // 重置搜索框
      onReset() {
        this.$refs.searchForm.resetFields()
        this.$emit('onDataRefresh', {})
      }
    },
    components: {},
    computed: {}
  }
</script>


<style scoped lang='stylus' type='text/stylus'>
  @import "../../assets/stylus/color.styl"

  .search
    margin 5px
    .hd
      background-color bg-color_1
      color txt-color_1
      line-height 44px
      padding 0 15px
      text-align left

    .bd
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
