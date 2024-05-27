<template>
  <svg :width="size" :height="size" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"
    class="bi bi-three-dots-vertical">
    <path
      d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
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