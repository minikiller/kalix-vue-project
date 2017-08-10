<template lang="pug" src="./Hello.pug">
</template>

<script type="text/ecmascript-6">
  import {msg} from './Hello.toml'
  import {PageConfig} from 'config/global.toml'
  import Editor from './editor.vue'
  import DemoForm from './demoForm.vue'
  //  import '../../mock/index'
  let mockData = {
    name: 'sunlf',
    label: 'dfd'
  }
  export default {
    name: 'hello',
    data() {
      return {
        msg: msg,
        row: {},
        formRules: {
          name: [
            {required: true, message: '请输入 name', trigger: 'blur'}
          ],
          label: [
            {required: true, message: '请输入 label', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      this.getData()
      this.row = mockData
    },
    components: {
      KalixEditor: Editor,
      KalixDemoForm: DemoForm
    },
    methods: {
      changeMsg() {
        this.msg = 'hello'
      },
      getData() {
        console.log(PageConfig)
//        setTimeout(() => {
//          this.$http.get('/camel/rest/roles').then((resp) => {
//            console.log(resp.data.data)
//          }).catch((err) => {
//            console.log(err.message)
//          })
//        }, 5000)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
  @import 'Hello.styl'
</style>
