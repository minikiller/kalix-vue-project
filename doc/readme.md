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
