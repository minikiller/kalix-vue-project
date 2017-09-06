!> 开发过程中，会对tableToolBar中的操作按钮名称进行自定义的显示，下面以`views/common/receiver/receiver.vue`为例进行说明。
## 模板说明
```js
<template lang="pug">
  keep-alive
    base-table(bizKey="receiver" title='收件列表'
    ref="kalixTable"
    v-bind:tableFields="tableFields"
    v-bind:targetURL="targetURL"
    v-bind:formModel="formModel"
    v-bind:formRules="formRules"
    v-bind:bizDialog="bizDialog"
    v-bind:btnList="btnList"
    v-bind:dictDefine="dictDefine"
    v-bind:customRender="customRender"
    v-on:tableSelectionChange="onTableSelectionChange"
    v-bind:toolBarbtnList="toolBarbtnList"
    v-bind:hasTableSelection="hasTableSelection"
    v-bind:customToolBar="customToolBar"
    bizToolBar="CommonReceiverTableToolBar"
    bizSearch="CommonReceiverSearch")
</template>
```
其中 `v-bind:toolBarbtnList="toolBarbtnList" v-bind:customToolBar="customToolBar"` 即为自定义ToolBar操作按钮的声明。
## 代码说明
> toolBarbtnList “删除选中”按钮
```js
  toolBarbtnList: [
    {id: 'deleteChecked', icon: 'icon-delete', title: '删除选中', isShow: true}
  ],
```
> customTableTool 为点击“deleteChecked”按钮的执行代码，写在 mixin 文件里
```js
    customToolBar(btnId) {
      switch (btnId) {
        case 'deleteChecked':
          this.onDeleteChecked()
          break
      }
    }
```
