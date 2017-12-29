<template lang="pug">
  div.panel.group-panel(v-if="isVisible" v-bind:class="cls")
    panel-header
      template(slot="right")
        panel-header-button(type="close" v-on:click="close")
    div.group-title {{groupData.text}}
    div.group-body.scrollbar
      ul.items
        li.item(v-for="item in treeData" v-bind:key="item.id")
          div.title
            i.icon(v-bind:class="setCls(item.iconCls)")
            div.text {{item.text}}
          div.cells
            div.cell(v-for="cell in item.children" v-bind:key="cell.id" v-on:click="selectCell(item,cell)") {{cell.text}}
</template>
<script type="text/ecmascript-6">
  import PanelHeader from './panelHeader.vue'
  import panelHeaderButton from './panelHeaderButton.vue'
  import Cache from 'common/cache'
  import {cacheTime, systemApplicationsBaseURL} from 'config/global.toml'
  import Scrollbar from 'smooth-scrollbar'
  import EventBus from 'common/eventbus'

  export default {
    data() {
      return {
        isVisible: false,
        isMin: false,
        groupTitle: '',
        treeData: [],
        groupData: {},
        cls: ''
      }
    },
    mounted() {
      let scrollbars = document.querySelectorAll('.scrollbar')
      scrollbars.forEach(item => {
        Scrollbar.init(item)
      })
    },
    methods: {
      open(item) {
        console.log('%citem', 'color:#550000', item)
        this.isVisible = true
        this.groupData = item
        this.initData()
        setTimeout(() => {
          this.cls = 'open'
        }, 20)
      },
      close() {
        this.cls = 'close'
        setTimeout(() => {
          this.isVisible = false
          this.cls = ''
        }, 500)
      },
      min() {
        this.cls = 'min'
      },
      initData() {
        let treeListData = {}
        let d = new Date()
        let cd = d.getTime()
        if (Cache.get('treeListData')) {
          console.log('%cYES', 'color:00ff00')
          treeListData = JSON.parse(Cache.get('treeListData'))
        }
        console.log('%c ===== treeListData', 'color:#990000', treeListData)
        if (treeListData.createDate && (treeListData.createDate - cd) < cacheTime && treeListData[this.groupData.id]) {
          this.treeData = treeListData[this.groupData.id]
        } else {
          const data = {_dc: cd, node: 'root'}
          this.axios({
            url: systemApplicationsBaseURL + this.groupData.id,
            method: 'get',
            params: data
          }).then(response => {
            let nowDate = new Date()
            if (response.data && response.data.code !== 401) {
              this.treeData = response.data
              console.log('this.treeData', this.treeData)
              if (this.treeData.length) {
                treeListData[this.groupData.id] = this.treeData
                treeListData.createDate = nowDate.getTime()
                Cache.save('treeListData', JSON.stringify(treeListData))
              }
            }
          })
        }
      },
      setCls(cls) {
        return `${cls} cell_${Math.floor(Math.random() * 5)}`
      },
      selectCell(parent, self) {
        EventBus.$emit('ON_CLICK_GROUP_CELL', {parent, self})
        this.$router.push({path: `/${parent.applicationId}/${self.routeId.split('/').pop()}`})
      }
    },
    components: {
      PanelHeader,
      panelHeaderButton
    },
    watch: {
      groupData(newValue) {
        // this.initData()
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "../../assets/stylus/panel-base.styl"
  .group-panel
    position: absolute;
    top: 5%;
    height: 80%;
    left: 50%;
    margin-left: -358px
    opacity 0
    width 1004px !important
    overflow: hidden;
    background-color rgba(254, 254, 240, 0.94)
    border-radius $borderRadius
    transition all .5s
    &.open
      opacity 1
    &.close,
    &.min
      opacity 0
      transform scale(.5)
    .panel_header
      background-color transparent
    .group-title
      text-align center
      font-size 18px
      margin 0 54px
      line-height 53px
      border-bottom 4px solid #686868
    .group-body
      position absolute
      padding 0 54px
      top 157px
      left 0
      bottom 56px
      width 100%
      box-sizing border-box
      overflow hidden
      .items
        padding 0
        .item
          display flex
          align-items flex-start
          & + .item
            margin-top 17px
          .title
            text-align center
            font-size 0
            margin-right 23px
            .icon
              display inline-block
              width 72px
              height 72px
              line-height 72px
              font-size 40px
              color #fff
              border-radius 20px
              &.cell_0
                background-color #178a3a
              &.cell_1
                background-color #ccadfb
              &.cell_2
                background-color #fe82b4
              &.cell_3
                background-color #94dffe
              &.cell_4
                background-color #f7bb25
            .text
              margin-top 9px
              font-size 14px
              line-height 14px
              color #1e1e1d
          .cells
            padding 14px 30px
            min-height 61px
            flex 1
            font-size 0
            margin-top 4px
            background-color #f3f3f3
            border 1px solid #e1e1e1
            border-radius 11px
            box-sizing border-box
            .cell
              margin 4px 20px
              display inline-block
              color #1e1e1d
              cursor pointer
              font-size 14px
              line-height 24px

  /* 翻板 */
  .turn-enter-active,
  .turn-leave-active
    transition all .3s
    transform-style preserve-3d

  .turn-enter-active
    transform-origin center top

  .turn-leave-active
    transform-origin center bottom

  .turn-enter,
  .turn-leave-active
    opacity 0

  .turn-enter
    transform scale(.9) rotateX(-10deg)

  .turn-leave-active
    transform scale(.9) rotateX(10deg)

  /* 缩放 */
  .zoom-enter-active,
  .zoom-leave-active
    transition all .5s

  .zoom-enter,
  .zoom-leave-active
    opacity 0
    transform scale(.9)
</style>
