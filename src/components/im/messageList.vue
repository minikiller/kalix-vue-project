<template lang="pug">
  im-box
    user-avatar(slot="imHeader")
    div(slot="imBody" id="user-list-session")
    <!--div.user-list(slot="imBody" id)-->
      <!--user-list-item(v-for="(item,index) in items" v-bind:key="index" v-bind:item="item")-->
</template>
<script type="text/ecmascript-6">
  import ImBox from './imBox'
  import UserAvatar from './userAvatar'
  import UserListItem from './userListItem'
  import $ from 'jquery'
  import EasemobApi from './js/api'

  let params = {
    appKey: 'kj7swf8okidb2',
    token: 'j35uRz5LG/ke4PZ0+dk2EUnU21XupRz0OrQb1ndZFaNrbds/erY05YK293SNbc+we4WcRcSqFS0='
  }
  let config = {
    localWindow: $('#session_list')
  }
  export default {
    props: {
      user: {
        type: Object,
        default: () => {
          return {
            userName: ''
          }
        }
      }
    },
    data() {
      return {
        items: [
          {title: 'user', avatar: '/static/images/im/user-1.png', content: '消息', time: +new Date()},
          {title: '用户2', avatar: '/static/images/im/user-2.png', content: '《参加全国大学生竞赛》', time: +new Date()},
          {title: '实时消息', avatar: '/static/images/im/sys-message.png', content: '参加今天的下午5点会', time: +new Date()},
          {title: '审批文件', avatar: '/static/images/im/user-file.png', content: '《参加全国大学生竞赛》', time: +new Date()}
        ]
      }
    },
    mounted() {
      if (this.$route.name !== 'home') {
        this.moveLeft()
      }

      // this.init()
      EasemobApi.api.init(params, config)
      EasemobApi.api.getConversationList()
    },
    components: {
      ImBox,
      UserAvatar,
      UserListItem,
      EasemobApi
    }
  }
</script>
