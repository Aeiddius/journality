<template>
  <ModalBase v-model="showModal" v-if="showModal" class="delete-modal">
    <template #header>
      <p class="section">{{ sectionIdRef }}</p>
      <h3>New Note Name</h3>
    </template>

    <template #message>
      <input type="text" v-model="noteName" class="input" ref="refInput" @keydown.esc="showModal = false"
        @keydown.enter="createNewNote" />
    </template>

    <template #buttons>
      <ActiveButton class="button underline" color="light" @click="createNewNote">Create</ActiveButton>
      <ActiveButton class="button" color="light" @click="showModal = false">Cancel</ActiveButton>
    </template>
  </ModalBase>
</template>

<script lang="ts" setup>
import ModalBase from '@/components/ModalBase.vue';
import ActiveButton from '@/components/ActiveButton.vue';

import { ref, type Ref, nextTick, onMounted } from 'vue';
import { useNoteStore } from '@/stores/noteStore'

import { useGenerateId } from '@/composables/useGenerateId'
import { Timestamp } from 'firebase/firestore';
const noteStore = useNoteStore()
const showModal: Ref<boolean> = ref(false)
const sectionIdRef: Ref<string> = ref('')
const noteName: Ref<string> = ref('')
const refInput = ref(null)

const handleShowModal = (sectionId: string) => {
  showModal.value = true
  sectionIdRef.value = sectionId
  console.log("Sectionid: ", sectionId)
  nextTick(() => {
    (refInput.value as unknown as HTMLInputElement)?.focus()
  })

}

onMounted(() => {
  console.log(useGenerateId())
})

defineExpose({
  handleShowModal
})

const createNewNote = async () => {
  const sectionName = noteStore.folders[noteStore.currentFolder].section[sectionIdRef.value]
  let newId: string = ''
  console.log("Section: ", sectionIdRef.value)
  // Generate new ID
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let id = useGenerateId()
    if (!sectionName.note_sort.includes(id)) {
      newId = id
      break
    }
  }

  // Generate new note content
  sectionName.note[newId] = {
    name: noteName.value,
    value: '',
    date_created: Timestamp.now(),
    date_updated: Timestamp.now()
  }

  // Add new note to note_sort
  sectionName.note_sort.push(newId)

  // Hide modal
  showModal.value = false

  // Update database
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

.section {
  font-weight: normal;
  font-size: 0.7em;
}
</style>