import {destroyVM, createTest} from '../util'
import Example from '@/views/demo/Example'

describe('Example.vue', () => {
  let vm

  afterEach(() => {
    destroyVM(vm)
  })

  it('测试获取元素内容', () => {
    vm = createTest(Example, { content: 'Hello World' }, true)
    expect(vm.$el.querySelector('.hello h1').textContent).to.equal('Welcome!')
    expect(vm.$el.querySelector('.hello h2').textContent).to.equal('Hello World')
  })
})
