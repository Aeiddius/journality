<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useNoteStore } from '@/stores/noteStore';

const noteStore = useNoteStore()
noteStore.getNotes()

</script>

<template>
  <div class="container">

    <RouterView />
  </div>
</template>

<style lang="scss" scoped>
.container {

  height: 100vh
}
</style>