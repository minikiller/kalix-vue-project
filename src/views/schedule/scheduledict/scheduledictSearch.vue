<template lang="pug">
  div
    el-form-item(label="类型" prop="type")
      el-input(v-model="$parent.model.type")
    el-select(v-model="$parent.model.value" placeholder="请选择")
      el-option(v-for="item in options" v-bind:key="item.value" v-bind:label="item.label" v-bind:value="item.value")
</template>
<script type="text/ecmascript-6">
  export default {
    created() {
      window.p = this.$parent
      console.log(this.$parent)
    },
    data() {
      return {
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          },
          {
            value: '选项2',
            label: '双皮奶'
          },
          {
            value: '选项3',
            label: '蚵仔煎'
          },
          {
            value: '选项4',
            label: '龙须面'
          },
          {
            value: '选项5',
            label: '北京烤鸭'
          }
        ],
        mysearch: {
          form: {
            type: ''
          },
          rules: {
            type: [
              {required: true, message: '请输入类型', trigger: 'blur'}
            ]
          }
        }
      }
    }
  }
</script>
<style scoped lang="scss" type="text/scss">
</style>
