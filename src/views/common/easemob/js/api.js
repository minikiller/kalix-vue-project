/* eslint-disable */
import $ from 'jquery'
let api = {}
let userId
let instance
let clibinstance
let targetId='user10'
let config = {};
let vueObj=''
let voip=''


api.init = function (params, modules){
  var appKey = params.appKey;
  var token = params.token;
  var navi = params.navi || "";

  modules = modules || {};
  var RongIMLib = modules.RongIMLib || window.RongIMLib;
  var RongIMClient = RongIMLib.RongIMClient;
  var protobuf = modules.protobuf || null;

  var config = {};

  var config_emoji = {
    size: 24, // 大小, 默认 24, 建议15 - 55
    url: '../static/images/emojis.png', // 所有 emoji 的背景图片
    lang: 'zh', // 选择的语言, 默认 zh
    // 扩展表情
    extension: {
      dataSource: {
        "u1F914":{
          "en":"thinking face", // 英文名称
          "zh":"思考", // 中文名称
          "tag":"🤔", // 原生emoji
          "position":"0px 0px" // 所在背景图位置坐标
        },
      },
      // 新增 emoji 的背景图 url
      url: 'https://emojipedia-us.s3.amazonaws.com/thumbs/160/apple/96/thinking-face_1f914.png'
    }
  };

  //私有云切换navi导航，私有云格式 '120.92.10.214:8888'
  if(navi !== ""){
    config.navi = navi;
  }

  //私有云切换api,私有云格式 '172.20.210.38:81:8888'
  var api = params.api || "";
  if(api !== ""){
    config.api = api;
  }

  //support protobuf url + function
  if(protobuf != null){
    config.protobuf = protobuf;
  };


  RongIMLib.RongIMClient.init(appKey);

  // 初始化视频通话
  var localWindow = modules.localWindow;
  var options = {
    container : {
      local: $('#session_list')[0]
    }
  };
// 初始化 WebCallLib
  RongIMLib.RongCallLib.init(options);
  var instance = RongIMClient.getInstance();
  var CallLibInstance = RongIMLib.RongCallLib.getInstance();

  // 连接状态监听器
  RongIMClient.setConnectionStatusListener({
    onChanged: function (status) {
      // console.log(status);
      switch (status) {
        case RongIMLib.ConnectionStatus["CONNECTED"]:
        case 0:
          console.log("连接成功")
          RongIMLib.RongIMEmoji.init(config_emoji);
          callbacks.getInstance && callbacks.getInstance(instance);
          callbacks.getClibInstance&& callbacks.getClibInstance(CallLibInstance);
          break;

        case RongIMLib.ConnectionStatus["CONNECTING"]:
        case 1:
          console.log("连接中")
          break;

        case RongIMLib.ConnectionStatus["DISCONNECTED"]:
        case 2:
          console.log("当前用户主动断开链接")
          break;

        case RongIMLib.ConnectionStatus["NETWORK_UNAVAILABLE"]:
        case 3:
          console.log("网络不可用")
          break;

        case RongIMLib.ConnectionStatus["CONNECTION_CLOSED"]:
        case 4:
          console.log("未知原因，连接关闭")
          break;

        case RongIMLib.ConnectionStatus["KICKED_OFFLINE_BY_OTHER_CLIENT"]:
        case 6:
          console.log("用户账户在其他设备登录，本机会被踢掉线")
          break;

        case RongIMLib.ConnectionStatus["DOMAIN_INCORRECT"]:
        case 12:
          console.log("当前运行域名错误，请检查安全域名配置")
          break;
      }
    }
  });

  RongIMClient.setOnReceiveMessageListener({
    onReceived: function(message) {
      switch (message.messageType) {
        case RongIMClient.MessageType.InviteMessage:
          // 收到音视频通话邀请
          break;
        case RongIMClient.MessageType.SummaryMessage:
          // 结束音频通话后收到
          break;
        case RongIMClient.MessageType.RingingMessage:
          // 响铃消息
          break;
        case RongIMClient.MessageType.AcceptMessage:
          // 同意接听音视频通话消息
          break;
        case RongIMClient.MessageType.MediaModifyMessage:
          // 视频转音频消息
          break;
        //other conversationTypes
      }
    }
  });
  /*
   文档：http://www.rongcloud.cn/docs/web.html#3、设置消息监听器

   注意事项：
   1：为了看到接收效果，需要另外一个用户向本用户发消息
   2：判断会话唯一性 ：conversationType + targetId
   3：显示消息在页面前，需要判断是否属于当前会话，避免消息错乱。
   4：消息体属性说明可参考：http://rongcloud.cn/docs/api/js/index.html
   */
  RongIMClient.setOnReceiveMessageListener({
    // 接收到的消息
    onReceived: function (message) {
      // 判断消息类型
      console.log("新消息: " + message.targetId);
      console.log(message);
      callbacks.receiveNewMessage && callbacks.receiveNewMessage(message);
    }
  });

  //开始链接
  RongIMClient.connect(token, {
    onSuccess: function(userId) {
      callbacks.getCurrentUser && callbacks.getCurrentUser({userId:userId});
      console.log("链接成功，用户id----->：" + userId);
    },
    onTokenIncorrect: function() {
      console.log('token无效');
    },
    onError:function(errorCode){
      console.log(errorCode);
    }
  });
}
let callbacks = {
  getInstance : function(_instance) {
    instance = _instance
  },
  getClibInstance : function(_clibinstance) {
    clibinstance = _clibinstance
  },
  receiveNewMessage : function(message) {
    // 判断消息类型
    // console.log("新消息",message,start);
    api.receiveMessage(message)
  },
  getCurrentUser : function(userInfo) {
    userId = userInfo.userId
    api.afterConnected();
  }
}
//api.init(params, callbacks, config);
api.initRevice = function (reviecObj){
  vueObj=reviecObj;
  //voip=vueObj.attr("id");
}
api.afterConnected = function (){
  api.getConversationList()
  // document.getElementById("panel").style.display = "none";
  // document.getElementById("btns").style.display = "block";
}

