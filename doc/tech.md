## about table tool button
> 1. define button array
```xml
[[ToolButtonList]]
  id = "view"
  type = "text"
  size = "small"
  title = "查看"
[[ToolButtonList]]
  id = "edit"
  type = "text"
  size = "small"
  title = "编辑"
[[ToolButtonList]]
  id = "delete"
  type = "text"
  size = "small"
  title = "删除"
```

> 2. cycle output button
```vue
el-button(v-for="btn in btnList" :key="btn.id" v-on:click="toggle(scope.row,btn.id)"
          :type="btn.type" :size="btn.size") {{btn.title}}
```

> 3. toggle(scope.row,btn.id) should be under methods.
```js
toggle(row, btnId) {
        this.$emit(ON_TABLE_TOOL_CLICK, row, btnId)
      }
```

> 4. parent component will config as :
```js
slot(name="tableToolSlot")
        kalix-table-tool(:btnList="btnList" @onTableToolClick="btnClick")
```

> 5. when we need to custom button:
```
kalix-table-tool(slot="tableToolSlot" :btnList="customBtnList"
  @onTableToolClick="customBtnClick")
```

## register global component by config file
```
import {GlobalComponent} from 'config/global.toml'
GlobalComponent.forEach((item) => {
  console.log('[kalix] registry name is: ' + item.name, '; registry path is: ' + item.path)
  Vue.component(item.name, require('' + item.path))
})
```



