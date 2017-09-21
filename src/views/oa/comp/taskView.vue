<!--
描述：办公自动化-流程进度查看管理组件，显示流程进度图片
开发人：sunlf
开发日期：2017年8月17日
-->
<template lang="pug">
  div
    kalix-dialog(v-bind:title="title" v-bind:visible="visible" ref="kalixBizDialog"
    v-bind:close-on-click-modal="false" v-bind:formModel="formModel" v-bind:isView="isView")
      div.imgs(slot="dialogFormSlot")
        img(v-bind:src="imgUrl" style="width:100%")
</template>

<script type="text/ecmascript-6">
  import {ON_INIT_DIALOG_DATA} from '@/components/custom/event.toml'
  import {baseURL} from 'config/global.toml'
  import EventBus from 'common/eventbus'
  import Dialog from '@/components/custom/baseDialog.vue'
  import {Loading} from 'element-ui'

  const viewURL = baseURL + `/image?taskId=`
  const viewProcessURL = baseURL + `/image?processInstanceId=`
  let loadingInstance

  export default {
    data() {
      return {
        bizKey: 'processTask',
        title: '',
        visible: false,
        isView: true,
        imgUrl: '',
        formModel: {}
      }
    },
    created() {
    },
    mounted() {
      EventBus.$on(this.bizKey + '-' + ON_INIT_DIALOG_DATA, this.initData)
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      initData(row) {
        loadingInstance = Loading.service(
          {
            target: this.$el.querySelector('.el-dialog')
          })
        this.title = '流程进度查看-' + row.businessNo
        if (row.processInstanceId) { // 按流程实例id显示当前进度
          this.imgUrl = viewProcessURL + row.processInstanceId
        } else { // 按taskid显示当前进度
          this.imgUrl = viewURL + row.id
        }
        setTimeout(() => {
          loadingInstance.close()
        }, 400)
      }
    }
  }
</script>

<style scoped lang="stylus">

</style>
