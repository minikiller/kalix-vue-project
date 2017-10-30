<template lang="pug">
  kalix-dialog.dataauth-addUser(bizKey="dataauth" ref="kalixBizDialog"
  style="width:1100px;left:20%" v-bind:form-model.sync="formModel" v-on:onSubmitClick="onSubmitClick")
    div.el-form(slot="dialogFormSlot" )
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
  import FormModel from './model'
  import {usersURL} from 'views/admin/config.toml'
  export default {
    data() {
      return {
        userList: [],
        formModel: Object.assign({}, FormModel),
        dataList: [],
        ids: []
      }
    },
    created() {
      // 如果有传入 defaultIds
      this.axios.get(usersURL, {}).then(response => {
        this.userList = response.data.data
        for (let i = 0; i < this.userList.length; i++) {
          this.dataList.push({
            key: this.userList[i].id,
            label: this.userList[i].loginName
          })
        }
      })
    },
    mounted() {
    },
    components: {
      KalixDialog: Dialog
    },
    methods: {
      handleChange(value, direction, movedKeys) {
        const ids = []
        let userIds = ''
        for (let i = 0; i < movedKeys.length - 1; i++) {
          userIds = userIds + movedKeys[i] + ','
        }
        userIds = userIds + movedKeys[movedKeys.length - 1]
        ids[0] = this.formModel.id
        ids[1] = userIds
        this.ids = ids
      },
      onSubmitClick() {
        this.axios.post('/dataauths/{this.formModel.id}/users', this.ids)
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
