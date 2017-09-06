!> 开发过程中，会对table中的一行数据进行自定义的显示，下面以`views/oa/processhistory/processhistory.vue`为例进行说明。
## 模板说明
```js
<template lang="pug">
  keep-alive
    base-table(:isShowToolBar="isShowToolBar" bizKey="myprocesshistory" title='我的流程列表'
    v-bind:tableFields="tableFields"
    v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel"
    v-bind:bizDialog="bizDialog"
    bizSearch="OaProcessHistorySearch"
    v-bind:tableRowClassName="tableRowClassName"
    v-bind:btnList="btnList")
</template>
```
其中 `v-bind:tableRowClassName="tableRowClassName""` 即为自定义一行数据的声明。
## 代码说明
> tableRowClassName 方法定义
```js
methods: {
      tableRowClassName(row, index) {
        if (row.status === '结束') {
          return 'finish-row'
        } 
        return ''
      }
    },
```
> 样式定义
```stylus
  .el-table
    .finish-row
      td
        background-color #c9e5f5 !important
```
