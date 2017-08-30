import Vue from 'vue'
import ChangeInput from '@/views/demo/ChangeInput'

const Constructor = Vue.extend(ChangeInput)
const vm = new Constructor().$mount()

describe('ChangeInput.vue', () => {
  beforeEach(() => {
  })

  it('should display Hello from Herman after Herman is typed in the text-box', done => {
    const outputEl = vm.$el.querySelector('#output')
    vm.$el.querySelector('#name').value = 'Herman'
    expect(vm.name = 'Herman')
    expect(outputEl.textContent).not.to.equal('Herman')
    vm.$nextTick(() => {
      expect(outputEl.textContent).to.equal('Herman')
      done()
    })
  })
})
