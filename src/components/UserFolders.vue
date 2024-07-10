<template>



  <div>
    <ModalDeleteFolder :id="deleteModalId" ref="deleteModalRef" />

    <ul class="manage">
      <template v-for="(folderValue, folderId) in noteStore.folders" :key="folderId">
        <!-- <pre>{{ folderV }}</pre> -->
        <div class="folder-link">
          <RouterLink  class="router-link router-link__light" :to="'note/'+folderId" @click="afterNavigation">{{ folderValue.title }}</RouterLink>
          <span class="delete-folder">
            <IconTrash v-show="isShowEdit"/>

          </span>
        </div>

      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import IconTrash from '@/assets/images/IconTrash.vue';
import ModalDeleteFolder from './ModalDeleteFolder.vue';

import { ref, type Ref, nextTick } from 'vue';
import { useNoteStore } from '@/stores/noteStore'


const noteStore = useNoteStore()

// async function afterNavigation() {
//   await nextTick(async () => {
//     // Your code to run after navigation
//     await noteStore.getNotes()
//   });
// }

defineProps({
  isShowEdit: {
    type: Boolean,
    required: true
  }
})


// Delete Modal
const deleteModalRef = ref()
const deleteModalId: Ref<string> = ref('')

const handleDeleteModal = (id: string): void => {
  deleteModalId.value = id
  deleteModalRef.value.handleShowModal()
}


</script>

<style lang="scss" scoped>
.manage {
  min-width: 200px;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .folder-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2px 2px;


    .router-link {
      font-size: 1.1em;
    }
  }

}
</style>