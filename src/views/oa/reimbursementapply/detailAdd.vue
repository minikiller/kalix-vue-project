<!--
描述：办公自动化-报销申请-详细信息-新增组件
开发人：hqj
开发日期：2017年11月10日
-->

<template lang="pug">
  kalix-dialog.user-add(bizKey="reimbursementApplyDetail" ref="kalixBizDialog" v-bind:formModel.sync="detailFormModel" v-bind:targetURL="targetURL")
    div.el-form.kalix-form-table(slot="dialogFormSlot")
      // div.table-title 吉林动画学院报销申请表详细信息
      div.table-title 吉林动画学院差旅费用报销单详细信息
      el-form-item(label="主表id" prop="reimbursementApplyId" v-bind:rules="rules.reimbursementApplyId" v-bind:label-width="labelWidth")
        el-input(v-model.number="detailFormModel.reimbursementApplyId" disabled)
      div.s-flex
        el-form-item.s-flex_item.label-center(label="出发" v-bind:label-width="labelWidth" style="border-right:1px solid #000")
          div.s-flex
            el-form-item.s-flex_item.kalix-form-table-td(label="月" prop="startMonth" v-bind:rules="rules.startMonth" label-width="60px")
              el-input(v-model.number="detailFormModel.startMonth")
            el-form-item.s-flex_item.kalix-form-table-td(label="日" prop="startDay" v-bind:rules="rules.startDay" label-width="60px")
              el-input(v-model.number="detailFormModel.startDay")
            el-form-item.s-flex_item.kalix-form-table-td(label="时" prop="startTime" v-bind:rules="rules.startTime" label-width="60px")
              el-input(v-model="detailFormModel.startTime")
          el-form-item.kalix-form-table-td(label="地点" prop="startPlace" v-bind:rules="rules.startPlace"  label-width="60px" style="border-top:1px solid #000")
            el-input(v-model="detailFormModel.startPlace")
        el-form-item.s-flex_item.label-center(label="到达" v-bind:label-width="labelWidth")
          div.s-flex
            el-form-item.s-flex_item.kalix-form-table-td(label="月" prop="arriveMonth" v-bind:rules="rules.arriveMonth" label-width="60px")
              el-input(v-model.number="detailFormModel.arriveMonth")
            el-form-item.s-flex_item.kalix-form-table-td(label="日" prop="arriveDay" v-bind:rules="rules.arriveDay" label-width="60px")
              el-input(v-model.number="detailFormModel.arriveDay")
            el-form-item.s-flex_item.kalix-form-table-td(label="时" prop="arriveTime" v-bind:rules="rules.arriveTime" label-width="60px")
              el-input(v-model="detailFormModel.arriveTime")
          el-form-item.kalix-form-table-td(label="地点" prop="arrivePlace" v-bind:rules="rules.arrivePlace" label-width="60px" style="border-top:1px solid #000")
            el-input(v-model="detailFormModel.arrivePlace")
      div.s-flex
        el-form-item.s-flex_item.label-center(label="人数" prop="personNumber" v-bind:rules="rules.personNumber" v-bind:label-width="labelWidth" style="border-right:1px solid #000")
          el-input(v-model.number="detailFormModel.personNumber")
        div.s-flex_item.s-flex
          el-form-item.s-flex_item.label-center(label="交通" v-bind:label-width="labelWidth")
            div.s-flex
              el-form-item.s-flex_item.kalix-form-table-td(label="工具" prop="trafficTool" label-width="60px")
                el-input(v-model="detailFormModel.trafficTool")
              el-form-item.s-flex_item.kalix-form-table-td(label="金额" prop="trafficMoney" v-bind:rules="rules.trafficMoney" label-width="60px")
                el-input(v-model.number="detailFormModel.trafficMoney")
      div.s-flex
        el-form-item.s-flex_item.label-center(label="天数" prop="dayNumber" v-bind:rules="rules.dayNumber" v-bind:label-width="labelWidth" style="border-right:1px solid #000")
          el-input(v-model.number="detailFormModel.dayNumber")
        div.s-flex_item.s-flex
          el-form-item.s-flex_item.label-center(label="出差补助" v-bind:label-width="labelWidth")
            div.s-flex
              el-form-item.s-flex_item.kalix-form-table-td(label="补助标准" prop="subsidyStandard" v-bind:rules="rules.subsidyStandard" label-width="60px")
                el-input(v-model.number="detailFormModel.subsidyStandard")
              el-form-item.s-flex_item.kalix-form-table-td(label="金额" prop="subsidyMoney" label-width="60px")
                el-input(v-model.number="detailFormModel.subsidyMoney" disabled)
      div.s-flex
        el-form-item.s-flex_item.label-center(label="其他费用金额" v-bind:label-width="labelWidth" style="border-right:1px solid #000")
          div.s-flex
            el-form-item.kalix-form-table-td(label="住宿" prop="hotelMoney" v-bind:rules="rules.hotelMoney" label-width="60px")
              el-input(v-model.number="detailFormModel.hotelMoney")
        el-form-item.s-flex_item.label-center(label="市内交通" prop="cityTrafficMoney" v-bind:rules="rules.cityTrafficMoney" v-bind:label-width="labelWidth")
          el-input(v-model.number="detailFormModel.cityTrafficMoney")
      el-form-item(label="合计" prop="totalMoney" v-bind:label-width="labelWidth")
        el-input(v-model.number="detailFormModel.totalMoney" disabled)
