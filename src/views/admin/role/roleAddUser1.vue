<template lang="pug">
  el-dialog(ref="kalixBizDialog" style="width:1300px;left:10%"
  v-bind:visible="centerDialogVisible"
  v-bind:title="dialogTitle"
  v-bind:close-on-click-modal="false"
  v-bind:before-close="close")
    el-form(v-bind:model.sync="formModel" ref="dialogForm" style="hight:1500px;width:1200px")
      el-transfer(v-model="userList" style="width:800px" filterable
      v-bind:left-default-checked="[2, 3]"
      v-bind:right-default-checked="[1]"
      v-bind:titles="['可选项', '已选项']"
      v-bind:footer-format="{noChecked: '${total}', hasChecked: '${checked}/${total}'}"
      v-bind:data="dataList"
      v-on:change="handleChange")
    div.dialog-footer(slot="footer")
      el-button(v-on:click="onCancelClick") 取 消
      el-button(type="primary" v-on:click="onSubmitClick") 提 交
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
        ids: [],
        centerDialogVisible: false,
        dialogTitle: ''
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
          console.log('this.dataList', this.dataList)
        })
      },
      open(_title, row) {
        this.centerDialogVisible = true
        this.dialogTitle = _title
        this.getData()
        this.ids[0] = row.id.toString()
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
        console.log('55555555555555', this.ids)
        this.axios.post('camel/rest/roles/' + this.ids[0] + '/users', this.ids)
          .then(function (response) {
            if (response.data.success) {
              Message.success(response.data.msg)
              this.centerDialogVisible = false
              this.$refs.kalixDialog.close()
              this.$refs.dialogForm.resetFields()
              // 关闭对话框
//                this.close()
              // 清空form
//                this.$parent.resetDialogForm()
//                this.$emit('resetDialogForm')
            } else {
              this.$refs.kalixDialog.close()
              Message.error(response.data.msg)
            }
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
