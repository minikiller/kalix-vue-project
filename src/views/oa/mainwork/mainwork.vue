<template lang="pug">
  div.mainwork
    el-row(:gutter="20")
      el-col(:span="8" v-for="item in workList" v-bind:key="item.id")
        el-card(class="box-card")
          div(slot="header" class="clearfix")
            span.icon-wrapper
              i.x-title-icon.x-title-icon-default-framed(v-bind:class="item.icon")
            span(style="line-height: 36px;") {{item.name}}
          div.mainwork-item-wrapper
            div(class="s-flex text mainwork-item" v-if="item.details" v-for="itemDetails in item.details")
              div.s-flex_item
                div.details-name {{itemDetails.name}}
                div.details-description {{itemDetails.description}}
              div
                el-button(type="primary") 查看
                el-button(type="primary") 申请
</template>

<script type="text/ecmascript-6">
  import {WorkflowMainWorkURL} from '../config.toml'

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
          this.mainWorkListMax = this.mainWorkList.length - 1
          this.getDetails(0)
        })
      },
      getDetails(i) {
        let _data = {page: 1, start: 0, limit: 200}
        let detailURL = '/camel/rest/categorys/getType?category='
        this.axios.get(detailURL + this.mainWorkList[i].key, {
          params: _data
        }).then(res => {
          this.mainWorkList[i].details = res.data.data
          if (i < this.mainWorkListMax) {
            this.getDetails(++i)
          } else {
            this.workList = this.mainWorkList
          }
        })
      }
    },
    data() {
      return {
        workList: []
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

  .details-name {
    font-size: 15px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .details-description {
    line-height: 1.5;
    color: #666666;
  }

  .mainwork {
    padding: 20px;
  }

  .mainwork-item-wrapper {
    margin: 0 -20px;
    height: 200px;
    padding: 0 20px;
    overflow: auto;
  }

  .el-col {
    margin-bottom: 20px;
  }

  .text {
    font-size: 14px;
  }

  .mainwork-item {
    position: relative;
    padding-bottom: 20px;
    margin-top: 20px;
  }

  .mainwork-item:first-child {
    margin-top: 0;
  }

  .mainwork-item:after {
    position: absolute;
    display: block;
    content: '';
    left: 0;
    right: 0;
    bottom: 0;
    height: 1px;
    background-color: #d1dbe5;
  }

  .mainwork-item:last-child:after {
    display: none;
  }
  .el-card__header{
    padding: 5px 20px;
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

