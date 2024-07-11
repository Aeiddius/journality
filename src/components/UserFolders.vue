<template>



  <div>
    <ModalDeleteFolder name="" ref="deleteModalRef" />

    <ul class="manage">
      
      <template v-for="folderId in noteStore.folders_sort" :key="folderId">
        <!-- <pre>{{ folderV }}</pre> -->
    
        <div class="folder-link">
          <RouterLink class="router-link router-link__light" :to="'note/' + folderId" @click="afterNavigation">
          {{noteStore.folders[folderId].title }}</RouterLink>
          <span class="delete-folder" v-if="noteStore.folders_sort.length != 1">
            <IconTrash v-show="isShowEdit" @click="handleDeleteModal(folderId, noteStore.folders[folderId].title )" />
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

async function afterNavigation() {
  // await nextTick(async () => {
  //   // Your code to run after navigation
  //   await noteStore.getNotes()
  // });
  console.log()
}

defineProps({
  isShowEdit: {
    type: Boolean,
    required: true
  }
})


// Delete Modal
const deleteModalRef = ref()

const handleDeleteModal = (id: string, name: string): void => {
  deleteModalRef.value.handleShowModal(id, name)
  console.log("HERE: ", id, name)
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