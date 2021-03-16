<template>
  <button
    class="x-button"
    :class="[
      `x-button--${type}`,
      `x-button--${size}`,
      {
        'is-plain': plain,
        'is-round': round,
        'is-disabled': disabled,
      },
    ]"
    :style="`background:${color};`"
    @click="handleClick"
    :disabled="disabled"
  >
    <i :class="icon"></i>
    <span v-if="$slots.default"><slot></slot></span>
  </button>
</template>
<script>
export default {
  name: 'x-button',
  props: {
    size: {
      type: String,
      default: 'medium'
    },
    type: {
      type: String,
      default: 'default'
    },
    color: {
      type: String,
      default: ''
    },
    plain: {
      type: Boolean,
      default: false
    },
    round: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  created () {},
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>
<style scoped>
.x-button {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
/* 按钮种类 */
.x-button--default {
}
.x-button--success {
  background-color: #67c23a;
  border-color: #67c23a;
  color: #fff;
}
.x-button--primary {
  background-color: #409eff;
  border-color: #409eff;
  color: #fff;
}
.x-button--info {
  color: #fff;
  background-color: #909399;
  border-color: #909399;
}
.x-button--warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}
.x-button--danger {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
[class*="x-button-color--"]{
 color: #fff;
 border: 0;
}
.is-plain{
    background-color: #fff;
}
/* 朴素按钮 */
.x-button--success.is-plain {
  color: #67c23a;
}
.x-button--primary.is-plain {
  color: #409eff;
}
.x-button--info.is-plain {
  color: #909399;
}
.x-button--warning.is-plain {
  color: #e6a23c;
}
.x-button--danger.is-plain {
  color: #f56c6c;
}
/* 圆角按钮 */
.x-button.is-round {
  border-radius: 30px;
}
/* 按钮图标 */
.x-button [class*="x-icon-"] + span {
  margin-left: 5px;
}
[class*="x-button-"]:focus, [class*="x-button-"]:hover {
 opacity: 0.8;
}
/* 禁用按钮 */
.x-button.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
