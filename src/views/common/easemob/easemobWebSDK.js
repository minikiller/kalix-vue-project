import Message from 'common/message'
require('easemob-websdk')

let WebIM = window.WebIM
/* eslint-disable new-cap */
var conn = new WebIM.connection({
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
  url: WebIM.config.xmppURL,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  apiUrl: WebIM.config.apiURL,
  isAutoLogin: WebIM.config.isAutoLogin
})

window.conn = conn

console.log(conn)

conn.listen({
  // 连接成功回调
  onOpened: function (message) {
    console.log('=====登录成功！！！')
    // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
    // 手动上线指的是调用conn.setPresence() 如果conn初始化时已将isAutoLogin设置为true
    // 则无需调用conn.setPresence()
    getFriendList()
  },
  onClosed(message) {
    console.log('连接关闭回调')
  },
  onTextMessage(message) {
    console.log('收到文本消息', message)
  },
  onEmojiMessage(message) {
    console.log('收到表情消息')
  },
  onPictureMessage: function (message) {
    console.log('收到图片消息')
  },
  onCmdMessage: function (message) {
    console.log('收到命令消息')
  },
  onAudioMessage: function (message) {
    console.log('收到音频消息')
  },
  onLocationMessage: function (message) {
    console.log('收到位置消息')
  },
  onFileMessage: function (message) {
    console.log('收到文件消息')
  },
  // 收到视频消息
  onVideoMessage: function (message) {
    var node = document.getElementById('privateVideo')
    var option = {
      url: message.url,
      headers: {
        'Accept': 'audio/mp4'
      },
      onFileDownloadComplete: function (response) {
        var objectURL = WebIM.utils.parseDownloadResponse.call(conn, response)
        node.src = objectURL
      },
      onFileDownloadError: function () {
        console.log('File down load error.')
      }
    }
    WebIM.utils.download.call(conn, option)
  },
  // 处理“广播”或“发布-订阅”消息，如联系人订阅请求、处理群组、聊天室被踢解散等消息
  onPresence: function (message) {
    console.log('onPresence', message)
    handlePresence(message)
  },
  onRoster(message) {
    console.log('处理好友申请')
  },
  // 处理群组邀请
  onInviteMessage: function (message) {
  },
  // 本机网络连接成功
  onOnline: function () {
  },
  // 本机网络掉线
  onOffline: function () {
  },
  // 失败回调
  onError: function (message) {
  },
  // 黑名单变动
  onBlacklistUpdate: function (list) {
    // 查询黑名单，将好友拉黑，将好友从黑名单移除都会回调这个函数，list则是黑名单现有的所有好友信息
    console.log(list)
  },
  // 收到消息送达服务器回执
  onReceivedMessage: function (message) {
  },
  // 收到消息送达客户端回执
  onDeliveredMessage: function (message) {
  },
  // 收到消息已读回执
  onReadMessage: function (message) {
  },
  // 创建群组成功回执（需调用createGroupNew）
  onCreateGroup: function (message) {
  },
  // 如果用户在A群组被禁言，在A群发消息会走这个回调并且消息不会传递给群其它成员
  onMutedMessage: function (message) {
  }
})

// 收到联系人订阅请求的处理方法，具体的type值所对应的值请参考xmpp协议规范
let handlePresence = function (e) {
  // 对方收到请求加为好友
  if (e.type === 'subscribe') {
    // MessageBox.$message({
    //   title: '对方收到请求加为好友',
    //   confirmButtonText: '同意',
    //   cancelButtonText: '拒绝'
    // })
    Message.warning('hhhhhhhhhhhhhhhhhhhhhhhhhhhh')
    // 同意添加好友操作的实现方法
    conn.subscribed({
      to: 'username',
      message: '[resp:true]'
    })
    // 需要反向添加对方好友
    conn.subscribe({
      to: e.from,
      message: '[resp:true]'
    })
  }

  // switch (message.type) {
  //   // 对方请求添加好友
  //   case 'subscribe':
  //     break;
  //   case 'subscribed':                          // 对方同意添加好友，已方同意添加好友
  //     break;
  //   case 'unsubscribe':                         // 对方删除好友
  //     break;
  //   case 'unsubscribed':                        // 被拒绝添加好友，或被对方删除好友成功
  //     break;
  //   case 'memberJoinPublicGroupSuccess':                 // 成功加入聊天室
  //     console.log('join chat room success');
  //     break;
  //   case 'joinChatRoomFaild':                   // 加入聊天室失败
  //     console.log('join chat room faild');
  //     break;
  //   case 'joinPublicGroupSuccess':              // 意义待查
  //     console.log('join public group success', message.from);
  //     break;
  //   case 'createGroupACK':
  //     conn.createGroupAsync({
  //       from: message.from,
  //       success: function (option) {
  //         console.log('Create Group Succeed');
  //       }
  //     });
  //     break;
  // }
}

// 获取好友列表
let getFriendList = function () {
  conn.getRoster({
    success: roster => {
      // 获取好友列表，并进行好友列表渲染，roster格式为：
      /** [
       {
         jid:'asemoemo#chatdemoui_test1@easemob.com',
         name:'test1',
         subscription: 'both'
       }
       ]
       */
      for (let i = 0, l = roster.length; i < l; i++) {
        let ros = roster[i]
        // ros.subscription值为both/to为要显示的联系人，此处与APP需保持一致，才能保证两个客户端登录后的好友列表一致
        if (ros.subscription === 'both' || ros.subscription === 'to') {
          console.log('my friends =====' + ros.name)
        }
      }
    },
    error: err => {
      alert('获取好友失败')
      console.log(err)
    }
  })
}
