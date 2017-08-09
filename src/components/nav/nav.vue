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
                router-link.tit( tag="div" :to="{path:'/'+item.routeId}")
                  i.tit_icon(:class="bindClass(item.iconCls)")
                  |{{item.text}}
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'
  import Cache from 'common/cache'
  import {cacheTime, systemApplications} from 'config/global.toml'

  export default {
    props: {
      menuChk: {
        default: false
      }
    },
    data() {
      return {
        name: 'kalixNav',
        currName: '',
        currApp: '',
        activeName: '1',
        obj: {'name': 'aa'},
        treeData: []
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
        this.currName = this.$route.params.name || 'admin'
        this.currApp = this.$route.params.app
        if (Cache.get('treeListData')) {
          treeListData = JSON.parse(Cache.get('treeListData'))
        }
        if (treeListData.createDate && (treeListData.createDate - cd) < cacheTime && treeListData[this.currName]) {
          this.treeData = treeListData[this.currName]
        } else {
          const data = {_dc: cd, node: 'root'}
          Vue.axios({
            url: systemApplications[this.currName],
            method: 'get',
//            headers: {'AccessToken': accessToken, JSESSIONID: userToken},
            params: data
          }).then(response => {
            let nowDate = new Date()
            this.treeData = response.data
            this.treeData.forEach(function (e, i) {
              Vue.set(e, 'isShow', false)
            })
            treeListData[this.currName] = this.treeData
            treeListData.createDate = nowDate.getTime()
            Cache.save('treeListData', JSON.stringify(treeListData))
          })
        }
      },
      setShow(item) {
        let routeName = this.currName + '/' + this.currApp
        if (item.children) {
          let temp = item.children.find(function (e) {
            return e.routeId === routeName
          })
          return temp != null || item.isShow
        } else {
          return false
        }
      },
      bindClass(e) {
        return e
      },
      showTree(e) {
        let _item = (this.treeData.filter(function (item) {
          if (item !== e) {
            item.isShow = false
          } else {
            return e
          }
        }))[0]
        e.isShow = !_item.isShow
      },
      showIcon(e) {
        return e ? 'el-icon-caret-bottom' : 'el-icon-caret-right'
      }
    },
    components: {}
  }
</script>

<style scoped lang="stylus">
  @import "./nav.styl"
</style>
