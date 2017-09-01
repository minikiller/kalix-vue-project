!> 开发过程中，经常会对table中的数据进行自定义的显示，下面以`views/common/receiver/receiver.vue`为例进行说明。
## 模板说明
```js
<template lang="pug">
  keep-alive
    base-table(bizKey="receiver" title='收件列表'
    v-bind:tableFields="tableFields"
    v-bind:targetURL="targetURL"
    v-bind:formModel.sync="formModel"
    v-bind:formRules="formRules"
    v-bind:bizDialog="bizDialog"
    v-bind:btnList="btnList"
    v-bind:dictDefine="dictDefine"
    v-bind:customRender="customRender"
    bizSearch="CommonReceiverSearch")
</template>
```
其中 `v-bind:customRender="customRender"` 即为自定义数据列的声明。

## 代码说明
```js
  export default {
    methods: {
          customRender(_data) {
            _data.forEach(function (e) {
              e.isRead = e.read ? '是' : '否'
            })
          }
        }
```
receiver业务数据中，有一个字段是read，类型为boolean型，用于显示该信息是否阅读过。通过循环新增isRead字段，就把read的内容翻译成了是否。
