<!--
描述：basetree2 树形控件
     使用场景：如选取组织机构树等树形表结构数据时，可以使用该控件
     使用方法见docs/component/tree.md
开发人：hqj
开发日期：2017年8月28日
-->

<template lang="pug">
  div.block
    el-cascader(v-bind:options="treeData" v-bind:props="defaultProps" v-bind:show-all-levels="false"
    v-model="selectedOptions" change-on-select clearable v-bind:disabled="disabled"
    v-on:change="handleChange")
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      treeDataURL: {
        default: ''
      },
      value: null,
      isAll: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        treeData: [],
        defaultProps: {
          label: 'name',
          value: 'id',
          children: 'children'
        },
        selectedOptions: []
      }
    },
    mounted() {
      this.fentch()
    },
    watch: {
      value(newValue) {
        if (!newValue) {
          console.log('[BaseTree2 newValue]', newValue)
          this.selectedOptions = []
        }
      }
    },
    computed: {},
    methods: {
      // 组件初始化
      fentch() {
        this.getData()
      },
      // 获取数据
      getData() {
        if (!this.treeDataURL) {
          return
        }
        let url = this.treeDataURL + '?isAll=' + this.isAll
        this.axios.request({
          method: 'GET',
          url: url,
          params: {}
        }).then(res => {
          // let obj = response.data
          // // 如果根节点id=-1,去掉根节点
          // if (obj.id === -1) {
          //   this.treeData = obj.children
          // } else {
          //   this.treeData.push(obj)
          // }
          this.treeData = res.data.children

          // 处理子节点children标签为空的数据,移除children标签
          this.dealWithNullChildren(this.treeData)
        })

        // 获取指定机构id的父节点路径
        if (this.value) {
          let treeParentPathURL = this.treeDataURL + '/' + this.value + '/parentpath'
          this.axios.request({
            method: 'GET',
            url: treeParentPathURL,
            params: {}
          }).then(res => {
            this.selectedOptions = JSON.parse('[' + res.data + ']')
          })
        }
      },
      dealWithNullChildren(array) {
        if (array && array.length > 0) {
          for (let i = 0; i < array.length; i++) {
            if (array[i].children) {
              if (array[i].children.length === 0) {
                delete array[i].children
              } else {
                this.dealWithNullChildren(array[i].children)
              }
            }
          }
        }
      },
      handleChange(value) {
        this.$emit('nodeChange', value)
        let treeId = value.slice()
        treeId = treeId.pop() * 1
        this.$emit('input', treeId)
      }
    }
  }
</script>
