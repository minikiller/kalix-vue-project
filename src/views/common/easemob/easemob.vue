<template>
  <div class="im black" id="im" :style="setBackground()">
    <div class="btn-test" @click="onIntoTest">测试</div>
    <div class="im-wrapper">
      <div class="main_container">
        <div class="panel main-panel">
          <div :class="{'show':isShowSideBar}" class="side_bar">
            <div class="tool-btn close side_bar_close" @click="onOpenUserInfo"></div>
            <div class="user_info">
              <div class="avatar_wrapper">
                <img src="./images/user-3.png" class="avatar"/>
              </div>
              <div class="user_name">王小样</div>
              <div class="user_org">动画研究院</div>
            </div>
            <ul class="side_list">
              <li class="side_list_item selected">
                <i class="icon" style="background-image: url(/static/images/im/icon-1.png)"></i>
                首页
              </li>
              <li class="side_list_item">
                <i class="icon" style="background-image: url(../../../../static/images/im/icon-2.png)"></i>
                历史纪录
              </li>
              <li class="side_list_item">
                <i class="icon" style="background-image: url(../../../../static/images/im/icon-3.png)"></i>
                个人设置
              </li>
              <li class="side_list_item">
                <i class="icon" style="background-image: url(../../../../static/images/im/icon-4.png)"></i>
                收藏
              </li>
              <li class="side_list_item">
                <i class="icon" style="background-image: url(../../../../static/images/im/icon-5.png)"></i>编辑
              </li>
            </ul>
          </div>
          <div class="wallpaper-ctrl">
            <span class="wallpaperImg pre" @click="onChangeBackgroundImg(false)" title="点击切换背景图片"></span>
            <span class="wallpaperImg next" @click="onChangeBackgroundImg(true)" title="点击切换背景图片"></span>
          </div>
          <div class="panel_body_container panel_bottom-distance">
            <div :class="{'selected':navTabSelected === 'contact'}" class="panel">
              <div class="panel_header">
                <div class="panel_header_wrapper" style="padding: 0 14px;">
                  <div class="avatar_wrapper" @click="onOpenUserInfo">
                    <img class="avatar" src="./images/7.jpg"/>
                    <div class="text">某某某</div>
                  </div>
                </div>
              </div>
              <div class="panel_body_container panel_body-wrapper panel_top-distance">
                <ul class="tab_body member_tab_body">
                  <li class="scrollbar active">
                    <ul class="user-list">
                      <li @click="onSelectUserChat" class="user-list_item">
                        <div class="avatar_wrapper">
                          <img class="avatar" src="./images/user-1.png"/>
                          <div class="badge">
                            <div class="badge-text">1</div>
                          </div>
                        </div>
                        <div class="user-list_item_main">
                          <p class="member_nick">Activex交互群</p>
                          <p class="member_msg text_ellipsis">小可爱加入群</p>
                        </div>
                        <div class="time">16:25</div>
                      </li>
                      <li @click="onSelectUserChat" class="user-list_item">
                        <div class="avatar_wrapper">
                          <img class="avatar" src="./images/user-2.png"/>
                        </div>
                        <div class="user-list_item_main">
                          <p class="member_nick">Activex交互群</p>
                          <p class="member_msg text_ellipsis">小可爱加入群</p>
                        </div>
                        <div class="time">16:25</div>
                      </li>
                      <li class="user-list_item">
                        <div class="avatar_wrapper">
                          <img class="avatar" src="./images/sys-message.png"/>
                        </div>
                        <div class="user-list_item_main">
                          <p class="member_nick">Activex交互群</p>
                          <p class="member_msg text_ellipsis">小可爱加入群</p>
                        </div>
                        <div class="time">16:25</div>
                      </li>
                      <li class="user-list_item">
                        <div class="avatar_wrapper">
                          <img class="avatar" src="./images/user-file.png"/>
                        </div>
                        <div class="user-list_item_main">
                          <p class="member_nick">Activex交互群</p>
                          <p class="member_msg text_ellipsis">小可爱加入群</p>
                        </div>
                        <div class="time">16:25</div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div :class="{'selected':navTabSelected === 'conversation'}" class="panel">
              <div class="panel_header">
                <div class="panel_header_wrapper" style="padding: 0 14px;">
                  <div class="avatar_wrapper">
                    <img class="avatar" src="./images/7.jpg"/>
                    <div class="text">某某某</div>
                  </div>
                </div>
              </div>
              <div class="panel_body_container panel_body-wrapper panel_top-distance">
                <div class="panel_body">
                  <div class="tab tab_animate member_tab">
                    <ul class="tab_body member_tab_body">
                      <li class="active scrollbar">
                        <ul class="group_list member_group_list">
                          <li :key="item.id" v-for="(item,index) in treeData" :class="{'active':item.active}"
                              class="list_group clearfix">
                            <div @click="selectItem(item,index)"
                                 class="list_group_title list_group_white_title list_arrow_right">
                              <span>{{item.name}}</span>
                              <span class="onlinePercent">6/34</span>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div :class="{'selected':navTabSelected === 'plugin'}" class="panel">
              <div class="panel_header">
                <div class="item"></div>
                <h1 class="panel_title">发现</h1>
                <div class="item"></div>
              </div>
              <div class="panel_body_container panel_body-wrapper panel_top-distance">
                <div class="panel_body list_page setting">
                  <ul class="plugin_list">
                    <li class="qzone">
                      <span class="icon"></span>
                      <a>QQ空间</a>
                    </li>
                    <li class="qmail">
                      <span class="icon"></span>
                      <a>QQ邮箱</a>
                    </li>
                    <li class="qq_portal">
                      <span class="icon"></span>
                      <a>腾讯网</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div :class="{'selected':navTabSelected === 'setup'}" class="panel">
              <div class="panel_header">
                <div class="item"></div>
                <h1 class="panel_title">设置</h1>
                <div class="item"></div>
              </div>
              <div class="panel_body_container panel_body-wrapper panel_top-distance">
                <div class="panel_body list_page setting">
                  <div class="group">
                    <div class="row clearfix">
                      <div class="cloumn">
                        <img class="avatar"
                             src="https://q.qlogo.cn/g?b=qq&nk=11991762&s=100&t=1510714397109">
                      </div>
                      <div class="cloumn profile_title_setting">
                        <div class="text_ellipsis profile_name row">(●—●)</div>
                        <div class="row profile_account">11991762</div>
                      </div>
                    </div>
                  </div>
                  <div class="group">
                    <div class="row profile_signature">
                      <span class="label">个性签名: </span>
                      <span>有些事情我知道我知道，有些事情我知道我不知道，有些事情我不知道我知道，有些事情我不知道我不知道</span>
                    </div>
                  </div>
                  <div class="group clickAble">
                    <div class="row ">
                      消息相关设置
                      <span class="more_icon"></span>
                    </div>
                  </div>
                  <div class="group clickAble">
                    <div class="row ">
                      关于QQ
                      <span class="more_icon"></span>
                    </div>
                  </div>
                  <div class="group clickAble">
                    <div class="row loginout">
                      退出当前帐号
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="panel_footer">
            <div class="nav_tab">
              <ul class="nav_tab_head">
                <li @click="onNavTabClick('contact')" :class="{'selected':navTabSelected === 'contact'}"
                    class="contact">
                  <div class="icon"></div>
                </li>
                <li @click="onNavTabClick('conversation')" :class="{'selected':navTabSelected === 'conversation'}"
                    class="conversation">
                  <div class="icon"></div>
                </li>
                <li @click="onNavTabClick('plugin')" :class="{'selected':navTabSelected === 'plugin'}" class="plugin">
                  <div class="icon"></div>
                </li>
                <li @click="onNavTabClick('setup')" :class="{'selected':navTabSelected === 'setup'}" class="setup">
                  <div class="icon"></div>
                </li>
                <li @click="onNavTabClick('setup')" :class="{'selected':navTabSelected === 'setup'}" class="setup">
                  <div class="icon"></div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="chat_wrapper">
        <!-- 检索窗口 -->
        <div v-show="false" class="panel chat-panel">
          <div class="panel_header">
            <div class="panel_title" style="padding: 0 25px;font-size: 14px;">搜索</div>
            <div class="item">
              <div class="tool-btn fixed"></div>
              <div class="tool-btn max"></div>
              <div class="tool-btn close"></div>
            </div>
          </div>
          <div class="panel_body_container panel_top-distance">
            <div class="panel_body">
              <div class="search_wrapper hascontent">
                <div class="search_inner">
                  <input type="text" class="searchInput" placeholder="搜索" autocapitalize="off"/>
                  <button class="searchClear"></button>
                </div>
                <button class="searchCancel">取消</button>
              </div>
              <div class="scrollWrapper search search_container_scroll_area">
                <ul class="list list_white catogory_List">
                  <li class="list_item">
                    <a class="avatar">
                      <img src="./images/user-1.png" class="lazyLoadImg loaded"/>
                    </a>
                    <p class="member_nick">
                      某某某<span>(某某某某某某)</span>
                    </p>
                  </li>
                  <li class="list_item">
                    <a class="avatar">
                      <img src="./images/user-1.png" class="lazyLoadImg loaded"/>
                    </a>
                    <p class="member_nick">
                      某某某<span>(某某某某某某)</span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!-- 聊天窗口 -->
        <div v-show="isChatShow" class="panel chat-panel">
          <div class="panel_header">
            <div class="panel_title" style="padding: 0 25px;">
              <div class="avatar_wrapper">
                <img class="avatar" src="./images/7.jpg"/>
                <div class="text">某某交流群</div>
              </div>
            </div>
            <div class="item">
              <div class="tool-btn fixed"></div>
              <div class="tool-btn max"></div>
              <div @click="isChatShow=false" class="tool-btn close"></div>
            </div>
          </div>
          <div class="panel_body_container panel_top-distance" style="bottom: 176px;">
            <div class="panel_body chat_container"></div>
          </div>
          <div class="panel_footer chat_toolbar_footer">
            <div class="chat_toolbar">
              <div class="chat_toolbar_item face"></div>
              <div class="chat_toolbar_item file"></div>
              <div class="chat_toolbar_item video"></div>
            </div>
            <div class="chat_input">
              <textarea class="chat_textarea"></textarea>
              <div class="chat_button_list">
                <div class="btn-item">发送</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-menu" id="dock">
      <div class="footer-bg"></div>
      <div class="footer-wrapper" id="macAvatars">
        <div class="mac-avatar" v-for="(item,index) in menuList" :class="bindCls(item.id,item.iconCls)"></div>
      </div>
    </div>
    <easemob-test ref="easemobTest"></easemob-test>
  </div>
