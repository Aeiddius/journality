<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import { useNoteStore } from '@/stores/noteStore';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore()
const noteStore = useNoteStore()


onMounted( async () => {
  await authStore.init()
})

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