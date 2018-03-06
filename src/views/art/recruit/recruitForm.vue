<template lang="pug">
  div.art-form
    div.form-container
      div.swiper-container
        div.swiper-wrapper
          div.swiper-slide
            div.wrapper
              el-form(ref="dialogForm" v-bind:model="formModel")
                div.el-form.kalix-form-table
                  div.table-title 企业信息
                  div.s-flex
                    el-form-item.s-flex_item.kalix-form-table-td(label="企业组织机构代码" prop="companyCode" v-bind:rules="rules.companyCode" v-bind:label-width="labelWidth")
                      div(style="display:flex;")
                        el-input.s-flex_item(v-model="formModel.companyCode")
                        el-button(type="primary" icon="el-icon-search" v-on:click="getCompany") 查询
                    el-form-item.s-flex_item.kalix-form-table-td(label="企业名称" prop="companyName" v-bind:rules="rules.companyName" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.companyName")
                  div.s-flex
                    el-form-item.s-flex_item.kalix-form-table-td(label="企业性质" prop="companyNature" v-bind:label-width="labelWidth")
                      kalix-dict-select(v-model="formModel.companyNature" appName="art" dictType="企业性质" style="width:100%")
                    el-form-item.s-flex_item.kalix-form-table-td(label="企业规模" prop="companyScale" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.companyScale")
                  div.s-flex
                    el-form-item.s-flex_item.kalix-form-table-td(label="企业行业" prop="companyIndustry" v-bind:label-width="labelWidth")
                      kalix-dict-select(v-model="formModel.companyIndustry" appName="art" dictType="企业行业" style="width:100%")
                    el-form-item.s-flex_item.kalix-form-table-td(label="企业年限" prop="companyLife" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.companyLife")
                  div.s-flex
                    el-form-item.s-flex_item.kalix-form-table-td(label="地区" prop="region" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.region")
                    el-form-item.s-flex_item.kalix-form-table-td(label="城市" prop="city" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.city")
                  div.table-title 招聘信息
                  div.s-flex
                    el-form-item.s-flex_item.kalix-form-table-td(label="发布时间" prop="publishDate" v-bind:label-width="labelWidth")
                      input.ipt-date(v-model="formModel.publishDate" placeholder="发布时间" type="date" )
                    el-form-item.s-flex_item.kalix-form-table-td(label="职位描述" prop="position" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.position")
                  div.s-flex
                    el-form-item.s-flex_item.kalix-form-table-td(label="岗位要求" prop="positionRequires" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.positionRequires")
                    el-form-item.s-flex_item.kalix-form-table-td(label="岗位个数" prop="jobNumbers" v-bind:label-width="labelWidth")
                      el-input-number(v-model="formModel.jobNumbers" v-bind:min="1" style="width:100%")
                  div.s-flex
                    el-form-item.s-flex_item.kalix-form-table-td(label="学历" prop="education" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.education")
                    el-form-item.s-flex_item.kalix-form-table-td(label="职能类别" prop="functionCategoryId" v-bind:label-width="labelWidth")
                      el-input(v-model="formModel.functionCategoryId")
                  div
                    el-form-item.kalix-form-table-td(label="薪资" prop="salary" v-bind:label-width="labelWidth")
                      el-input-number(v-model="formModel.salary" v-bind:step="500" style="width:100%")
                    <!--el-form-item.s-flex_item.kalix-form-table-td(label="应用技术名称" prop="appliedTechnology" v-bind:label-width="labelWidth")-->
                      <!--el-input(v-model="formModel.appliedTechnology")-->
                  div.s-flex
                    el-form-item.s-flex_item.kalix-form-table-td(label="个人要求" prop="personRequires" v-bind:label-width="labelWidth")
                      kalix-dict-select(v-model="formModel.personRequires" appName="art" dictType="个人要求" style="width:100%")
                    el-form-item.s-flex_item.kalix-form-table-td(label="工作类型" prop="jobType" v-bind:label-width="labelWidth")
                      kalix-dict-select(v-model="formModel.jobType" appName="art" dictType="工作类型" style="width:100%")
    div.footer-toolbar
      div.btns
        el-button.btn-item(v-on:click="onCancelClick") 关 闭
        el-button.btn-item(type="primary" v-on:click="onSubmitClick") 提 交
</template>
<script type="text/ecmascript-6">
  import FormModel from './model'
  import Message from 'common/message'
  import {RecruitURL} from '../config.toml'
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
          companyCode: [{required: true, message: '请输入企业组织机构代码', trigger: 'blur'}],
          companyName: [{required: true, message: '请输入企业名称', trigger: 'blur'}]
        },
        targetURL: RecruitURL,
        labelWidth: '140px'
      }
    },
    components: {
      KalixDialog: Dialog,
      KalixDictSelect: BaseDictSelect,
      KalixDatePicker: DatePicker
    },
    mounted() {
      history.pushState(null, null, document.URL)
      window.addEventListener('popstate', function () {
        history.pushState(null, null, document.URL)
      })

      let swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        scrollbar: {
          el: '.swiper-scrollbar'
        },
        mousewheel: true
      })
      console.log('swiper', swiper)
    },
    methods: {
      initData() {
        this.formModel.companyName = ''
        this.formModel.companyNature = null
        this.formModel.companyScale = ''
        this.formModel.companyIndustry = null
        this.formModel.companyLife = ''
        this.formModel.region = ''
        this.formModel.city = ''
      },
      getCompany() {
        this.initData()
        let companyCode = this.formModel.companyCode
        let sort = '[{\'property\': \'creationDate\', \'direction\': \'DESC\'}]'
        if (companyCode) {
          let params = {
            params: {
              'jsonStr': {'companyCode': companyCode},
              'page': 1,
              'limit': 1,
              'sort': sort
            }
          }
          Vue.axios.get(RecruitURL, params).then((response) => {
            if (response.data.data && response.data.data.length > 0) {
              let rec = response.data.data[0]
              this.formModel.companyName = rec.companyName
              this.formModel.companyNature = rec.companyNature
              this.formModel.companyScale = rec.companyScale
              this.formModel.companyIndustry = rec.companyIndustry
              this.formModel.companyLife = rec.companyLife
              this.formModel.region = rec.region
              this.formModel.city = rec.city
            }
          })
        } else {
          alert('请输入企业组织机构代码')
        }
      },
      onCancelClick() {
        this.resultRedirect('close')
      },
      onSubmitClick() {
        // 保证日期时间提交验证
        if (this.formModel.publishDate !== '') {
          this.formModel.publishDate = formatDate(new Date(this.formModel.publishDate), 'yyyy-MM-dd hh:mm:ss')
        }
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