api.disconnect = function (){
  /*
   文档：http://www.rongcloud.cn/docs/api/js/RongIMClient.html
   */

  var start = new Date().getTime();
  instance.disconnect();
}

api.reconnect = function (){
  /*
   1: reconnect 是重新连接，并没有重连机制，调用此方法前应该进行网络嗅探，网络正常再调用 reconnect。
   2: 提示其他设备登录请勿调用重连方法。
   3: docs   http://www.rongcloud.cn/docs/api/js/RongIMClient.html
   */

  var start = new Date().getTime();
  begin = new Date().getTime();
  RongIMClient.reconnect({
    onSuccess: function(userId) {
    },
    onTokenIncorrect: function() {
      console.log('token无效');
    },
    onError:function(errorCode){
      var info = '';
      switch (errorCode) {
        case RongIMLib.ErrorCode.TIMEOUT:
          info = '超时';
          break;
        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
          info = '未知错误';
          break;
        case RongIMLib.ErrorCode.UNACCEPTABLE_PROTOCOL_VERSION:
          info = '不可接受的协议版本';
          break;
        case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
          info = 'appkey不正确';
          break;
        case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
          info = '服务器不可用';
          break;
      }
    }
  });
}

//消息撤回变量及设置
var recallMessage = null;

api.setRecallMessage = function (message,obj){
  // recallMessage = message;
  // recallMessage='<div class="receiver"><div class="receiver-avatar"><img src="http://www.qinghuwai.com/uploadfile/member/6/avatar/6.jpg"></div><div class="receiver-cont"><div class="left_triangle"></div><span>'+message.content+'</span></div></div>'
  obj.append('<div style="float:right" class="receiver"><div class="receiver-avatar"><img src="/static/images/im/6.jpg" width="30" height="30"></div><div class="receiver-cont"><div class="left_triangle"></div><span>'+message.content.content+'</span></div></div>')
}

api.sendTextMessage = function (session_show,centent){
  /*
   文档： http://www.rongcloud.cn/docs/web.html#5_1、发送消息
   http://rongcloud.cn/docs/api/js/TextMessage.html
   1: 单条消息整体不得大于128K
   2: conversatinType 类型是 number，targetId 类型是 string
   */
  var conversationType = RongIMLib.ConversationType.PRIVATE;
  /*
   1、不要多端登陆，保证所有端都离线
   2、接收 push 设备设置:
   （1）打开系统通知提醒
   （2）小米设置 “授权管理” －> “自己的应用” 为自启动
   （3）应用内不要屏蔽新消息通知
   3、内置消息类型，默认 push，自定义消息类型需要
   pushData 显示逻辑顺序：自定义 > 默认
   4、发送其他消息类型与发送 TextMessage 逻辑、方式一致
   */
  var pushData = "pushData" + Date.now();
  var isMentioned = false;
 var message= RongIMLib.RongIMEmoji.symbolToHTML(centent[0].innerText);
  console.log(message);
  var content = {
    content: [ message
    ].join(","),
    user : {
      "id" : "this-is-a-test-id",	//不支持中文及特殊字符
      "name" : "张三",
      "portrait" : "http://rongcloud.cn/images/newVersion/log_wx.png"
    },
    extra: "{\"key\":\"value\", \"key2\" : 12, \"key3\":true}"
  };

  var msg = new RongIMLib.TextMessage(content);
// var targetId="fwb";
  var start = new Date().getTime();
    instance.sendMessage(conversationType, targetId, msg, {
    onSuccess: function (message) {
      api.setRecallMessage(message,session_show);

      console.log("发送文字消息 成功",message,start);
    },
    onError: function (errorCode,message) {
      console.log("发送文字消息 失败",message,start);
    }
  }, isMentioned, pushData);
}

