<template>
  <ModalBase v-model="showModal" v-if="showModal" class="delete-modal">
    <template #header>
      <h3>Delete Folder</h3>
    </template>

    <template #message>
      <p>Are you sure you want to delete <span class="font-bold">{{ folderName }}?</span>
      </p>
    </template>

    <template #buttons>
      <ActiveButton class="button underline" color="light" @click="deleteFolder()">I'm sure</ActiveButton>
      <ActiveButton class="button" color="light" @click="showModal = false">Cancel</ActiveButton>
    </template>
  </ModalBase>
</template>

<script lang="ts" setup>
import ModalBase from '@/components/ModalBase.vue';
import ActiveButton from '@/components/ActiveButton.vue';

import { ref, type Ref } from 'vue';
import { useNoteStore } from '@/stores/noteStore';

const folderId: Ref<string> = ref('')
const folderName: Ref<string> = ref('')

const showModal: Ref<boolean> = ref(false)
const noteStore = useNoteStore()

const handleShowModal = (id: string, name: string) => {
  showModal.value = true
  folderId.value = id
  folderName.value = name
}


defineExpose({
  handleShowModal
})

const deleteFolder = () => {
  console.log("GIVEN: ", folderId.value)
  noteStore.deleteFolder(folderId.value)
  showModal.value = false
}

</script>

<style lang="scss" scoped>
.button {
  font-size: 0.9em;
}

.underline {
  border-bottom: 1px solid $primary;
}
</style>