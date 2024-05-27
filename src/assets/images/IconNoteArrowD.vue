<template>
  <svg :width="size - 1" :height="size" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.5 0C3.77614 0 4 0.223858 4 0.5V6.29289L6.14645 4.14645C6.34171 3.95118 6.65829 3.95118 6.85355 4.14645C7.04882 4.34171 7.04882 4.65829 6.85355 4.85355L3.85355 7.85355C3.65829 8.04882 3.34171 8.04882 3.14645 7.85355L0.146447 4.85355C-0.0488155 4.65829 -0.0488155 4.34171 0.146447 4.14645C0.341709 3.95118 0.658292 3.95118 0.853554 4.14645L3 6.29289V0.5C3 0.223858 3.22386 0 3.5 0Z" />
  </svg>

</template>

<script lang="ts" setup>
defineProps({
  size: {
    type: Number,
    default: 12,
  }
})
</script>

<style lang="scss" scoped>
svg {
  transition: all 0.3s ease;
  transform: scale(1);
  padding: 2px 0px;

  path {
    fill: lighten($primary, 10%); // color
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