api.sendImageMessage = function (){
  /*
   文档：http://www.rongcloud.cn/docs/api/js/ImageMessage.html

   需自行解决文件上传
   上传插件（含获取缩略图方法）: https://github.com/rongcloud/rongcloud-web-im-upload

   缩略图必须是base64码的jpg图，而且不带前缀"data:image/jpeg;base64,"，不得超过100K
   压缩：https://github.com/rongcloud/rongcloud-web-im-upload/blob/master/resize.html
   */

  var content = {
    imageUri: "http://rongcloud.cn/images/newVersion/log_wx.png",
    content: getBase64Image()
  };

  var msg = new RongIMLib.ImageMessage(content);

  var start = new Date().getTime();
  api.instance.sendMessage(conversationType, targetId, msg, {
    onSuccess: function (message) {
      api.setRecallMessage(message);
    },
    onError: function (errorCode,message) {
    }
  });
}

api.sendFileMessage = function (){
  /*
   文档：http://www.rongcloud.cn/docs/api/js/ImageMessage.html

   upload组件：https://github.com/rongcloud/rongcloud-web-im-upload
   上传插件文档: http://rongcloud.cn/docs/web.html#上传插件

   单条消息整体不得大于128K

   文件消息分两步：
   1、上传文件至文件服务器
   2、发送文件信息和文件 URL
   */

  var content = {
    name: 'log_wx', // 文件名称
    size: '20k', // 文件大小，单位自己约定
    type: 'png', // 文件的后缀名，例如 png、js、doc ...
    fileUrl: 'http://rongcloud.cn/images/newVersion/log_wx.png' // 文件地址
  };

  var msg = new RongIMLib.FileMessage(content);
var targetId="user10";
  var start = new Date().getTime();
  api.instance.sendMessage(conversationType, targetId, msg, {
    onSuccess: function (message) {
      api.setRecallMessage(message);
    },
    onError: function (errorCode,message) {
    }
  });
}

api.sendVoiceMessage = function (){
  /*
   文档：http://www.rongcloud.cn/docs/api/js/VoiceMessage.html

   需自行解决录音和转码问题，要求编码为base64格式amr，不带前缀，不得超过100K

   声音播放：https://rongcloud.github.io/websdk-demo/voice.html
   */
  var content = {
    content : voice, //form res/voice-amr-base64.json
    duration : 20
  };

  var msg = new RongIMLib.VoiceMessage(content);

  var start = new Date().getTime();
  api.instance.sendMessage(conversationType, targetId, msg, {
    onSuccess: function (message) {
      api.setRecallMessage(message);
    },
    onError: function (errorCode,message) {
    }
  });
}

api.sendAtMessage = function (){
  /*
   @ 消息对象
   全部：RongIMLib.MentionedType.ALL；
   部分：RongIMLib.MentionedType.PART

   文档说明：http://support.rongcloud.cn/kb/NjE1
   接收@代码：https://rongcloud.github.io/websdk-demo/connect-check.html
   */
  var mentioneds = new RongIMLib.MentionedInfo();
  mentioneds.type = RongIMLib.MentionedType.PART;
  mentioneds.userIdList = [targetId, targetId2];

  var content = {
    content: "This is a at message!",
    extra: "extra info",
    mentionedInfo: mentioneds
  };
  var msg = new RongIMLib.TextMessage(content);

  var start = new Date().getTime();
  instance.sendMessage(conversationType, targetId, msg, {
    onSuccess: function (message) {
      //message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
    },
    onError: function (errorCode,message) {
    }
  }, true);
}

api.registerMessage = function (type){
  var messageName = type; // 消息名称。
  var objectName = "s:" + type; // 消息内置名称，请按照此格式命名 *:* 。
  var mesasgeTag = new RongIMLib.MessageTag(true,true); //true true 保存且计数，false false 不保存不计数。
  var propertys = ["name","age","gender"]; // 消息类中的属性名。

  RongIMClient.registerMessageType(messageName,objectName,mesasgeTag,propertys);
}
api.sendRegisterMessage = function (){
  /*
   文档：http://www.rongcloud.cn/docs/web_api_demo.html#自定义消息

   注意事项：
   1：init之前注册新消息类型
   2：对应接收 onReceived: function (message) {}
   message.messageType == "PersonMessage"
   3：需要自己做解析实现
   */

  registerMessage("PersonMessage");

  var content = {
    name:"RegisterMessage",
    age:3,
    gender:"male"
  };

  var msg = new RongIMClient.RegisterMessage.PersonMessage(content);

  var start = new Date().getTime();
  instance.sendMessage(conversationType, targetId, msg, {
    onSuccess: function (message) {
      setRecallMessage(message);
    },
    onError: function (errorCode,message) {
      ("发送自定义消息失败",message,start);
    }
  });
}