</template>
<script type="text/ecmascript-6">
  import EasemobTest from './easemobtest'
  import Scrollbar from 'smooth-scrollbar'
  import {isEmptyObject} from 'common/util'
  import {applicationURL} from 'config/global.toml'
  import Cache from 'common/cache'
  import $ from 'jquery'
  import _ from 'underscore'

  export default {
    data() {
      return {
        navTabSelected: 'contact',
        tabActive: 0,
        treeData: [],
        menuList: [],
        isShowSideBar: false,
        currentBackgroundImg: 8,
        isChatShow: false
      }
    },
    created() {
      this.getData()
      this.initMenu()
    },
    mounted() {
      let scrollbars = document.querySelectorAll('.scrollbar')
      scrollbars.forEach(item => {
        Scrollbar.init(item)
      })
      this.init()
    },
    methods: {
      init() {
        let $lis = $('#macAvatars > .mac-avatar')
        let $wrapper = $('#im')

        $wrapper.mousemove(e => {
          let hs = []
          $lis.each((i, item) => {
            let imgX = $(item).offset().left + $(item).width() / 2
            let imgY = $(item).offset().top + $(item).height() / 2
            let a = imgX - e.clientX
            let b = imgY - e.clientY
            let c = Math.sqrt(a * a + b * b)
            hs.push({id: i, val: c})
          })
          let minVal = _.min(hs, item => {
            return item.val
          })
          $($lis).removeClass('current prev next prev_prev next_next')
          if (minVal.val < 60) {
            $($lis[minVal.id])
              .addClass('current')
              .prev().addClass('prev')
              .prev().addClass('prev_prev')
              .end()
              .end()
              .next().addClass('next')
              .next().addClass('next_next')
          }
        })
      },
      onSelectUserChat() {
        this.isChatShow = true
      },
      setBackground() {
        return {'background-image': `url("/static/images/im/${this.currentBackgroundImg}.jpg")`}
      },
      onChangeBackgroundImg(flag) {
        if (flag) {
          this.currentBackgroundImg++
        } else {
          this.currentBackgroundImg--
        }
        if (this.currentBackgroundImg > 9) {
          this.currentBackgroundImg = 8
        }
        if (this.currentBackgroundImg < 8) {
          this.currentBackgroundImg = 9
        }
      },
      onOpenUserInfo() {
        this.isShowSideBar = !this.isShowSideBar
      },
      selectMac() {
        console.log('selectMac')
      },
      onIntoTest() {
        this.$refs.easemobTest.show()
      },
      onNavTabClick(value) {
        this.navTabSelected = value
      },
      onClickTab(value) {
        this.tabActive = value
      },
      getData() {
        let url = '/camel/rest/orgs?node=root'
        this.axios.request({
          method: 'GET',
          url: url,
          params: {}
        }).then(res => {
          this.analyze(res.data.children[0])
        })
      },
      getMember(data) {
//        let targetURL = `/camel/rest/orgs/${data.id}/dutys`
//        let _data = {
//          jsonStr: this.jsonStr,
//          page: 1,
//          start: 0,
//          limit: 1000
//        }
//        this.$http.get(targetURL, {
//          params: _data
//        }).then(response => {})
      },
      /**
       * 分解对象
       * @param arr
       */
      analyze(arr) {
        if (arr.children && arr.children.length > 0) {
          arr.children.forEach(item => {
            this.$set(item, 'active', false)
            this.treeData.push(item)
            this.analyze(item)
          })
        }
      },
      selectItem(item, index) {
        this.treeData.map(e => {
          if (e !== item) {
            e.active = false
          }
        })
        item.active = !item.active
        console.log('item', item)
      },
      initMenu() {
        let d = new Date()
        let cd = d.getTime()
        let toolListData = []
        if (Cache.get('toolListData')) {
          toolListData = JSON.parse(Cache.get('toolListData'))
        }
        if (!isEmptyObject(toolListData)) {
          this.menuList = toolListData
        } else {
          const data = {
            _dc: cd,
            page: 1,
            start: 0,
            limit: 25
          }
          this.axios.get(applicationURL, {
            params: data
          }).then(response => {
            if (response && response.data) {
              toolListData = response.data
              this.menuList = toolListData
              this.init()
              Cache.save('toolListData', JSON.stringify(toolListData))
            }
          })
        }
      },
      bindCls(i, cls) {
        return cls + ' ' + i
      }
    },
    components: {
      EasemobTest
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  @import "style.styl"
</style>
