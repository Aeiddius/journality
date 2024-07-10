<template>
  <ModalDelete ref="deleteNoteModalref" @sidebarInit="sidebarRef.openSidebarInit()"/>

  <div class="wrapper">
    <NoteSideBar ref="sidebarRef"/>

    <div class="content">
      <NoteTextarea @activateDelete="(msg: string) => deleteNoteModalref.handleShowNote(msg)"

      />

    </div>

  </div>
</template>


<script lang="ts" setup>
import NoteSideBar from '@/components/NoteSideBar.vue';
import NoteTextarea from '@/components/NoteTextarea.vue';
import ModalDelete from '@/components/ModalDelete.vue';
import { ref } from 'vue';


const deleteNoteModalref = ref()
const sidebarRef = ref()


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