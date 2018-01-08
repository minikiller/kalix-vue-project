<template lang="pug">
  kalix-dialog.user-add(
  bizKey="role"
  ref="kalixBizDialog"
  v-bind:form-model.sync="formModel"
  v-bind:visible="centerDialogVisible"
  v-bind:submitCustom="submitCustom")
    div.el-form(
    slot="dialogFormSlot"
    style="{width:100%}")
      el-transfer.kalix-transfer(v-model="userChecked" style="width:100%" filterable
      v-bind:titles="['可选项', '已选项']"
      v-bind:footer-format="{noChecked: '${total}', hasChecked: '${checked}/${total}'}"
      v-bind:data="dataList"
      v-on:change="handleChange")
</template>

<script>
  import Dialog from '@/components/custom/baseDialog.vue'
  import FormModel from './model'
  import {usersURL} from 'views/admin/config.toml'
  import EventBus from 'common/eventbus'
  import Message from 'common/message'
  export default {
    data() {
      return {
        userList: [],
        formModel: Object.assign({}, FormModel),
        dataList: [],
        userIds: [],
        ids: [],
        centerDialogVisible: false,
        dialogTitle: '',
        userChecked: [],
        usersURL: usersURL,
        targetURL: 'camel/rest/roles'
      }
    },
    created() {
      // 如果有传入 defaultIds
      this.getData()
      console.log('this.userChecked:', this.userChecked)
      console.log('如果有传入 defaultIds')
    },
    mounted() {
      console.log('如果有传入 mounted')
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      getData() {
        this.axios.get(usersURL, {}).then(response => {
          this.userList = response.data.data
          for (let i = 0; i < this.userList.length; i++) {
            this.dataList.push({
              key: this.userList[i].id,
              label: this.userList[i].name
            })
          }
          this.ids[0] = this.formModel.id.toString()
          console.log('this.ids[0]', this.ids[0])
          this.getCheckedUsers()
        })
      },
      getCheckedUsers() {
        let userCheckedUrl = this.targetURL + '/' + this.ids[0] + '/users/ids'
        console.log('userCheckedUrl', userCheckedUrl)
        this.axios.get(userCheckedUrl, {}).then(response => {
          if (response.data && response.data.length) {
            this.userChecked = response.data
          }
        })
      },
      submitCustom(baseDialog) {
        this.userIds = this.userIds.substring(0, this.userIds.length - 1)
        this.ids[1] = this.userIds
        this.axios.request({
          method: 'POST',
          url: `${this.targetURL}/${this.formModel.id}/users`,
          data: this.ids,
          params: {}
        }).then(response => {
          if (response.data.success) {
            Message.success(response.data.msg)
            baseDialog.visible = false
            baseDialog.$refs.dialogForm.resetFields()
            baseDialog.submitComplete()
          } else {
            Message.error(response.data.msg)
            baseDialog.submitComplete()
          }
        })
        console.log('this.ids', this.ids)
      },
      handleChange(value, direction, movedKeys) {
        for (let i = 0; i < movedKeys.length; i++) {
          this.userIds = this.userIds + movedKeys[i] + ','
        }
      },
      close() {
        this.onCancelClick()
      },
      onCancelClick() {
        console.log('dialog cancel button clicked !')
        this.centerDialogVisible = false
        this.$refs.dialogForm.resetFields()
//        this.$emit('update:formModel', JSON.parse(this.tempFormModel))
        this._afterDialogClose()
      },
      _afterDialogClose() {
        EventBus.$emit(this.bizKey + '-' + 'KalixDialogClose')
      }
    }
  }
</script>

<style lang="stylus">
  .kalix-transfer
    text-align center
    .el-checkbox
      display block
      text-align left
      & + .el-checkbox
        margin-left 0
    .el-transfer-panel__filter
      width auto !important

  .transfer-footer
    margin-left: 20px;
    padding: 6px 5px;

</style>
