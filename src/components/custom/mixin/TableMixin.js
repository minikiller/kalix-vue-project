const MAX_TABLE_HEIGHT = 350
export const TableMixin = {
  props: {
    targetURL: '',
    jsonStr: '',
    stripe: {
      default: true
    },
    tableHeight: {
      default: MAX_TABLE_HEIGHT
    },
    isFixedColumn: {
      type: Boolean,
      default: false
    },
    highlightCurrentRow: {
      default: false
    },
    tableFields: {   //  数据列表的列名
      type: Array
    },
    btnList: {   //  table中按钮数组
      type: Array,
      required: true
    },
    dictDefine: {  // 数据字典定义
      type: Array
    },
    customRender: { // 对table的数据进行自定义的修饰
      type: Function
    },
    customTableTool: { // 对table的操作按钮进行自定义的操作
      type: Function
    },
    customToolBar: { // 对 ToolBar 的操作按钮进行自定义的操作
      type: Function
    },
    tableRowClassName: { // 对table的一行数据进行样式定制
      type: Function
    },
    deleteAllUrl: {
      type: String,
      default: ''
    },
    customToolbarClickEvents: {
      type: Object,
      default: () => {
        return {}
      }
    },
    buttonPermissionPrefix: { //  table中tool的按钮组件认证前缀
      type: String,
      default: ''   // 为空时候，不校验权限
    },
    bizKey: {  // 主鍵
      type: String,
      required: true
    }
  },
  methods: {}
}
