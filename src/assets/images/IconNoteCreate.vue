<template>
  <svg :width="size" :height="size" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.5 6C8.5 5.72386 8.27614 5.5 8 5.5C7.72386 5.5 7.5 5.72386 7.5 6V7.5H6C5.72386 7.5 5.5 7.72386 5.5 8C5.5 8.27614 5.72386 8.5 6 8.5H7.5V10C7.5 10.2761 7.72386 10.5 8 10.5C8.27614 10.5 8.5 10.2761 8.5 10V8.5H10C10.2761 8.5 10.5 8.27614 10.5 8C10.5 7.72386 10.2761 7.5 10 7.5H8.5V6Z" />
    <path
      d="M2 2C2 0.89543 2.89543 0 4 0H12C13.1046 0 14 0.89543 14 2V14C14 15.1046 13.1046 16 12 16H4C2.89543 16 2 15.1046 2 14V2ZM12 1H4C3.44772 1 3 1.44772 3 2V14C3 14.5523 3.44772 15 4 15H12C12.5523 15 13 14.5523 13 14V2C13 1.44772 12.5523 1 12 1Z" />
  </svg>
</template>

<script lang="ts" setup>
defineProps({
  size: {
    type: Number,
    default: 20,
  }
})
</script>

<style lang="scss" scoped>
svg {
  transition: all 0.3s ease;
  transform: scale(1);

  path {
    fill: lighten($primary, 10%); // Color
    transition: all 0.3s ease;

  }

  &:hover {
    cursor: pointer;

    path {
      fill: white;

    }
  }

  &:active {
    transform: scale(1.2);
  }
}
</style>