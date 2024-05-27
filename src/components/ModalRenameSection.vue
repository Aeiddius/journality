<template>
  <ModalBase v-model="showModal" v-if="showModal" class="delete-modal">
    <template #header>
      <h3>Rename {{ origSectionName }}</h3>
    </template>

    <template #message>
      <input type="text" class="input" v-model="sectionName" @input="isError = false" @keydown.enter="renameSection"
        ref="refInput" @keydown.esc="showModal = false" />
      <span v-show="isError" class="error">Section already exists</span>
    </template>

    <template #buttons>
      <ActiveButton class="button underline" color="light" @click="renameSection">Create</ActiveButton>
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
const origSectionName: Ref<string> = ref('')
const isError: Ref<boolean> = ref(false)
const refInput = ref(null)

// Modal handling
const handleShowModal = (originalSectionName: string) => {
  showModal.value = true
  sectionName.value = originalSectionName
  origSectionName.value = originalSectionName
  nextTick(() => {
    (refInput.value as unknown as HTMLInputElement)?.focus()
  })
}


const emit = defineEmits<{
  (e: 'updateInit'): void
}>()

defineExpose({
  handleShowModal
})


// Create 
const renameSection = async () => {
  const res: Boolean = await noteStore.renameSection(sectionName.value, origSectionName.value,
    () => isError.value = true,
    () => {emit('updateInit');showModal.value = false}
  )
  if (!res) {
    showModal.value = false
  }
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