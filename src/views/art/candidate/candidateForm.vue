<!--
描述：艺术中心-学生应聘-新增组件
开发人：sunlf
开发日期：2017年8月17日
-->

<template lang="pug">
  div.art-form
    div.form-container
      div.swiper-container
        div.swiper-wrapper
          div.swiper-slide
            div.wrapper
              el-form(ref="dialogForm" v-bind:model="formModel")
                div.el-form.kalix-form-table
                  div.table-title 个人基本信息
                  div.s-flex
                    el-form-item.s-flex_item.kalix-form-table-td(label="学号" prop="studentNo" v-bind:rules="rules.studentNo" v-bind:label-width="labelWidth")
                      div(style="display:flex;")
                        el-input.s-flex_item(v-model="formModel.studentNo")
                        el-button(type="primary" icon="el-icon-search" v-on:click="getStudent") 查询
                    el-form-item.s-flex_item.kalix-form-table-td(label="姓名" prop="name" v-bind:rules="rules.name" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.name")
                  div.s-flex
                    el-form-item.s-flex_item.kalix-form-table-td(label="身份证号" prop="identificationCard" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.identificationCard")
                    el-form-item.s-flex_item.kalix-form-table-td(label="性别" prop="sex" v-bind:label-width="labelWidth")
                      kalix-dict-select(v-model="formModel.sex" appName="art" dictType="性别" style="width:100%")
                  div.s-flex
                    el-form-item.s-flex_item.kalix-form-table-td(label="出生日期" prop="birthday" v-bind:label-width="labelWidth")
                      input.ipt-date(v-model="formModel.birthday" placeholder="出生日期" type="date")
                    el-form-item.s-flex_item.kalix-form-table-td(label="民族" prop="nation" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.nation")
                  div.s-flex
                    el-form-item.s-flex_item.kalix-form-table-td(label="政治面貌" prop="politicalStatus" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.politicalStatus")
                    el-form-item.s-flex_item.kalix-form-table-td(label="入党团时间" prop="joinPartyDate" v-bind:label-width="labelWidth")
                      input.ipt-date(v-model="formModel.joinPartyDate" placeholder="入党团时间" type="date")
                  div.table-title 应聘信息
                  div.s-flex
                    el-form-item.s-flex_item.kalix-form-table-td(label="地区" prop="region" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.region")
                    el-form-item.s-flex_item.kalix-form-table-td(label="城市" prop="city" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.city")
                  div.s-flex
                    el-form-item.s-flex_item.kalix-form-table-td(label="学历" prop="education" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.education")
                    el-form-item.s-flex_item.kalix-form-table-td(label="薪资" prop="salary" v-bind:label-width="labelWidth")
                      el-input-number(v-model="formModel.salary" v-bind:step="500" style="width:100%")
                  div.s-flex
                    el-form-item.s-flex_item.kalix-form-table-td(label="个人特点" prop="skills" v-bind:label-width="labelWidth")
                      kalix-dict-select(v-model="formModel.skills" appName="art" dictType="个人要求" multiple style="width:100%")
                    el-form-item.s-flex_item.kalix-form-table-td(label="职业规划目标" prop="careerGoal" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.careerGoal")
                  div.s-flex
                    el-form-item.s-flex_item.kalix-form-table-td(label="联系电话" prop="phone" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.phone")
                    el-form-item.s-flex_item.kalix-form-table-td(label="联系地址" prop="address" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.address")
                  div.s-flex
                    el-form-item.s-flex_item.kalix-form-table-td(label="专业" prop="majorId" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.majorId")
                    el-form-item.s-flex_item.kalix-form-table-td(label="期望行业" prop="expectingIndustry" v-bind:label-width="labelWidth")
                      kalix-dict-select(v-model="formModel.expectingIndustry" appName="art" dictType="企业行业" style="width:100%")
    div.footer-toolbar
      div.btns
        el-button.btn-item(v-on:click="onCancelClick") 关 闭
        el-button.btn-item(type="primary" v-on:click="onSubmitClick") 提 交
</template>

<script type="text/ecmascript-6">
  import FormModel from './model'
  import {CandidateURL} from '../config.toml'
  import Dialog from '@/components/custom/baseDialog.vue'
  import BaseDictSelect from '@/components/custom/baseDictSelect'
  import DatePicker from '@/components/biz/date/datepicker.vue'
  import Vue from 'vue'
  import Swiper from 'swiper'
  import {formatDate} from 'common/typeFormat'

  export default {
    data() {
      return {
        formModel: Object.assign({}, FormModel),
        rules: {
          studentNo: [{required: true, message: '请输入学号', trigger: 'blur'}],
          name: [{required: true, message: '请输入名称', trigger: 'blur'}]
        },
        targetURL: CandidateURL,
        labelWidth: '110px'
      }
    },
    mounted() {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL)
      })
      /* eslint-disable */
      new Swiper('.swiper-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar'
        },
        mousewheel: true
      })
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixDatePicker: DatePicker
    },
    methods: {
      initData() {
        this.formModel.name = ''
        this.formModel.identificationCard = ''
        this.formModel.sex = null
        this.formModel.birthday = null
        this.formModel.nation = ''
        this.formModel.politicalStatus = ''
        this.formModel.joinPartyDate = null
        this.formModel.region = ''
        this.formModel.city = ''
        this.formModel.education = ''
        this.formModel.salary = 1000
        this.formModel.phone = ''
        this.formModel.address = ''
        this.formModel.majorId = null
        this.formModel.expectingIndustry = null
      },
      getStudent() {
        this.initData()
        let studentNo = this.formModel.studentNo
        let sort = '[{\'property\': \'updateDate\', \'direction\': \'DESC\'}]'
        if (studentNo) {
          let params = {
            params: {
              'jsonStr': {'studentNo': studentNo},
              'page': 1,
              'limit': 1,
              'sort': sort
            }
          }
          Vue.axios.get(CandidateURL, params).then((response) => {
            if (response.data.data && response.data.data.length > 0) {
              let rec = response.data.data[0]
              this.formModel.name = rec.name
              this.formModel.identificationCard = rec.identificationCard
              this.formModel.sex = rec.sex
              this.formModel.birthday = rec.birthday
              this.formModel.nation = rec.nation
              this.formModel.politicalStatus = rec.politicalStatus
              this.formModel.joinPartyDate = rec.joinPartyDate
              this.formModel.region = rec.region
              this.formModel.city = rec.city
              this.formModel.education = rec.education
              this.formModel.salary = rec.salary
              this.formModel.phone = rec.phone
              this.formModel.address = rec.address
              this.formModel.majorId = rec.majorId
              this.formModel.expectingIndustry = rec.expectingIndustry
            }
          })
        } else {
          alert('请输入学号')
          return
        }
      },
      onCancelClick() {
        this.resultRedirect('close')
      },
      onSubmitClick() {
        // 保证日期时间提交验证
        if (this.formModel.birthday !== '') {
          this.formModel.birthday = formatDate(new Date(this.formModel.birthday), 'yyyy-MM-dd hh:mm:ss')
        }
        if (this.formModel.joinPartyDate !== '') {
          this.formModel.joinPartyDate = formatDate(new Date(this.formModel.joinPartyDate), 'yyyy-MM-dd hh:mm:ss')
        }
        console.log('this.formModel.birthday', this.formModel.birthday)
        console.log('this.formModel.joinPartyDate', this.formModel.joinPartyDate)

        this.$refs.dialogForm.validate((valid) => {
          console.log('valid', valid)
          if (valid) {
            Vue.axios.request({
              method: this.isEdit ? 'PUT' : 'POST',
              url: this.isEdit ? `${this.targetURL}/${this.formModel.id}` : this.targetURL,
              data: this.formModel,
              params: {}
            }).then(response => {
              if (response.data.success) {
//                Message.success(response.data.msg)
                this.visible = false
                this.$refs.dialogForm.resetFields()
                // this.resultRedirect('success')
                this.$router.push({path: '/art/result/success'})
                // window.open(window.location.origin + '/art/result/' + target)
              } else {
                this.resultRedirect('error')
              }
              // 刷新列表
              console.log('[kalix] dialog submit button clicked !')
              this.visible = false
            })
          } else {
            Message.error('请检查输入项！')
            return false
          }
        })
      },
      resultRedirect(target) {
        window.open(window.location.origin + '/art/result/' + target)
      }
    }
  }
</script>

<style lang="stylus" type="text/stylus">
  .art-form
    position fixed
    top 0px
    left 0px
    overflow hidden
    width 100%
    height 100%
    background-color #ffffff
    .wrapper
      padding 0 12px
    .s-flex
      display block
    .kalix-form-table
      .kalix-form-table-td
        border-right none
        border-bottom 1px solid #000
        &:last-child
          border-bottom 0
    .ipt-date
      width: 100%;
      height 40px
      border: 0;
      outline: 0;
      box-sizing border-box
      -webkit-appearance: none;
      background-color: transparent;
      font-size: inherit;
      color: inherit;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

    .form-container
      position: fixed;
      top 12px
      left 0px
      bottom 64px
      width 100%
      overflow: hidden;
    .footer-toolbar
      position fixed
      left 0
      bottom 0
      width 100%
      padding 12px
      text-align center
      box-sizing border-box
      background-color #ffffff
      .btns
        display flex
        margin 0 -6px
        .btn-item
          flex 1
          margin 0 6px

    .swiper-container
      width 100%
      height 100%
    .el-select
      width 100% !important

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button
    -webkit-appearance: none !important

  input::-webkit-calendar-picker-indicator
    display none
</style>