api.sendLocationMessage = function (){
  /*
   文档：http://www.rongcloud.cn/docs/api/js/LocationMessage.html

   缩略图必须是base64码的jpg图，而且不带前缀"data:image/jpeg;base64,"，不得超过100K

   需要自己做显示效果，一般显示逻辑：图片加链接，传入经纬度并跳转进入地图网站
   */

  var content = {
    "content":getBase64Image(),
    "latitude":"24.114",
    "longitude":"334.221",
    "poi":"北京市朝阳区北苑路北辰泰岳大厦"
  };

  var msg = new RongIMLib.LocationMessage(content);

  var start = new Date().getTime();
  instance.sendMessage(conversationType, targetId, msg, {
    onSuccess: function (message) {
      setRecallMessage(message);
      console.log("发送自定义消息成功");
    },
    onError: function (errorCode,message) {
      console.log("发送自定义消息失败");
    }
  });
}

api.sendRichContentMessage = function (){
  /*
   http://www.rongcloud.cn/docs/api/js/RichContentMessage.html
   */

  var content = {
    "title": "sendRichContentMessage",
    "content": "<a href=\"http://www.rongcloud.cn\">hello</a>",
    "imageUri": "http://www.demo.com/1.jpg",
    "url": "http://www.rongcloud.cn/",
    "extra": "{\"key\":\"value\"}"
  };

  var msg = new RongIMLib.RichContentMessage(content);

  var start = new Date().getTime();
  instance.sendMessage(conversationType, targetId, msg, {
    onSuccess: function (message) {
      setRecallMessage(message);
      console.log("发送图文消息成功");
    },
    onError: function (errorCode,message) {
      console.log("发送图文消息失败");
    }
  });
}

api.SendSyncReadStatusMessage = function (){
  /*
   一端发送，其他端接受并做同步更新
   具体处理说明文档： http://support.rongcloud.cn/kb/NjE0
   */
  var sentTime = 1486975569605;// message 的 sentTime 服务器端时间
  var content = {
    lastMessageSendTime: sentTime
  };
  var msg = new RongIMLib.SyncReadStatusMessage(content);

  var start = new Date().getTime();
  instance.sendMessage(conversationType, targetId, msg, {
    onSuccess: function (message) {
      console.log("发送同步消息成功");
    },
    onError: function (errorCode,message) {
      console.log("发送同步消息失败");
    }
  });
}

api.sendRecallMessage = function (){
  if(recallMessage == null){
    alert("请先发送任意一条消息会再执行撤回");
    return;
  }
  //消息撤回服务器端没有时间限制，由客户端决定

  var start = new Date().getTime();
  instance.sendRecallMessage(recallMessage, {
    onSuccess: function (message) {
      console.log("撤回成功");
    },
    onError: function (errorCode,message) {
      console.log("撤回失败");
    }
  });
}

api.checkUnreadMessage = function (){
  /*
   http://www.rongcloud.cn/docs/web.html#5_5、检测是否有未读的消息

   此接口必须在init()方法之后调用，但不依赖于connect
   只返回true/false，不返回具体的未读数量
   若连接成功后调用此方法将一直返回 false。
   */

  var start = new Date().getTime();
  instance.hasRemoteUnreadMessages(token,{
    onSuccess:function(hasMessage){
      if(hasMessage){
        // 有未读的消息
      }else{
        // 没有未读的消息
      }
      console.log("检查未读消息成功");
    },onError:function(err){
      console.log("检查未读消息失败");
    }
  });
}

api.getHistroyMessage = function (){
  /*
   文档：http://www.rongcloud.cn/docs/web_api_demo.html#获取历史消息

   注意事项：
   1：一定一定一定要先开通 历史消息云存储 功能，本服务收费，测试环境可免费开通
   2：登录开发者后台可以直接开启 https://developer.rongcloud.cn/app
   2：timestrap第二次拉取必须为null才能实现循环拉取
   */

  var count = 3;  // 2 <= count <= 20
  var timestrap = null; //0, 1483950413013

  var start = new Date().getTime();
  instance.getHistoryMessages(conversationType, targetId, timestrap, count, {
    onSuccess: function(list, hasMsg) {
      //可通过sort订制其他顺序
      list.sort(function(a,b){
        return a.sentTime < b.sentTime;
      });
      console.log("获取历史消息成功");
    },
    onError: function(error) {
      console.log("获取历史消息失败");
    }
  });
}

