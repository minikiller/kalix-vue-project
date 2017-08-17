<!--
描述：系统导航组件
开发人：桑杨
开发日期：2017年7月14日
-->
<template lang="pug">
  div.treeList(:class="{'small':menuChk}")
    ul.bd
      li(v-for="item in treeData")
        div.s-flex.tit(@click="showTree(item,$event)")
          div.s-flex_item
            i.tit_icon(:class="bindClass(item.iconCls)")
            span.txt {{item.text}}
          div.arrow
            i(:class="showIcon(item.isShow)")
        el-collapse-transition
          div.mn(v-show="setShow(item)")
            ul
              li(v-for="item in item.children")
                router-link.tit(tag="div" v-bind:to="{path:'/'+item.routeId}")
                  i.tit_icon(:class="bindClass(item.iconCls)")
                  | {{item.text}}
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import Cache from 'common/cache'
  import {cacheTime, systemApplicationsBaseURL} from 'config/global.toml'

  export default {
    props: {
      menuChk: {
        default: false
      }
    },
    data() {
      return {
        name: 'kalixNav',
        currApp: '',
        currFun: '',
        activeName: '1',
        obj: {'name': 'aa'},
        treeData: [],
        clickedNode: null
      }
    },
    mounted() {
      this.fetchdata()
    },
    watch: {'$route': 'fetchdata'},
    methods: {
      fetchdata() {
        let d = new Date()
        let cd = d.getTime()
        let treeListData = {}
        this.currApp = this.$route.params.app || 'admin'
        this.currFun = this.$route.params.fun
        if (Cache.get('treeListData')) {
          treeListData = JSON.parse(Cache.get('treeListData'))
        }
        if (treeListData.createDate && (treeListData.createDate - cd) < cacheTime && treeListData[this.currApp]) {
          this.treeData = treeListData[this.currApp]
        } else {
          const data = {_dc: cd, node: 'root'}
          Vue.axios({
            url: systemApplicationsBaseURL + this.currApp,
            method: 'get',
//            headers: {'AccessToken': accessToken, JSESSIONID: userToken},
            params: data
          }).then(response => {
            let nowDate = new Date()
            if (response.data.code !== 401) {
              this.treeData = response.data
              this.treeData.forEach(function (e, i) {
                Vue.set(e, 'isShow', false)
              })
              treeListData[this.currApp] = this.treeData
              treeListData.createDate = nowDate.getTime()
              Cache.save('treeListData', JSON.stringify(treeListData))
            }
          })
        }
      },
      setShow(item) {
        console.log(this.clickedNode === item)
        if (this.clickedNode === item) {
          let routeName = this.currApp + '/' + this.currFun
          if (item.children) {
            let temp = item.children.find(function (e) {
              return e.routeId === routeName
            })
            return temp != null || item.isShow
          } else {
            return false
          }
        } else {
          return item.isShow
        }
      },
      bindClass(e) {
        return e
      },
      showTree(e) {
        this.clickedNode = e
        this.treeData.forEach((item) => {
          if (item !== e) {
            item.isShow = false
          } else {
            item.isShow = !item.isShow
          }
        })
      },
      showIcon(e) {
        return e ? 'el-icon-caret-bottom' : 'el-icon-caret-right'
      }
    },
    components: {}
  }
</script>

<style scoped lang="stylus">
  @import "navigater.styl"
</style>