</template>

<script type="text/ecmascript-6">
  import DetailFormModel from './detailModel'
  import {ReimbursementApplyDetailURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'

  export default {
    data() {
      var checkReimbursementApplyId = (rule, value, callback) => {
        if (value === 0) {
          return callback(new Error('请先保存基本信息'))
        }
      }
      var checkStartMonth = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('出发月不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (value < 1 || value > 12) {
              callback(new Error('必须在1-12之间'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      var checkStartDay = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('出发日不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (value < 1 || value > 31) {
              callback(new Error('必须在1-31之间'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      var checkStartTime = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('出发时不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (value < 0 || value > 23) {
              callback(new Error('必须在0-23之间'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      var checkArriveMonth = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('到达月不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (value < 1 || value > 12) {
              callback(new Error('必须在1-12之间'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      var checkArriveDay = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('到达日不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (value < 1 || value > 31) {
              callback(new Error('必须在1-31之间'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      var checkArriveTime = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('到达时不能为空'))
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'))
          } else {
            if (value < 0 || value > 23) {
              callback(new Error('必须在0-23之间'))
            } else {
              callback()
            }
          }
        }, 1000)
      }
      return {
        user: null,
        detailFormModel: Object.assign({}, DetailFormModel),
        rules: {
          reimbursementApplyId: [{validator: checkReimbursementApplyId, trigger: 'blur'}],
          startMonth: [
            {required: true, message: '出发月不能为空'},
            {validator: checkStartMonth, trigger: 'blur'}
          ],
          startDay: [
            {required: true, message: '出发日不能为空'},
            {validator: checkStartDay, trigger: 'blur'}
          ],
          startTime: [
            {required: true, message: '出发时不能为空'},
            {validator: checkStartTime, trigger: 'blur'}
          ],
          startPlace: [{required: true, message: '出发地点不能为空', trigger: 'blur'}],
          arriveMonth: [
            {required: true, message: '到达月不能为空'},
            {validator: checkArriveMonth, trigger: 'blur'}
          ],
          arriveDay: [
            {required: true, message: '到达日不能为空'},
            {validator: checkArriveDay, trigger: 'blur'}
          ],
          arriveTime: [
            {required: true, message: '到达时不能为空'},
            {validator: checkArriveTime, trigger: 'blur'}
          ],
          arrivePlace: [{required: true, message: '到达地点不能为空', trigger: 'blur'}],
          personNumber: [{type: 'number', message: '人数必须为数字值'}],
          trafficMoney: [{type: 'number', message: '交通金额必须为数字值'}],
          dayNumber: [{type: 'number', message: '天数必须为数字值'}],
          subsidyStandard: [{type: 'number', message: '出差补助标准必须为数字值'}],
          hotelMoney: [{type: 'number', message: '住宿费用必须为数字值'}],
          cityTrafficMoney: [{type: 'number', message: '市内交通费用必须为数字值'}]
        },
        targetURL: ReimbursementApplyDetailURL,
        labelWidth: '100px'
      }
    },
    components: {
      KalixDialog: Dialog
    },
    created() {
    },
    methods: {}
  }
</script>