api.getConversationList = function (){
  /*
   文档：http://www.rongcloud.cn/docs/web_api_demo.html#会话接口
   http://www.rongcloud.cn/docs/web.html#5_2、同步会话列表
   http://www.rongcloud.cn/docs/api/js/Conversation.html

   历史消息云存储开通位置：https://developer.rongcloud.cn/service/roam/rXxI4IAJjxRAD72SpQ==

   注意事项：
   1：一定一定一定要先开通 历史消息云存储 功能，本服务收费，测试环境可免费开通
   2：只有发过消息才能生成会话
   */

  var conversationTypes = null;  //具体格式设置需要补充
  var limit = 150; //获取会话的数量，不传或传null为全部，暂不支持分页
  var start = new Date().getTime();
    instance.getConversationList({
    onSuccess: function(list) {
      var datas=[];
    for(var i=0;i<list.length;i++) {
      var newDate =formatDateTime(list[i].latestMessage.sentTime);
      // datas.push({
      //   username:list[i].latestMessage.content.user.name,
      //   content:list[i].latestMessage.content.content,
      //   time:newDate
      // })
      var id="lt_win"+i;
     $('#user-list-session').append('<li id="'+id+'" onclick=onSelectUserChat("'+id+'","isChatShow_win") ' +
                                    'class="user-list_item"><div class="avatar_wrapper">' +
                                    '<img class="avatar" src="../static/images/im/4.jpg"/></div>' +
                                    '<div class="user-list_item_main">' +
                                    '<p class="member_nick">'+list[i].latestMessage.content.user.name+'</p>' +
                                    '<p class="member_msg text_ellipsis">'+list[i].latestMessage.content.content+'</p></div>' +
                                    '<div class="time">'+newDate+'</div></li>');
    }
      var title = "成功获取1 " + list.length + " 个会话";
      console.log(title);
      return datas
    },
    onError: function(error) {
      console.log("获取会话失败");
    }
  }, conversationTypes, limit);
}

api.getConversation = function (){
  //需在 getConversationList 方法执行之后执行，否则返回null
  var start = new Date().getTime();

  instance.getConversation(conversationType, targetId, {
    onSuccess:function(result){
      console.log("获取群组会话 成功", result, start);
    },
    onError:function(error){
      console.log("获取群组会话 失败", error, start);
    }
  });
}

api.removeConversation = function (){
  var start = new Date().getTime();
  instance.removeConversation(conversationType, targetId, {
    onSuccess:function(result){
      console.log("删除会话成功",result,start);
    },
    onError:function(error){
      // error => 清除会话错误码。
      console.log("删除会话失败",error,start);
    }
  });
}

api.clearConversation = function (){
  var start = new Date().getTime();
  instance.clearConversations({
    onSuccess:function(){
      console.log("清除会话成功",null,start);
    },
    onError:function(error){
      // error => 清除会话错误码。
      console.log("清除会话失败",error,start);
    }
  });
}

api.getUnreadCount = function (){
  /*
   阅读时间戳缓存在 localStorage 中，消息状态根据发送时间和阅读时间戳对比判断
   每次接受新消息后通过重新调用此方法计算
   */
  var start = new Date().getTime();
  instance.getUnreadCount(conversationType,targetId,{
    onSuccess:function(count){
      console.log("获取会话未读数成功", count, start);
    },
    onError:function(error){
      console.log("获取会话未读数失败", error, start);
    }
  });
}

api.getTotalUnreadCount = function (){
  /*
   阅读时间戳缓存在 localStorage 中，消息状态根据发送时间和阅读时间戳对比判断
   每次接受新消息后通过重新调用此方法计算
   */
  var start = new Date().getTime();
  instance.getTotalUnreadCount({
    onSuccess:function(count){
      console.log("获取总未读数成功", count, start);
    },
    onError:function(error){
      console.log("获取总未读数失败", error, start);
    }
  });
}

api.clearUnreadCount = function (){
  /*
   此方法清除当前端的未读数，并不会多端同步，
   多端同步需要发送 SyncReadStatusMessage：http://support.rongcloud.cn/kb/NjE0
   */

  var start = Date.now();
  instance.clearUnreadCount(conversationType,targetId,{
    onSuccess:function(){
      console.log("清除未读数成功", "success", start);
    },
    onError:function(error){
      console.log("清除未读数失败", error, start);
    }
  });
}


api.receiveMessage = function (message){
 var message_zh= RongIMLib.RongIMEmoji.symbolToHTML(message.content.content);
  vueObj.append('<div class="receiver"><div class="receiver-avatar"><img src="/static/images/im/6.jpg" width="30" height="30"></div><div class="receiver-cont"><div class="left_triangle"></div><span>'+message_zh+'</span></div></div>');
}


//加入聊天室后，可以用任意一个发送消息的方法发送消息，只需要conversationType为CHATROOM
var chatRoomId = "chatRoomId-008"; // 聊天室 Id,可任意指定，能区分不同聊天室即可
var count = 10; //拉取最近的会话内容（最多50条），-1不拉取

api.enterChatroom = function (){
  /*
   http://www.rongcloud.cn/docs/web_api_demo.html#聊天室

   聊天室不支持通过 getHistoryMessages 方法获取历史消息，

   count：//拉取最近的会话内容（最多50条），-1不拉取
   */

  var start = new Date().getTime();
  instance.joinChatRoom(chatRoomId, count, {
    onSuccess: function() {
      console.log("加入聊天室成功",null,start);
    },
    onError: function(error) {
      console.log("加入聊天室失败",null,start);
    }
  });
}

api.quitChatroom = function (){
  var start = new Date().getTime();
  instance.quitChatRoom(chatRoomId, {
    onSuccess: function() {
      console.log("退出聊天室成功",null,start);
    },
    onError: function(error) {
      console.log("退出聊天室失败",null,start);
    }
  });
}

