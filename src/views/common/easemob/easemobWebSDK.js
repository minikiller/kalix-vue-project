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
    console.log('呵呵哒啊')
    // 如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
    // 手动上线指的是调用conn.setPresence() 如果conn初始化时已将isAutoLogin设置为true
    // 则无需调用conn.setPresence()
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
    console.log('onPresence')
    console.log(message)
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
