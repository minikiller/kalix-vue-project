<!--
描述：系统应用-用户管理-权限查看组件
开发人：hqj
开发日期：2017年12月12日
-->
<template lang="pug">
  kalix-dialog.user-add(title='权限查看' bizKey="user" ref="kalixBizDialog" v-bind:formModel.sync="formModel" isView)
    div.el-form(slot="dialogFormSlot" style="max-height:550px;min-height:550px;overflow:auto;border: 1px solid #d0d0d0;margin:-30px 0 -20px")
      el-tree.filter-tree(v-bind:data="treeData" v-bind:props="defaultProps" node-key="id" highlight-current
      show-checkbox v-bind:default-checked-keys="checkedKeys" default-expand-all
      v-bind:empty-text="emptyContent"
      ref="baseTree")
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import Dialog from '@/components/custom/baseDialog.vue'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        treeDataURL: '/camel/rest/users',
        treeData: [],
        emptyContent: '数据加载中！',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        checkedKeys: []
      }
    },
    components: {
      KalixDialog: Dialog
    },
    mounted () {
    },
    watch: {
      formModel: {
        handler: 'watchFormModel',
        deep: true
      }
    },
    methods: {
      // 获取数据
      getData() {
        this.treeData = []
        this.checkedKeys = []
        if (!this.treeDataURL) {
          return
        }
        if (!this.formModel.id) {
          return
        }
        let url = this.treeDataURL + '/' + this.formModel.id + '/authorizations'
        this.axios.request({
          method: 'GET',
          url: url,
          params: {}
        }).then(res => {
          if (res.data.children) {
            this.treeData = res.data.children
            // 获取选中节点, 并设置所有节点disable=true
            this.emptyContent = '当前用户没有被授权！'
            this.getCheckedKeys(this.treeData)
          }
        })
      },
      getCheckedKeys(array) {
        if (array && array.length > 0) {
          for (let i = 0; i < array.length; i++) {
            if (array[i].children) {
              array[i].disabled = true
              if (array[i].children.length === 0) {
                // delete array[i].children
                if (array[i].checked) {
                  this.checkedKeys.push(array[i].id)
                }
              } else {
                this.getCheckedKeys(array[i].children)
              }
            }
          }
        }
      },
      watchFormModel(newVal) {
        this.getData()
      }
    }
  }
</script>
