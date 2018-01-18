<template lang="pug">
  kalix-dialog.user-add(bizKey="role" ref="kalixBizDialog"
  v-bind:targetURL="usersURL" v-bind:form-model="formModel")
    div.el-form(slot="dialogFormSlot" style="{width:100%}")
      transfer(v-bind:form-model="formModel" style="{width:100%}")
    div.dialog-footer(slot="footer")
      el-button(v-on:click="onCancelClick") 取 消
      el-button(type="primary" v-on:click="onSubmitClick") 提 交
</template>

<script>
  import Dialog from '@/components/custom/baseDialog.vue'
  import FormModel from './model'
  import {usersURL} from 'views/admin/config.toml'
  import EventBus from 'common/eventbus'
  import Transfer from '@/components/biz/userselect/baseTransfer.vue'

  export default {
    data() {
      return {
        userList: [],
        formModel: Object.assign({}, FormModel),
        dataList: [],
        ids: [],
        centerDialogVisible: false,
        dialogTitle: '',
        usersURL: usersURL
      }
    },
    created() {
      // 如果有传入 defaultIds
      console.log('如果有传入 defaultIds')
    },
    mounted() {
      console.log('如果有传入 mounted')
    },
    components: {
      KalixDialog: Dialog,
      Transfer: Transfer
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
          console.log('this.dataList', this.dataList)
        })
      },
      open(_title, row) {
        this.centerDialogVisible = true
        this.dialogTitle = _title
        this.getData()
        this.ids[0] = row.id
      },
      handleChange(value, direction, movedKeys) {
        let userIds = ''
        for (let i = 0; i < movedKeys.length - 1; i++) {
          userIds = userIds + movedKeys[i] + ','
        }
        userIds = userIds + movedKeys[movedKeys.length - 1]
        this.ids[1] = userIds
      },
      onSubmitClick() {
        this.axios.post('/dataauths/' + this.ids[0] + '/users', {ids: this.ids})
          .then(function (response) {
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
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

<style scoped>
  .transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }
</style>