api.getChatroomInfo = function (){
  /*
   需确认 当前用户 已加入聊天室
   */
  var order = RongIMLib.GetChatRoomType.REVERSE;// 排序方式。
  var memberCount = 10; // 获取聊天室人数 （范围 0-20 ）

  var start = new Date().getTime();
  instance.getChatRoomInfo(chatRoomId, memberCount, order, {
    onSuccess: function(chatRoom) {
      // chatRoom => 聊天室信息。
      // chatRoom.userInfos => 返回聊天室成员。
      // chatRoom.userTotalNums => 当前聊天室总人数。
      console.log("获取聊天室信息成功",chatRoom,start);
    },
    onError: function(error) {
      console.log("获取天室信息失败",error);
    }
  });
}

api.sendMessageToChatroom = function (){
  var content = {
    content:"hello，time：" + new Date().getTime(),
    extra:"RongCloud"
  };

  var conversationType = RongIMLib.ConversationType.CHATROOM; // 私聊
  var msg = new RongIMLib.TextMessage(content);

  var start = new Date().getTime();
  instance.sendMessage(conversationType, chatRoomId, msg, {
    onSuccess: function (message) {
      console.log("发送聊天室消息成功",message,start);
    },
    onError: function (errorCode,message) {
      console.log("发送聊天室消息失败",message,start);
    }
  });
}


var discussionName = "shuise`s discussion"; // 名称自定义
var userIds = [userId,targetId];//讨论组初始成员。
var discussionId;

api.getDiscussionInfo = function (discussionId,start){
  instance.getDiscussion(discussionId,{
    onSuccess:function(discussion){
      console.log("讨论组信息获取成功",discussion,start);
    },
    onError:function(error){
      console.log("讨论组信息获取失败",error,start);
    }
  });
}

api.createDiscussion = function (){
  /*
   http://www.rongcloud.cn/docs/web_api_demo.html#讨论组

   */
  var start = new Date().getTime();
  instance.createDiscussion(discussionName,userIds,{
    onSuccess:function(discussionId){
      window.discussionId = discussionId;
      getDiscussionInfo(discussionId,start);
    },
    onError:function(error){
      console.log("讨论组创建失败",error,start);
    }
  });
}

api.setDiscussionName = function (){
  var start = new Date().getTime();
  var discusstionName = "another discussion";

  instance.setDiscussionName(discussionId,discusstionName,{
    onSuccess:function(){
      console.log("讨论组改名成功",null,start);
      getDiscussionInfo(discussionId,start);
    },
    onError:function(error){
      console.log("讨论组改名失败",error,start);
    }
  });
}

api.setDiscussionStatus = function (){
  var status = RongIMLib.DiscussionInviteStatus.CLOSED;
  /* 讨论邀请状态 ，默认开放
   0 ： 开发邀请，
   1：关闭邀请
   RongIMLib.DiscussionInviteStatus.OPEND
   RongIMLib.DiscussionInviteStatus.CLOSED
   */
  var start = new Date().getTime();
  instance.setDiscussionInviteStatus(discussionId,status,{
    onSuccess:function(){
      getDiscussionInfo(discussionId, start);
    },
    onError:function(error){
      console.log("讨论组状态修改成功",error,start);
    }
  });
}

api.addMemberToDiscussion = function (){
  var userIds = [targetId2];//被邀请成员。

  var start = new Date().getTime();
  instance.addMemberToDiscussion(discussionId,userIds,{
    onSuccess:function(){
      getDiscussionInfo(discussionId, start);
    },
    onError:function(error){
      console.log("讨论组加人失败",error,start);
    }
  });
}

api.removeMemberFromDiscussion = function (){
  var userIds = targetId2;//被邀请成员。

  var start = new Date().getTime();

  instance.removeMemberFromDiscussion(discussionId,userIds,{
    onSuccess:function(){
      getDiscussionInfo(discussionId, start);
    },
    onError:function(error){
      console.log("讨论组加人失败",error,start);
    }
  });
}

api.quitDiscussion = function (){
  var start = new Date().getTime();

  instance.quitDiscussion(discussionId,{
    onSuccess:function(){
      showTips("退出讨论组 成功");
      // console.log("讨论组踢人成功",null,start);

      getDiscussionInfo(discussionId, start);
    },
    onError:function(error){
      console.log("退出讨论组 失败",error,start);
    }
  });
}


/*
 公众号
 RongIMLib.ConversationType = {
 APP_PUBLIC_SERVICE : "应用服务平台 mc",
 PUBLIC_SERVICE : "公众服务平台 mp"
 };
 */

var publicServiceType = RongIMLib.ConversationType.APP_PUBLIC_SERVICE; //固定值
var publicServiceId = "Rong_shuise"; //RongCloud
var searchType = 1; //[0-exact 1-fuzzy]
var keywords = "Rong";
// var keywords = "test";

/*
 用户给公众号发消息
 var conversationType = RongIMLib.ConversationType.PUBLIC_SERVICE;
 var targetId = publicServiceId
 */

