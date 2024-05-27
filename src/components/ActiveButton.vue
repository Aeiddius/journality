<template>
  <button :class="[
            color == 'dark' ? 'dark' : 'light',
            isActive ? `${color}-active` : '',
            disabled == true ? 'disabled' : '']" 
          :disabled="disabled">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

type ColorValue = 'dark' | 'light'

defineProps({
  color: {
    type: String as PropType<ColorValue>,
    default: 'dark'
  },
  isActive: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

</script>

<style lang="scss" scoped>
button {
  font-family: 'Inter';
  font-weight: 300;
  font-style: normal;
  font-size: 1.2em;


  padding: 5px;
  // margin-top: 20px;
  margin: 10px 5px;

  border-bottom: 1px solid transparent;
  margin-bottom: -1px;
  transition: all 0.4s ease;
  transform: scale(1);

  &:hover {
    transition: all 0.4s ease;
  }

  &:active {
    transform: scale(1.2);
  }
}

.dark {
  color: white;
  background-color: $primary;

  &:hover {
    outline: 1px solid white;
  }
}

.light {
  color: $primary;
  background-color: white;

  &:hover {
    outline: 1px solid $primary;
  }
}


.dark-active {
  border-bottom: 1px solid white;
}

.light-active {
  border-bottom: 1px solid $primary;
}

.disabled {
  background-color: lighten($dark, 10%) !important;
  color: gray;
}
</style>