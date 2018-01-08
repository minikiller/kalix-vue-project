<template lang="pug">
  kalix-dialog.user-add(
  bizKey="workgroup"
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
  import {rolesURL} from 'views/admin/config.toml'
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
        usersURL: rolesURL,
        targetURL: 'camel/rest/workgroups'
      }
    },
    created() {
    },
    mounted() {
      console.log('tttttttt======', 'abc2')
      this.getData()
      console.log('如果有传入 mounted')
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      getData() {
        console.log('userIds333333', this.userIds)
        this.axios.get(rolesURL, {}).then(response => {
          this.userList = response.data.data
          for (let i = 0; i < this.userList.length; i++) {
            this.dataList.push({
              key: this.userList[i].id,
              label: this.userList[i].name
            })
          }
          this.ids[0] = this.formModel.id.toString()
          this.getCheckedUsers()
        })
      },
      getCheckedUsers() {
        let userCheckedUrl = this.targetURL + '/' + this.ids[0] + '/users/ids'
        this.axios.get(userCheckedUrl, {}).then(response => {
          if (response.data && response.data.length) {
            this.userChecked = response.data
            this.userIds = this.userChecked
          }
        })
      },
      submitCustom(baseDialog) {
        this.userIds = this.userIds.join(',')
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
        if (direction === 'right') {
          this.userIds = this.userIds.concat(movedKeys)
        } else if (direction === 'left') {
          let tempId = []
          let m = 0
          for (let i = 0; i < this.userIds.length; i++) {
            let isHave = false
            for (let j = 0; j < movedKeys.length; j++) {
              if (this.userIds[i] === movedKeys[j]) {
                isHave = true
              }
            }
            if (!isHave) {
              tempId[m] = this.userIds[i]
              m++
            }
          }
          this.userIds = tempId
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


