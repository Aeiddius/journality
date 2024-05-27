<template>
  <div class="wrapper">
    <NoteSideBar />

    <div class="content">
      <NoteTextarea />

    </div>

  </div>
</template>


<script lang="ts" setup>
import NoteSideBar from '@/components/NoteSideBar.vue';
import NoteTextarea from '@/components/NoteTextarea.vue';
// import { useRoute } from 'vue-router'
// import { useNoteStore } from '@/stores/noteStore'

// const noteStore = useNoteStore()
// const route = useRoute()




</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  // align-items: center;
}


.content {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>