<template lang="pug">
  div.kalix-article
    keep-alive
      el-row.orguser-row(:gutter="0")
        el-col.orguser-col(:span="8" style="padding:8px 0 8px 8px;")
          kalix-org-tree(treeTitle="机构列表" v-on:orgTreeClick="onOrgTreeClick")
        el-col.orguser-col(:span="16")
          kalix-base-table.orguser-wrapper(bizKey='orguser' title='用户列表'
            ref="kalixOrgUserTable")
</template>

<script type="text/ecmascript-6">
  import BaseTable from '@/components/custom/baseTable'
  import OrgTree from '@/components/biz/tree/OrgTree'
  export default {
    components: {
      KalixBaseTable: BaseTable,
      KalixOrgTree: OrgTree
    },
    methods: {
      onOrgTreeClick(data) {
      }
    }
  }
</script>

<style scoped lang="stylus" type="text/stylus">
  @import "~@/assets/stylus/baseTable"
  @import "~@/assets/stylus/color.styl"
  .kalix-article
    position relative
    height 100%
    overflow hidden
    box-sizing border-box
    .kalix-search,
    .kalix-wrapper
      height 100%
      margin 0
      box-sizing border-box
    .kalix-search
      margin-top 0 !important
    .kalix-wrapper
      margin-bottom 0 !important
      position relative
      top 0
      .kalix-wrapper-hd
        height 44px
      .kalix-wrapper-bd
        position absolute
        top 44px
        bottom 0
        left 0
        width 100%
        box-sizing border-box
        padding 12px
        .kalix-table-container
          position relative
          top 0
          height 100%
          margin 0
  .orguser-row
    height 100%
    .orguser-col
      height 100%
      box-sizing border-box
  .orguser-wrapper
    margin 8px 0
    .kalix-wrapper
      bottom 0 !important
</style>
