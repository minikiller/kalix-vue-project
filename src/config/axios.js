/**
 * axios 配置文件
 * Created by sunlf on 2017/7/21.
 */
import axios from 'axios'
// import ElementUI from 'element-ui'
import Message from 'common/message'
import {baseURL} from 'config/global.toml'
import {LoadingTimeOut, LoadingFailure} from 'config/info.toml'
import Cache from 'common/cache'
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = baseURL
// http请求拦截器
// var loadinginstace
axios.interceptors.request.use(config => {
  // element ui Loading方法
  // loadinginstace = ElementUI.Loading.service({fullscreen: true})
  const accessToken = Cache.get('access_token')
  const userToken = Cache.get('user_token')
  if (accessToken && userToken) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
    config.headers.AccessToken = accessToken
    config.headers.JSESSIONID = userToken
  }
  return config
}, error => {
  // loadinginstace.close()
  Message.error({
    message: LoadingTimeOut
  })
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
  // 响应成功关闭loading
  // loadinginstace.close()
  return data
}, error => {
  // loadinginstace.close()
  Message.error({
    message: LoadingFailure
  })
  return Promise.reject(error)
})

export default axios
