<template lang="pug">
  div.search
    div.hd
      i.iconfont.icon-query
      | {{title}}
    div.bd
      el-form.search-container(ref="searchForm" v-bind:rules="formRules" v-bind:model="formModel" v-bind:inline="true")
        slot(name="searchItem")
        el-form-item
          el-button(type="primary" v-on:click="onSubmit")
            i.iconfont.icon-query
            | 查询
          el-button(type="success" v-on:click="onReset")
            i.iconfont.icon-reset
            | 重置
</template>

<script>
  import EventBus from 'common/eventbus'
//  import {strToUnicode} from 'common/unicode-convert'

  export default {
    data() {
      return {}
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      formModel: {},
      formRules: {}
    },
    mounted() {
    },
    methods: {
      // 提交查询
      onSubmit() {
        this.$refs.searchForm.validate((valid) => {
          if (valid) {
//            todo: 增加查询组成json串
//            that.requestData = {jsonStr: '{"%type%": "' + strToUnicode(that.search.form.type) + '"}'}
            EventBus.$emit('onDataRefresh')
            console.log('OK')
          } else {
            console.log('ERR')
          }
        })
      },
      // 重置搜索框
      onReset() {
        this.$refs.searchForm.resetFields()
      }
    },
    components: {},
    computed: {}
  }
</script>

<style lang="scss" type="text/scss">
  @import "../../assets/Scss/Color";

  .search {
    margin: 5px;
    .hd {
      background-color: $bg-color_1;
      color: $txt-color_1;
      line-height: 44px;
      padding: 0 15px;
      text-align: left;
    }
    .bd {
      border: 1px solid $border-color_1;
      font-size: 0;
      padding: 5px 15px;
      text-align: left;
    }

    .el-form-item {
      margin-bottom: 0;
    }
    .el-button {
      .iconfont {
        font-size: 14px;
      }
    }

  }
</style>
