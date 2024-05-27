<template>
  <ModalBase v-model="showModal" v-if="showModal" class="delete-modal">
    <template #header>
      <h3>New Section</h3>
    </template>

    <template #message>
      <input type="text" class="input" v-model="sectionName" @input="isError = false" @keydown.enter="createNewSection"
        ref="refInput" @keydown.esc="showModal = false" />
      <span v-show="isError" class="error">Section already exists</span>
    </template>

    <template #buttons>
      <ActiveButton class="button underline" color="light" @click="createNewSection">Create</ActiveButton>
      <ActiveButton class="button" color="light" @click="showModal = false">Cancel</ActiveButton>
    </template>
  </ModalBase>
</template>

<script lang="ts" setup>
// Import
import ModalBase from '@/components/ModalBase.vue';
import ActiveButton from '@/components/ActiveButton.vue';

import { ref, type Ref, nextTick } from 'vue';
import { useNoteStore } from '@/stores/noteStore'

// Declare variables
const noteStore = useNoteStore()
const showModal: Ref<boolean> = ref(false)
const sectionName: Ref<string> = ref('')
const isError: Ref<boolean> = ref(false)
const refInput = ref(null)

// Modal handling
const handleShowModal = () => {
  showModal.value = true
  nextTick(() => {
    (refInput.value as unknown as HTMLInputElement)?.focus()
  })
}
defineExpose({
  handleShowModal
})

// Create 
const createNewSection = async () => {
  // Don't create if section already exists
  if (noteStore.folders[noteStore.currentFolder].section_sort.includes(sectionName.value)) {
    isError.value = true
    return
  }

  // Create new section
  noteStore.folders[noteStore.currentFolder].section[sectionName.value] = {
    note: {
    }, note_sort: []
  }
  // Add new section to section sort
  noteStore.folders[noteStore.currentFolder].section_sort.push(sectionName.value)

  // Hide modal
  showModal.value = false

  // update database
  await noteStore.updateNotes()
}
</script>

<style lang="scss" scoped>
.button {
  font-size: 0.9em;
}

.underline {
  border-bottom: 1px solid $primary;
}

.input {
  margin-top: 5px;
  border: 1px solid $primary;
  width: 100%;
}

.error {
  color: rgb(255, 71, 71);
}
</style>