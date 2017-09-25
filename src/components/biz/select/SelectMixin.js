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
      this.$emit('selectChange', item)
    }
  },
  components: {
    KalixSelect: BaseSelect
  },
  watch: {
    currentValue(newValue, oldValue) {
      this.$emit('input', newValue)
    }
  }
}
