<template>
  <ModalBase v-model="showModal" v-if="showModal" class="delete-modal">
    <template #header>
      <h3>Delete</h3>
    </template>

    <template #message>
      <p>Are you sure you want to <span class="font-bold">{{ message }}</span>
      </p>
    </template>

    <template #buttons>
      <ActiveButton class="button underline" color="light" @click="deleteItem">I'm sure</ActiveButton>
      <ActiveButton class="button" color="light" @click="showModal = false">Cancel</ActiveButton>
    </template>
  </ModalBase>
</template>

<script lang="ts" setup>
import ModalBase from '@/components/ModalBase.vue';
import ActiveButton from '@/components/ActiveButton.vue';
import { useNoteStore } from '@/stores/noteStore'

import { ref, type Ref } from 'vue';

const emit = defineEmits<{
  (e: 'sidebarInit' ): void
}>()

const noteStore = useNoteStore()

const message: Ref<string> = ref('')

const sectionName: Ref<string> = ref('')


const showModal: Ref<boolean> = ref(false)
const mode: Ref<string> = ref('')

const handleShowSection = (msg: string, section: string) => {
  showModal.value = true
  message.value = msg
  sectionName.value = section
  mode.value = 'section'
}


const handleShowNote = (msg: string) => {
  showModal.value = true
  message.value = msg
  mode.value = 'note'
}

const deleteItem = async () => {
  if (mode.value == 'section') {
    showModal.value = false
    await noteStore.deleteSection(sectionName.value)
    return
  }
  
  if (mode.value == 'note') {
    showModal.value = false
    await noteStore.deleteNote()
    console.log("asdasdasd")
    emit('sidebarInit')
    return
  }
}



defineExpose({
  handleShowSection,
  handleShowNote
})




</script>

<style lang="scss" scoped>
.button {
  font-size: 0.9em;
}

.underline {
  border-bottom: 1px solid $primary;
}
</style>