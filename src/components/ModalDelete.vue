<template>
  <ModalBase v-model="showModal" v-if="showModal" class="delete-modal">
    <template #header>
      <h3>Delete Folder</h3>
    </template>

    <template #message>
      <p>Are you sure you want to delete <span class="font-bold">Folder name {{ id }}</span>
      </p>
    </template>

    <template #buttons>
      <ActiveButton class="button underline" color="light">I'm sure</ActiveButton>
      <ActiveButton class="button" color="light" @click="showModal = false">Cancel</ActiveButton>
    </template>
  </ModalBase>
</template>

<script lang="ts" setup>
import ModalBase from '@/components/ModalBase.vue';
import ActiveButton from '@/components/ActiveButton.vue';

import { ref, type Ref } from 'vue';


defineProps({
  id: {
    type: String,
    required: true
  }
})

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
</style>