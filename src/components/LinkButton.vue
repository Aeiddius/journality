<template>
  <button @click="goto(to)">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'


const router = useRouter();

defineProps({
  to: {
    type: String,
    required: true
  }
})

const goto = (value: string) => {
  router.push(value)
}
</script>

<style lang="scss" scoped>
button {
  font-family: 'Inter';
  font-weight: 300;
  font-style: normal;
  font-size: 1.2em;

  color: $primary;
  padding: 5px;
  margin: 0px 5px;

  &:hover {
    // border-bottom: 1px solid $primary;
    outline: 1px solid $primary;
  }
}
</style>