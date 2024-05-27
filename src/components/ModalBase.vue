<template>
  <div class="modal wrapper-center">
    <div class="card" ref="modalCardRef">

      <!-- Header -->
      <header>
        <slot name="header" />
      </header>

      <!-- Message -->
      <div class="content">
        <slot name="message" />
      </div>

      <!-- Buttons -->
      <div class="buttons">
        <slot name="buttons" />
      </div>

    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'



defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const closeModal = () => {
  emit('update:modelValue', false)
}

// Click Outside
const modalCardRef = ref(null)
onClickOutside(modalCardRef, () => closeModal())



</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba($primary, 0.3);
}

.card {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  min-width: 400px;
  max-width: 500px;
}

header {
  font-size: 1.2em;
  font-weight: bold;
}

.content {
  font-size: 0.9em;
  font-weight: 300;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}
</style>