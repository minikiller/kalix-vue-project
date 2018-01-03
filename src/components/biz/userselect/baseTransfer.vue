<template lang="pug">
  el-transfer(v-model="userList" style="width:100%" filterable
      v-bind:left-default-checked="[2, 3]"
      v-bind:right-default-checked="[1]"
      v-bind:titles="['可选项', '已选项']"
      v-bind:footer-format="{noChecked: '${total}', hasChecked: '${checked}/${total}'}"
      v-bind:data="dataList"
      v-on:change="handleChange")
</template>

<script>
  import Dialog from '@/components/custom/baseDialog.vue'
  import {usersURL} from 'views/admin/config.toml'
  import EventBus from 'common/eventbus'

  export default {
    props: {
      size: {
        type: String,
        default: 'small'
      },
      bizKey: String,
      formModel: { // dialog中的form的数据模型，由父组件传递
        type: Object,
        required: true
      }
    },
    data() {
      return {
        userList: [],
        dataList: [],
        ids: [],
        centerDialogVisible: false,
        dialogTitle: ''
      }
    },
    created() {
      // 如果有传入 defaultIds
      console.log('如果有传入 defaultIdsvvvvvvvvvvvvvvvvvvvvvvvvvv')
    },
    mounted() {
      console.log('如果有传入 mountedeeeeeeeeeeeeeeeeeeeeeee')
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