api.sendToPublic = function (){
  /*
   文档： http://www.rongcloud.cn/docs/web.html#5_1、发送消息
   http://rongcloud.cn/docs/api/js/TextMessage.html
   1: 单条消息整体不得大于128K
   2: conversatinType 类型是 number，targetId 类型是 string
   */

  var content = {
    content: "公众号你好"
  };

  var msg = new RongIMLib.TextMessage(content);

  var start = new Date().getTime();
  instance.sendMessage(publicServiceType, publicServiceId, msg, {
    onSuccess: function (message) {
      console.log("公众号留言 成功",message,start);
    },
    onError: function (errorCode,message) {
      console.log("公众号留言 失败",message,start);
    }
  });
}

api.getPublicHistroyMessage = function (){
  alert("暂不支持");

  // var count = 10;  // 2 <= count <= 20
  // var timestrap = null; //0, 1483950413013

  // var start = new Date().getTime();
  // instance.getHistoryMessages(publicServiceType, publicServiceId, timestrap, count, {
  // 	onSuccess: function(list, hasMsg) {
  // 	},
  // 	onError: function(error) {
  // 	}
  // });
}

api.getPublicServiceList = function (){
  /*
   getRemotePublicServiceList = function (mpId, conversationType, pullMessageTime, callback)
   */
  var start = new Date().getTime();

  instance.getPublicServiceList({
    onSuccess:function(list){
      console.log("获取已关注公众号 成功",list,start);
    },
    onError:function(error){
      console.log("搜索获取已关注公众号公众号 失败",error,start);
    }
  });
}

api.searchPublicService = function (){
  /*
   WebAPI文档：http://www.rongcloud.cn/docs/api/js/RongIMClient.html
   iOS文档：http://www.rongcloud.cn/docs/ios_imlib.html#公众服务
   */
  var start = new Date().getTime();

  instance.searchPublicService(searchType, keywords, {
    onSuccess:function(list){
      console.log("查找公众号 成功",list,start);
    },
    onError:function(error){
      console.log("查找公众号 失败",error,start);
    }
  });
}

// function searchPublicServiceByType(){
// 	var start = new Date().getTime();

// 	instance.searchPublicServiceByType(publicServiceType, searchType, keywords, {
// 	    onSuccess:function(list){
//             showTips("搜索公众号by type 成功");
//             console.log("搜索公众号by type 成功",list,start);
// 	    },
// 	    onError:function(error){
// 	    	showTips("搜索公众号by type 失败");
// 	    	console.log("搜索公众号by type 失败",error,start);
// 	    }
// 	});
// }

api.subscribePublicService = function (){
  /*
   http://www.rongcloud.cn/docs/api/js/RongIMClient.html

   */
  var start = new Date().getTime();

  instance.subscribePublicService(publicServiceType, publicServiceId, {
    onSuccess:function(list){
      console.log("订阅公众号 成功",list,start);
    },
    onError:function(error){
      console.log("订阅公众号 失败",error,start);
    }
  });
}

api.unsubscribePublicService = function (){
  /*
   http://www.rongcloud.cn/docs/api/js/RongIMClient.html

   */
  var start = new Date().getTime();

  instance.unsubscribePublicService(publicServiceType, publicServiceId, {
    onSuccess:function(list){
      console.log("取消订阅公众号 成功",list,start);
    },
    onError:function(error){
      console.log("取消订阅公众号 失败",error,start);
    }
  });
}

api.getPublicServiceProfile = function (){
  /*
   http://www.rongcloud.cn/docs/api/js/RongIMClient.html

   必须是已经关注的公众号，才能获取到详情
   */
  var start = new Date().getTime();

  instance.getPublicServiceProfile(publicServiceType, publicServiceId, {
    onSuccess:function(profile){
      console.log("获取公众号详情 成功",profile,start);
    },
    onError:function(){
      cosnole.log("获取公众号详情 error");
    }
  });
}

//获取base64假数据方法
api.getBase64Image = function (){
  var canvas = document.createElement("canvas");
  canvas.width = 100;
  canvas.height = 100;


  var context = canvas.getContext("2d");
  context.font = "20pt Arial";
  context.fillStyle = "blue";
  context.fillText("RongCloud.cn", 10, 20);
  var content = canvas.toDataURL("image/jpeg");
  content = content.replace("data:image/jpeg;base64,","");
  return content;
}

api.setUserStatus = function (){
  /*
   自定义在线状态(举例)：

   1、在线
   status : 10

   2、离开
   status : 11

   3、忙碌
   status : 12

   */
  var start = new Date().getTime();
  var status = 10;
  instance.setUserStatus(status, {
    onSuccess:function(status){
      // 此时别人 调用 setUserStatusListener 查询当前用户的在线状态 status 值为 10；
      console.log("设置在线状态成功", status, start);
    },
    onError:function(error){
      cosnole.log("设置在线状态 error:" + error);
    }
  });
}

