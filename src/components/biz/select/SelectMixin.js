import BaseSelect from '@/components/custom/baseSelect'

export const SelectMixin = {
  props: ['value'],
  data() {
    return {
      currentValue: this.value
    }
  },
  methods: {
    onChange(item) {
      if (item) {
        this.$emit('input', item.id)
        this.$emit('selectChange', item)
      } else {
        this.$emit('input', null)
        this.$emit('selectChange', {id: null, name: null})
      }
    }
  },
  components: {
    KalixSelect: BaseSelect
  },
  watch: {
    value(newValue, oldValue) {
      this.currentValue = newValue
    }
  }
}
