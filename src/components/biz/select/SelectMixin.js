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
      this.$emit('input', item.id)
      this.$emit('selectChange', item)
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
