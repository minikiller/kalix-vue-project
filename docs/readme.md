# baseTable
## props
> buttonPermissionPrefix

table中tool的按钮组件认证前缀,为空时候，不校验权限

## data

#  baseAttachmentDialog 附件管理对话框
> 介绍

该组件为全局加载
> 使用

在需要附件管理的组件 config.toml 文件里 加入一下代码即可
```
[[ToolButtonList]]
  id = "attachment"
  title = "附件管理"
  isShow = true
  isPermission = true
```

## 对 baseTable 的修改
> 介绍

为了能够实现绑定列值对应的数据字典名称增加 props 传入函数 restructureFunction 默认值 null。

> 使用

在 getData() 函数的 this.$http.get().then() 返回查询到 tableData 以后增加以下代码，替换 tableData 对应的列的键为相应的名称
```
if (this.restructureFunction) {
  this.restructureFunction(this.tableData)
}
```

## 对 teacher.vue 的修改
> 介绍

为了能够支持 baseTable 的”绑定列值对应的数据字典名称“功能

> 使用

1.创建 baseTable 对应的 Key Value 重构函数 dataRestucture
```
dataRestucture(_data) {
  let _keyObj = dictKeyObject(`RESEARCH-DICT-KEY`, 'value', 'label')
  _data.forEach(function (e) {
    if (_keyObj) {
      e.positionalTitles = _keyObj[e.positionalTitles]
    }
  })
}
```
2.将 dataRestucture 通过 v-bind:restructureFunction="dataRestucture" 传入 baseTable
