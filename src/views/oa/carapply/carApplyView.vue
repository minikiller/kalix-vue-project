<!--
描述：人员管理-会议申请-查看组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="meetapply"
  v-bind:form-model="formModel" v-bind:targetURL="targetURL"
  ref="kalixBizDialog"
  v-bind:isView="readonly"
  )

</template>

<script type="text/ecmascript-6">
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import UserSelect from '@/components/biz/userselect/userselect'
  import Cache from 'common/cache'
  import {formatDate} from 'common/typeFormat'
  //  import {usersURL} from 'views/admin/config.toml'

  export default {
    props: {
      formModel: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        targetURL: '',
        readonly: true,
        meetingTypeName: ''
      }
    },
    created() {
      this.labelWidth = '110px'
      console.log('[meetingApplyView.vue created] this.formModel:', this.formModel)
      console.log('[meetingApplyView.vue created] this.formModel.meetingType', this.formModel.meetingType)
      this.getMeetingTypeName()
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixUserSelect: UserSelect
    },
    methods: {
      getMeetingTypeName(meetingType) {
        const dict = JSON.parse(Cache.get('OA-DICT-KEY'))
        let item = dict.find(e => {
          return e.type === '会议类型' && e.value === meetingType
        })
        if (item) {
          return item.label
        }
        return ''
      },
      getDatetime(val) {
        let date = new Date(val)
        return formatDate(date, 'yyyy年MM月dd日 hh时mm分')
      }
    }
  }
</script>
