<!--
描述：系统导航组件
开发人：桑杨
开发日期：2017年7月14日
-->

<template lang="pug">
  div.treeList(:class="{'small':menuChk}")
    ul.bd.bg(v-if="!menuChk")
      li(v-for="item in treeData" v-bind:key="item.id" v-bind:class="{'active':item.isShow}")
        div.s-flex.tit.tit-txt(@click="showTree(item,$event)")
          div.s-flex_item
            i.tit_icon(:class="bindClass(item.iconCls)")
            span.txt {{item.text}}
          div.arrow
            i(:class="showIcon(item.isShow)")
        el-collapse-transition
          div.mn(v-show="item.isShow")
            ul
              li(v-for="item in item.children" v-bind:key="item.id")
                div.tit(v-on:click="selectItem(item)" v-bind:class="currentCls(item)")
                  i.tit_icon(:class="bindClass(item.iconCls)")
                  | {{item.text}}
    ul.bd.samll(v-if="menuChk")
      li(v-for="item in treeData")
        div.s-flex.tit(v-bind:class="{'active':item.isShow}")
          i.tit_icon(:class="bindClass(item.iconCls)")
          div.mn
            div.txt {{item.text}}
            ul
              li.tit(v-for="item in item.children"
              v-bind:key="item.id"
              v-on:click="selectItem(item)")
                i.tit_icon(:class="bindClass(item.iconCls)")
                | {{item.text}}
</template>

<script type="text/ecmascript-6">
  // eslint-disable-next-line
  import Vue from 'vue'
  import Cache from 'common/cache'
  // eslint-disable-next-line
  import {cacheTime, systemApplicationsBaseURL} from 'config/global.toml'
  // import EventBus from 'common/eventbus'

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
        clickedNode: null,
        flag: true
      }
    },
    activated() {
      // EventBus.$on('toolListDataComplete', this.fetchData)
    },
    mounted() {
      this.fetchData()
    },
    watch: {
      '$route'(to, from) {
        if (to.path !== '/' && to.path !== '/login') {
          this.fetchData()
        }
      }
    },
    methods: {
      fetchData(appId) {
        console.log('this.$route:', this.$route.params.app)
        if (this.$route.name === 'login') {
          return
        }
        if (!appId) {
          let toolListData = JSON.parse(Cache.get('toolListData'))
          if (!toolListData) {
            return
          }
          appId = toolListData[0].id
        }
        let d = new Date()
        let cd = d.getTime()
        let treeListData = {}
        this.currApp = this.$route.params.app || appId
        this.currFun = this.$route.params.fun || ''
        if (Cache.get('treeListData')) {
          treeListData = JSON.parse(Cache.get('treeListData'))
        }
        if (treeListData.createDate && (treeListData.createDate - cd) < cacheTime && treeListData[this.currApp]) {
          this.treeData = treeListData[this.currApp]
          this.setItemShow()
        } else {
          const data = {_dc: cd, node: 'root'}
          if (this.flag) {
            this.flag = false
            Vue.axios({
              url: systemApplicationsBaseURL + this.currApp,
              method: 'get',
//            headers: {'AccessToken': accessToken, JSESSIONID: userToken},
              params: data
            }).then(response => {
              this.flag = true
              let nowDate = new Date()
              if (response.data && response.data.code !== 401) {
                this.treeData = response.data
                if (this.treeData.length) {
                  this.treeData.forEach(function (e, i) {
                    Vue.set(e, 'isShow', false)
                  })
                  treeListData[this.currApp] = this.treeData
                  treeListData.createDate = nowDate.getTime()
                  this.setItemShow()
                  Cache.save('treeListData', JSON.stringify(treeListData))
                }
              }
            })
          }
        }
      },
      setItemShow() {
//        let routeName = this.currApp + '/' + this.currFun
        let routeName = this.currFun.toLowerCase()
        this.treeData.forEach((item) => {
          item.isShow = false
          let temp = item.children.find(function (e) {
            let routeId = e.routeId.split('/').pop()
            return routeId.toLowerCase() === routeName
          })
          if (temp) {
            item.isShow = true
          }
        })
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
      },
      selectItem(item) {
        this.$router.push({path: `/${this.currApp}/${item.routeId.split('/').pop()}`})
        Cache.save('currentTreeListItem', JSON.stringify(item))
      },
      currentCls(item) {
        return item.routeId.split('/').pop().toLowerCase() === this.currFun.toLowerCase() ? 'active' : ''
      }
    },
    components: {}
  }
</script>

<style lang="stylus">
  @import "navigater.styl"
</style>
