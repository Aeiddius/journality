<template>
  <ModalBase v-model="showModal" v-if="showModal" class="delete-modal">
    <template #header>
      <h3>New Folder</h3>
    </template>

    <template #message>
      <input type="text" class="input" v-model="inputval" @keydown.esc="showModal = false" @keydown.enter="createNewFolder"/>
    </template>

    <template #buttons>
      <ActiveButton class="button underline" color="light" @click="createNewFolder">Create</ActiveButton>
      <ActiveButton class="button" color="light" @click="showModal = false">Cancel</ActiveButton>
    </template>
  </ModalBase>
</template>

<script lang="ts" setup>
import ModalBase from '@/components/ModalBase.vue';
import ActiveButton from '@/components/ActiveButton.vue';

import { ref, type Ref } from 'vue';
import { useNoteStore } from '@/stores/noteStore';

const showModal: Ref<boolean> = ref(false)
const noteStore = useNoteStore()
const inputval: Ref<string> = ref('')

const handleShowModal = () => {
  showModal.value = true
}

const createNewFolder = () => {
  console.log(inputval.value)
  noteStore.createNewFolder(inputval.value)
  showModal.value = false
}


defineExpose({
  handleShowModal
})

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
</style>