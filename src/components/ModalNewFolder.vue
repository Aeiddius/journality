<template>
  <ModalBase v-model="showModal" v-if="showModal" class="delete-modal">
    <template #header>
      <h3>New Folder</h3>
    </template>

    <template #message>
      <input type="text" class="input" />
    </template>

    <template #buttons>
      <ActiveButton class="button underline" color="light">Create</ActiveButton>
      <ActiveButton class="button" color="light" @click="showModal = false">Cancel</ActiveButton>
    </template>
  </ModalBase>
</template>

<script lang="ts" setup>
import ModalBase from '@/components/ModalBase.vue';
import ActiveButton from '@/components/ActiveButton.vue';

import { ref, type Ref } from 'vue';


const showModal: Ref<boolean> = ref(false)


const handleShowModal = () => {
  showModal.value = true
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