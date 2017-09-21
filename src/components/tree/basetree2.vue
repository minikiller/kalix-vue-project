<!--
描述：basetree2 树形控件
开发人：hqj
开发日期：2017年8月28日
-->

<template lang="pug">
  div.block
    el-cascader(placeholder="试试搜索：吉林动画学院" v-bind:options="data2" v-bind:props="defaultProps"
    filterable change-on-select :show-all-levels="false" v-model="selectedOptions" v-on:change="handleChange")
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import {orgURL} from 'config/global.toml'

  export default {
    mounted () {
      this.fentch()
    },

    methods: {
      // 组件初始化
      fentch () {
        // 获取机构数据
        let getOrgURL = orgURL + '?isAll=' + this.isAll
        Vue.axios.get(getOrgURL).then((response) => {
          let obj = response.data
          // 如果根节点id=-1,去掉根节点
          if (obj.id === -1) {
            this.data2 = obj.children
          } else {
            this.data2.push(obj)
          }
          // 处理子节点children标签为空的数据,移除children标签
          this.dealWithOrgsArray(this.data2)
          console.log('optionOrgTree is ', this.data2)
        })

        // 获取指定机构id的父节点路径
        let orgParentPathURL = orgURL + '/' + this.value + '/parentpath'
        Vue.axios.get(orgParentPathURL).then((response) => {
          this.selectedOptions = JSON.parse('[' + response.data + ']')
        })
      },
      handleChange (value) {
        this.$emit('nodeChange', value)
        let orgId = value.slice()
        orgId = orgId.pop() * 1
        console.log(orgId)
        this.$emit('input', orgId)
      },
      dealWithOrgsArray (orgarray) {
        if (orgarray && orgarray.length > 0) {
          for (let i = 0; i < orgarray.length; i++) {
            if (orgarray[i].children) {
              if (orgarray[i].children.length === 0) {
                delete orgarray[i].children
              } else {
                this.dealWithOrgsArray(orgarray[i].children)
              }
            }
          }
        }
      }
    },

    data () {
      return {
        data2: [],
        defaultProps: {
          label: 'name',
          value: 'id',
          children: 'children'
        },
        selectedOptions: []
      }
    },
    props: {
      value: {
        type: Number
      },
      isAll: {
        type: Boolean,
        default: false
      }
    },
    watch: {},
    computed: {}
  }
</script>
