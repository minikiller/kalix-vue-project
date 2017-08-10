import Vue from 'vue'
import Hello from '@/views/demo/Hello'

const Constructor = Vue.extend(Hello)
const vm = new Constructor().$mount()

describe('Hello.vue', () => {
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
})