api.setUserStatusListener = function (){
  var start = new Date().getTime();
  var params =  {
    userIds: targetIds
  };
  // 批量获取用户信息，逐个返回
  instance.setUserStatusListener(params, function(userStatus){
    console.log(userStatus);
    /*
     userStatus 结构: {"status":[{"platform":["web"],"online":1,"status":10}],"userId":null}
     platform 平台: web | Android | iOS | pc
     online 在线标示: 1 | 0 , 1 表示在线，反之不在线
     status 自定义状态, 通过 setUserStatus 设置
     */
    console.log("获取用户在线状态成功", userStatus, start);
  });
}


 var mediaType = RongIMLib.VoIPMediaType.MEDIA_VEDIO; //视频通话
// //var mediaType = RongIMLib.VoIPMediaType.MEDIA_AUDIO; //音频通话
//
var converType = RongIMLib.ConversationType.PRIVATE;
// // var targetId = "targetId";
 var invertUserIds = ["user10"];
 var extra = "";
//
api.startDoCall = function (){
  clibinstance.startCall(converType,targetId,invertUserIds,mediaType,extra,{
    onSuccess:function(){
      // => startCall successfully
      console.log('发起视频通话成功');
    },
    onError:function(err){
      // => startCall error
    }
  });
}
api.joinCall = function () {
  clibinstance.joinCall(mediaType, {
    onSuccess: function () {
      console.log("接受视频成功");
    },
    onError: function (err) {
      console.log("acceptVideo err ", err);
    }
  });
}
api.hungupCall = function () {
  clibinstance.hungupCall(conversationType, targetId, ErrorCode.HANGUP);
}

api.getAllEmoji = function () {
  var list = RongIMLib.RongIMEmoji.list;
  var shadowDomList = [];
  for (var i = 0; i < list.length; i++) {
    shadowDomList.push(list[i].node);
  }
  bindClickEmoji(shadowDomList);
}

function bindClickEmoji(emojis) {
  for(var i=0;i<emojis.length;i++){
    var emojiHtml = emojis[i];
    vueObj.append(emojiHtml);
    emojiHtml.onclick = clickEmoji;
  }
}
var edit=$('#content');
edit.onfocus = function () {
  window.setTimeout(function () {
    var sel, range;
    if (window.getSelection && document.createRange) {
      range = document.createRange();
      range.selectNodeContents(edit);
      range.collapse(true);
      range.setEnd(edit, edit.childNodes.length);
      range.setStart(edit, edit.childNodes.length);
      sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(edit);
      range.collapse(true);
      range.select();
    }
  }, 1)
}

function clickEmoji(event) {
  var e = event || window.event;
  var target = e.target || e.srcElement;
  if (document.all && !document.addEventListener === false) {
  }
 // var message = RongIMLib.RongIMEmoji.symbolToHTML(target.getAttribute("name"));
  $('#content').focus();
  //setFocus($('#content'));
 // console.log(target);
 // setFocus($('#content'));
  pasteHtmlAtCaret(target.getAttribute("name"));
}

// function appendChild(text) {
//
//   pasteHtmlAtCaret(text,false);
//   //$('#content').append(text);
// }

function setFocus(el) {
  el = el[0]; // jquery 对象转dom对象
  el.focus();
  var range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  var sel = window.getSelection();
  //判断光标位置，如不需要可删除
  if(sel.anchorOffset!=0){
    return;
  };
  sel.removeAllRanges();
  sel.addRange(range);
};

function pasteHtmlAtCaret(html, selectPastedContent) {
  var sel, range;
  if (window.getSelection) {
    // IE9 and non-IE
    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      range = sel.getRangeAt(0);
      range.deleteContents();
      // Range.createContextualFragment() would be useful here but is
      // only relatively recently standardized and is not supported in
      // some browsers (IE9, for one)
      var el = document.createElement("div");
      el.innerHTML = html;
      var frag = document.createDocumentFragment(), node, lastNode;
      while ( (node = el.firstChild) ) {
        lastNode = frag.appendChild(node);
      }
      //var firstNode = frag.firstChild;
      range.insertNode(frag);
      // Preserve the selection
      if (lastNode) {
         range = range.cloneRange();
         range.setStartAfter(lastNode);
        if (selectPastedContent) {
          range.setStartBefore(firstNode);
        } else {
          range.collapse(true);
        }
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if ( (sel = document.selection) && sel.type != "Control") {
    // IE < 9
    var originalRange = sel.createRange();
    originalRange.collapse(true);
    sel.createRange().pasteHTML(html);
    if (selectPastedContent) {
      range = sel.createRange();
      range.setEndPoint("StartToStart", originalRange);
      range.select();
    }
  }
}


function formatDateTime(inputTime) {
  var date = new Date(inputTime);
  var y = date.getFullYear();
  var m = date.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h = h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  var second = date.getSeconds();
  minute = minute < 10 ? ('0' + minute) : minute;
  second = second < 10 ? ('0' + second) : second;
  return  h+':'+minute;
};
export default {api,recallMessage}
