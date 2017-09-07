<template lang="pug">
    div.mainwork
      el-row(:gutter="20")
        el-col(:span="8")
          el-card(class="box-card")
            div(slot="header" class="clearfix")
              span(style="line-height: 36px;") 卡片名称
            div(v-for="o in 4" :key="o" class="text item") {{'列表内容 ' + o }}
              el-button(style="float: right;" type="primary") 操作按钮
        el-col(:span="8")
          el-card(class="box-card")
            div(slot="header" class="clearfix")
              span(style="line-height: 36px;") 卡片名称
            div(v-for="o in 4" :key="o" class="text item") {{'列表内容 ' + o }}
              el-button(style="float: right;" type="primary") 操作按钮
        el-col(:span="8")
          el-card(class="box-card")
            div(slot="header" class="clearfix")
              span(style="line-height: 36px;") 卡片名称
            div(v-for="o in 4" :key="o" class="text item") {{'列表内容 ' + o }}
              el-button(style="float: right;" type="primary") 操作按钮
        el-col(:span="8")
          el-card(class="box-card")
            div(slot="header" class="clearfix")
              span(style="line-height: 36px;") 卡片名称
            div(v-for="o in 4" :key="o" class="text item") {{'列表内容 ' + o }}
              el-button(style="float: right;" type="primary") 操作按钮
        el-col(:span="8")
          el-card(class="box-card")
            div(slot="header" class="clearfix")
              span(style="line-height: 36px;") 卡片名称
            div(v-for="o in 4" :key="o" class="text item") {{'列表内容 ' + o }}
              el-button(style="float: right;" type="primary") 操作按钮
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style>
  .mainwork{
    padding: 20px;
  }
  .el-col{
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

