<template lang="pug">
  div.mainwork
    el-row(:gutter="20")
      el-col(:span="8" v-for="item in mainWorkList" v-bind:key="item.id")
        el-card(class="box-card")
          div(slot="header" class="clearfix")
            span.icon-wrapper
              i.x-title-icon.x-title-icon-default-framed(v-bind:class="item.icon")
            span(style="line-height: 36px;") {{item.name}}
          div(class="text item") {{'列表内容 ' + item.description }}
            el-button(style="float: right;" type="primary") 查看
            el-button(style="float: right;" type="primary") 申请
</template>

<script type="text/ecmascript-6">
  import {WorkflowMainWorkURL} from '../config.toml'

  let detailURL = '/camel/rest/categorys/getType?category='
  export default {
    mounted() {
      this.getData()
    },
    methods: {
      getData() {
        let _data = {
          page: 1,
          start: 0,
          limit: 200
        }
        this.axios.get(WorkflowMainWorkURL, {
          params: _data
        }).then(response => {
          this.mainWorkList = response.data
          this.mainWorkList.forEach((item) => {
            this.axios.get(detailURL + item.key, {
              params: _data
            }).then(res => {
              item.details = res.data.data
              console.log(this.mainWorkList)
            })
          })
        })
      }
    },
    data() {
      return {
        mainWorkList: []
      }
    }
  }
</script>

<style>
  .icon-wrapper {

    display: inline-block;
    background-position: center;
    padding-right: 6px;
    font-size: 24px;

  }

  .mainwork {
    padding: 20px;
  }

  .el-col {
    margin-bottom: 20px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
  }
</style>

