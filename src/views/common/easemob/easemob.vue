<template>
  <div class="im black">
    <div class="btn-test" @click="onIntoTest">测试</div>
    <div class="im-wrapper">
      <div class="main_container">
        <div class="panel main-panel">
          <div class="panel_body_container" style="bottom: 50px;">
            <div class="panel_body">
              <div :class="{'selected':navTabSelected === 'contact'}" class="panel">
                <header class="panel_header">
                  <div class="item"></div>
                  <h1 class="text_ellipsis">会话</h1>
                  <div class="item"></div>
                </header>
                <div class="panel_body_container panel_body_container_2"></div>
              </div>
              <div :class="{'selected':navTabSelected === 'conversation'}" class="panel">
                <header class="panel_header">
                  <div class="item"></div>
                  <h1 class="text_ellipsis">联系人</h1>
                  <div class="item">
                    <div class="btn btn_black btn_search">
                      <span class="btn_img"></span>
                    </div>
                  </div>
                </header>
                <div class="panel_body_container panel_body_container_2">
                  <div class="panel_body">
                    <div class="tab tab_animate member_tab">
                      <ul id="memberTab" class="tab_head">
                        <li @click="onClickTab(0)" :class="{'active':tabActive === 0}">好友</li>
                        <li @click="onClickTab(1)" :class="{'active':tabActive === 1}">群</li>
                        <li @click="onClickTab(2)" :class="{'active':tabActive === 2}">讨论组</li>
                      </ul>
                      <ul class="tab_body member_tab_body">
                        <li :class="{'active':tabActive === 0}" class="memberTabBody-friend scrollbar">
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
                        <li :class="{'active':tabActive === 1}" class="member_scroll_area">
                          <ul class="list list_white catogory_List">
                            <li class="list_item">
                              <a href="javascript:void(0);" class="avatar">
                                <img
                                  src="//p.qpic.cn/qqstory_pic/Q3auHgzwzM6cKtDbXYoDPKflKJ1nXkTzl7vmDO5u8zgV1MIob0COcRLCbqia6ia82NEqNDyhI5DfE/"/>
                              </a>
                              <p class="member_nick">KnockoutJS技术高级群</p>
                              <p class="member_msg text_ellipsis"></p>
                            </li>
                            <li class="list_item">
                              <a href="javascript:void(0);" class="avatar">
                                <img
                                  src="//p.qpic.cn/qqstory_pic/Q3auHgzwzM6cKtDbXYoDPKflKJ1nXkTzl7vmDO5u8zgV1MIob0COcRLCbqia6ia82NEqNDyhI5DfE/"/>
                              </a>
                              <p class="member_nick">KnockoutJS技术高级群</p>
                              <p class="member_msg text_ellipsis"></p>
                            </li>
                            <li class="list_item">
                              <a href="javascript:void(0);" class="avatar">
                                <img
                                  src="//p.qpic.cn/qqstory_pic/Q3auHgzwzM6cKtDbXYoDPKflKJ1nXkTzl7vmDO5u8zgV1MIob0COcRLCbqia6ia82NEqNDyhI5DfE/"/>
                              </a>
                              <p class="member_nick">KnockoutJS技术高级群</p>
                              <p class="member_msg text_ellipsis"></p>
                            </li>
                          </ul>
                        </li>
                        <li :class="{'active':tabActive === 2}" class="member_scroll_area">
                          <ul class="list list_white catogory_List">
                            <li class="list_item">
                              <a href="javascript:void(0);" class="avatar">
                                <img src="http://w.qq.com/img/discu_avatar.png"/>
                              </a>
                              <p class="member_nick">校园信息化项目讨论组</p>
                              <p class="member_msg text_ellipsis"></p>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div :class="{'selected':navTabSelected === 'plugin'}" class="panel">
                <header class="panel_header">
                  <div class="item"></div>
                  <h1 class="text_ellipsis">发现</h1>
                  <div class="item"></div>
                </header>
                <div class="panel_body_container panel_body_container_2">
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
                <header class="panel_header">
                  <div class="item"></div>
                  <h1 class="text_ellipsis">设置</h1>
                  <div class="item"></div>
                </header>
                <div class="panel_body_container panel_body_container_2">
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
          </div>
          <footer>
            <nav class="nav_tab">
              <ul class="nav_tab_head">
                <li @click="onNavTabClick('contact')" :class="{'selected':navTabSelected === 'contact'}"
                    class="contact">
                  <a>
                    <div class="icon"></div>
                    <span>会话</span>
                  </a>
                </li>
                <li @click="onNavTabClick('conversation')" :class="{'selected':navTabSelected === 'conversation'}"
                    class="conversation">
                  <a>
                    <div class="icon"></div>
                    <span>联系人</span>
                  </a>
                </li>
                <li @click="onNavTabClick('plugin')" :class="{'selected':navTabSelected === 'plugin'}" class="plugin">
                  <a>
                    <div class="icon"></div>
                    <span>发现</span>
                  </a>
                </li>
                <li @click="onNavTabClick('setup')" :class="{'selected':navTabSelected === 'setup'}" class="setup">
                  <a>
                    <div class="icon"></div>
                    <span>设置</span>
                  </a>
                </li>
              </ul>
            </nav>
          </footer>
        </div>
      </div>
      <div class="chat_wrapper">
        <div class="panel chat-panel">
          <header class="panel_header">
            <div class="item">
              <div class="btn btn_black">
                <span class="btn_text">联系人</span>
              </div>
            </div>
            <h1 class="text_ellipsis">搜索</h1>
            <div class="item"></div>
          </header>
          <div class="panel_body_container panel_body_container_2">
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
                      <img
                        src="https://face4.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=667850974&t=1510790505&vfwebqq=9e5f18ebe3aff8561791ce5334afb987e201eee7620167dde35a5926977516d8d20277e78a159dc3"
                        class="lazyLoadImg loaded"/>
                    </a>
                    <p class="member_nick" id="userNick-667850974">
                      王群<span>( 流逝的风)</span>
                    </p>
                  </li>
                  <li class="list_item">
                    <a class="avatar">
                      <img
                        src="https://face4.web.qq.com/cgi/svr/face/getface?cache=1&type=1&f=40&uin=667850974&t=1510790505&vfwebqq=9e5f18ebe3aff8561791ce5334afb987e201eee7620167dde35a5926977516d8d20277e78a159dc3"
                        class="lazyLoadImg loaded"/>
                    </a>
                    <p class="member_nick" id="userNick-667850974">
                      王群<span>( 流逝的风)</span>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="panel chat-panel selected">
          <header class="panel_header">
            <div class="item"></div>
            <h1 class="text_ellipsis">会话</h1>
            <div class="item">
              <div class="btn btn_black">
                <span class="btn_text">关闭</span>
              </div>
            </div>
          </header>
          <div class="panel_body_container" style="top:45px;bottom: 50px;">
            <div class="panel_body chat_container"></div>
          </div>
          <footer class="chat_toolbar_footer">
            <div class="chat_toolbar">
              <div class="btn btn_face">
                <span class="btn_img"></span>
              </div>
              <textarea class="input input_white chat_textarea"></textarea>
              <button class="btn btn_small btn_blue send_chat_btn">
                <span class="btn_text">发送</span>
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
    <easemob-test ref="easemobTest"></easemob-test>
  </div>
</template>
<script type="text/ecmascript-6">
  import EasemobTest from './easemobtest'
  import Scrollbar from 'smooth-scrollbar'

  export default {
    data() {
      return {
        navTabSelected: 'conversation',
        tabActive: 0,
        treeData: []
      }
    },
    mounted() {
      this.getData()
      Scrollbar.init(document.querySelector('.scrollbar'))
    },
    methods: {
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
