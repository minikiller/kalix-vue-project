export default {
  install(Vue, options) {
    Vue.prototype.$myConsoleLog = function (label, text = '', color = '#FF3300') {
      console.log(`%c[${label}]`, `color:${color}`, text)
    }
  }
}
/**
 * 使用
 * import MyConsole from 'common/MyConsole'
 * Vue.use(MyConsole)
 */
