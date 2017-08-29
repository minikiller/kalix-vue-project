import Vue from 'vue'
import Hello from '@/views/demo/Hello'
import {destroyVM} from '../util'

const Constructor = Vue.extend(Hello)  // 获得Hello组件实例
const vm = new Constructor().$mount() // 将组件挂在到DOM上

// 测试脚本里面应该包括一个或多个describe块，称为测试套件（test suite）
describe('Hello.vue', () => {
  afterEach(() => {
    destroyVM(vm)
  })
  // 每个describe块应该包括一个或多个it块，称为测试用例（test case）
  it('should render correct contents', () => {
    expect(vm.$el.querySelector('.hello h1').textContent)
      .to.equal('Welcome to Your Vue.js App')
  })
  it('should change contents', (done) => {
    vm.changeMsg()
    Vue.nextTick(() => {
      expect(vm.$el.querySelector('.hello h1').textContent)
        .to.equal('hello')
      done()
    })
  })

  // it('异步请求应该返回一个对象', done => {
  //   vm.$http
  //     .get('https://api.github.com')
  //     .end(function (err, res) {
  //       expect(res).to.be.an('object')
  //       done()
  //     })
  // })
})
