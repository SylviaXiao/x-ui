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
.x-button--default {
  color: #000;
  background-color: #fff;
  border: 1px solid #000;
}
.x-button--success {
  background-color: green;
  border: 1px solid green;
  color: #fff;
}
.x-button--primary {
  background-color: rgb(72, 134, 192);
  border: 1px solid rgb(72, 134, 192);
  color: #fff;
}
.x-button--success.is-plain {
  background-color: #fff;
  color: green;
}
.x-button--primary.is-plain {
  background-color: #fff;
  color: rgb(72, 134, 192);
}
.x-button.is-round {
  border-radius: 30px;
}
.x-button [class*="x-icon-"] + span {
  margin-left: 5px;
}
.x-button.is-disabled{
  opacity: 0.5;
}
</style>
++
