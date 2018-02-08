<template lang="pug">
  transition(v-bind:name="animationName")
    div.panel.group-panel(v-if="isVisible" ref="groupPanel")
      panel-header
        template(slot="right")
          panel-header-button(type="close" v-on:click="close")
      div.group-title {{groupData.text}}
      div.group-body.scrollbar
        ul.items
          li.item(v-for="item in treeData" v-bind:key="item.id")
            div.title
              i.icon-group(v-bind:class="setCls(item.id)")
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
        animationName: 'in',
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
      // this.$refs.groupPanel.addEventListene('transitionend', (ev) => {
      //   console.log('transitionend')
      // })
    },
    methods: {
      open(item) {
        let delayed = 0
        let groupPanel = document.getElementsByClassName('group-panel')
        if (groupPanel.length) {
          delayed = 50
        }
        this.groupData = item
        this.initData()
        setTimeout(() => {
          this.isVisible = true
        }, delayed)
        // setTimeout(() => {
        //   this.cls = 'open'
        //   console.log('groupPanel', this.$refs.groupPanel)
        //   // this.$refs.groupPanel.addEventListener('transitionend', (ev) => {
        //   //   this.cls = ''
        //   // })
        // }, 20)
      },
      close() {
        this.isVisible = false
        this.cls = 'close'
        // 广播 Panel 被关闭事件
        EventBus.$emit('ON_GROUP_PANEL_CLOSE')
        // setTimeout(() => {
        //   this.cls = ''
        //   this.isVisible = false
        // }, 500)
      },
      min() {
        this.close()
        // this.cls = 'min'
        // this.$refs.groupPanel.addEventListener('transitionend', (ev) => {
        //   this.cls = ''
        // })
      },
      initData() {
        let treeListData = {}
        let d = new Date()
        let cd = d.getTime()
        if (Cache.get('treeListData')) {
          treeListData = JSON.parse(Cache.get('treeListData'))
        }
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
        // this.groupData icon-group
        return `${this.groupData.id}-${cls}`
      },
      /**
       * 打开模块
       * @param parent
       * @param self
       */
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
    top 50%
    left 50%
    height: 606px;
    margin-left -502px
    margin-top -380px
    opacity 1
    width 1005px !important
    overflow: hidden;
    background-color rgba(254, 254, 240, 0.94)
    border-radius $borderRadius
    user-select none
    .panel_header
      background-color transparent
    .group-title
      position relative
      text-align center
      font-size 18px
      margin -37px 60px 0
      line-height 55px
      &:after
        content ''
        display block
        height 2px
        background no-repeat 50% 50% url("./images/group-title-line.png")
    .group-body
      position absolute
      padding 0 60px
      top 97px
      left 0
      bottom 40px
      width 100%
      box-sizing border-box
      overflow hidden
      .items
        padding 0
        .item
          display flex
          align-items flex-start
          & + .item
            margin-top 20px
          .title
            text-align center
            font-size 0
            margin-right 23px
            .icon-group
              display inline-block
              width 48px
              height 48px
              line-height 48px
              font-size 0
              color #fff
              border-radius 8px
              background 50% 50% no-repeat
              background-size 100% 100%
              &.admin-permissionModule
                background-image url("./icon/admin-permissionModule.png")
              &.admin-constructModule
                background-image url("./icon/admin-constructModule.png")
              &.admin-sysModule
                background-image url("./icon/admin-sysModule.png")
              &.common-noticeModule
                background-image url("./icon/common-noticeModule.png")
              &.common-myMessageModule
                background-image url("./icon/common-myMessageModule.png")
              &.common-commonSystemModule
                background-image url("./icon/common-commonSystemModule.png")
              &.oa-workFlowBizModule
                background-image url("./icon/oa-workFlowBizModule.png")
              &.oa-myWorkingModule
                background-image url("./icon/oa-myWorkingModule.png")
              &.oa-workFlowModule
                background-image url("./icon/oa-workFlowModule.png")
              &.oa-oaStatisticsModule
                background-image url("./icon/oa-oaStatisticsModule.png")
              &.oa-oaSystemModule
                background-image url("./icon/oa-oaSystemModule.png")
              &.schedule-planManagerModule
                background-image url("./icon/schedule-planManagerModule.png")
              &.schedule-taskManagerModule
                background-image url("./icon/schedule-taskManagerModule.png")
              &.schedule-statisticsQueryModule
                background-image url("./icon/schedule-statisticsQueryModule.png")
              &.schedule-scheduleSystemModule
                background-image url("./icon/schedule-scheduleSystemModule.png")
              &.art-artRecruitModule
                background-image url("./icon/art-artRecruitModule.png")
              &.art-artSystemModule
                background-image url("./icon/art-artSystemModule.png")
              &.research-researchPersonModule
                background-image url("./icon/research-researchPersonModule.png")
              &.research-researchCompetitionModule
                background-image url("./icon/research-researchCompetitionModule.png")
              &.research-researchStatisticsModule
                background-image url("./icon/research-researchStatisticsModule.png")
              &.research-researchSystemModule
                background-image url("./icon/research-researchSystemModule.png")
            .text
              margin-top 9px
              font-size 14px
              line-height 14px
              color #1e1e1d
          .cells
            padding 7px 30px
            min-height 48px
            flex 1
            font-size 0
            background-color #fefef0
            border 1px solid #e1e1e1
            border-radius 8px
            box-sizing border-box
            .cell
              margin 4px 20px
              display inline-block
              color #1e1e1d
              cursor pointer
              font-size 14px
              line-height 24px
              &:hover
                text-decoration underline

  .in-enter-active
    animation turn-in .5s

  .in-leave-active
    transform-origin bottom right
    animation turn-out 1s

  @keyframes turn-in
    0%
      transform scale(.2, 1) translate3d(0, 100%, 0)
    50%
      transform scale(.2, 1) translate3d(0, 0, 0)
    100%
      transform scale(1, 1) translate3d(0, 0, 0)

  @keyframes turn-out
    50%, 70%
      right 15px
      top 80%
      margin-right 0
      transform scale(.2)
    100%
      right 15px
      top 80%
      margin-right 0
      transform scale(.2) translate3d(500%, 0, 0)

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
