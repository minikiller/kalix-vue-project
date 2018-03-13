<!--
  描述：squire 富文本编辑器组件
  开发人：桑杨
  开发日期：2018年3月13日09:58:16
-->
<template lang="pug">
  div.squire
    div.tool-bar
      span(v-for="item in toolBars" class="item" v-bind:key="item.key" v-on:click="toolbarItemClick(item)")
        i(v-bind:class="item.icon")
    div(ref="editor" id="editor" class="editor" v-bind:style="style")
</template>
<script type="text/ecmascript-6">
  import './squire-raw'
  import './css/iconfont.css'

  export default {
    props: {
      value: {
        Type: String
      },
      width: {
        Type: String,
        default: '100%'
      },
      height: {
        Type: String,
        default: '600px'
      }
    },
    data() {
      return {
        editor: null,
        toolBars: [
          {
            text: 'bold',
            key: 'bold',
            key2: 'removeBold',
            isActive: false,
            icon: 'kalix-squire kalix-squire-icon-fontbold'
          },
          {
            text: 'italic',
            key: 'italic',
            key2: 'removeItalic',
            isActive: false,
            icon: 'kalix-squire kalix-squire-icon-italic'
          },
          {
            text: 'underline',
            key: 'underline',
            key2: 'removeUnderline',
            isActive: false,
            icon: 'kalix-squire kalix-squire-icon-underline'
          },
          // setTextAlignment
          {
            text: 'alignLeft',
            key: 'alignLeft',
            isActive: false,
            icon: 'kalix-squire kalix-squire-icon-alignLeft'
          },
          {
            text: 'alignCenter',
            key: 'alignCenter',
            isActive: false,
            icon: 'kalix-squire kalix-squire-icon-alignCenter'
          },
          {
            text: 'alignRight',
            key: 'alignRight',
            isActive: false,
            icon: 'kalix-squire kalix-squire-icon-alignRight'
          },
          {
            text: 'undo',
            key: 'undo',
            isActive: false,
            icon: 'kalix-squire kalix-squire-icon-undo'
          },
          {
            text: 'redo',
            key: 'redo',
            isActive: false,
            icon: 'kalix-squire kalix-squire-icon-redo'
          }
        ]
      }
    },
    mounted() {
      /* eslint-disable */
      setTimeout(() => {
        this.editor = new Squire(document.getElementById('editor'), {
          blockTag: 'span'
        });
        this.editor.testPresenceinSelection = (name, action, format, validation) => {
          let path = this.editor.getPath(),
            test = (validation.test(path) | this.editor.hasFormat(format));
          if (name === action && test) {
            return true;
          } else {
            return false;
          }
        };
        this.editor.alignRight = () => {
          this.editor.setTextAlignment('right')
        }
        this.editor.alignCenter = () => {
          this.editor.setTextAlignment('center')
        }
        this.editor.alignLeft = () => {
          this.editor.setTextAlignment('left')
        }

        this.editor.setHTML(this.value)
      }, 20)
    },
    methods: {
      getHtml() {
        return this.editor.getHTML()
      },
      toolbarItemClick(item) {
        // console.log('e:', e)
        let value = null
        let editor = this.editor
        let test = {
          testBold: editor.testPresenceinSelection('bold', item.key, 'B', (/>B\b/)),
          testItalic: editor.testPresenceinSelection('italic', item.key, 'I', (/>I\b/)),
          testUnderline: editor.testPresenceinSelection('underline', item.key, 'U', (/>U\b/)),
          testOrderedList: editor.testPresenceinSelection('makeOrderedList', item.key, 'OL', (/>OL\b/)),
          testLink: editor.testPresenceinSelection('makeLink', item.key, 'A', (/>A\b/)),
          testQuote: editor.testPresenceinSelection('increaseQuoteLevel', item.key, 'blockquote', (/>blockquote\b/)),
          isNotValue: function (a) {
            return (a === item.key && this.value !== '')
          }
        }
        if (test.testBold | test.testItalic | test.testUnderline | test.testOrderedList | test.testLink | test.testQuote) {
          if (test.testBold) editor.removeBold()
          if (test.testItalic) editor.removeItalic()
          if (test.testUnderline) editor.removeUnderline()
          if (test.testLink) editor.removeLink()
          if (test.testOrderedList) editor.removeList()
          if (test.testQuote) editor.decreaseQuoteLevel()
        } else if (test.isNotValue('makeLink') | test.isNotValue('insertImage') | test.isNotValue('selectFont')) {
          // do nothing these are dropdowns.
        } else {
          editor[item.key]();
          editor.focus();
        }
      }
    },
    watch: {
      value(newValue, oldValue) {
        this.editor.setHTML(this.value)
      }
    },
    computed: {
      style() {
        return {
          width: this.width,
          height: this.height
        }
      }
    }
  }
</script>
<style scoped lang="stylus" type="text/stylus">
  .squire
    padding 0 25px 10px
    .tool-bar
      font-size 0
      text-align left
      border-bottom 1px solid #d6d6d6
      margin 0 -25px 0px
      padding 10px
      overflow hidden
      .item
        display inline-block
        font-size 14px
        border 1px solid #ffffff
        border-radius 4px
        text-align center
        width 20px
        height 20px
        line-height 20px
        padding 5px
        cursor pointer
        float left
        &.active
          background-color #dedede
        &:hover
          border-color #000000

    .editor
      width 100%
      height 600px
      margin 0 auto
      overflow auto
      text-align left
      font-family '宋体'
      outline none
</style>
<style lang="stylus" type="text/stylus">
  p.MsoNormal
    margin auto !important
</style>
