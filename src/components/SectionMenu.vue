<template>
  <div class="context">
    <IconTripleDot @click="toggleContext" />
    <div class="dropdown" :class="{ 'hide': hide == true }" ref="refDropdown">
      <ActiveButton class="button" color="dark" @click="renameSection">Rename</ActiveButton>
      <ActiveButton class="button" color="dark">Delete</ActiveButton>
    </div>
  </div>
</template>


<script lang="ts" setup>
import IconTripleDot from '@/assets/images/IconTripleDot.vue';
import ActiveButton from '@/components/ActiveButton.vue';
import { useNoteStore } from '@/stores/noteStore'
import { onClickOutside } from '@vueuse/core'

import { ref, type Ref } from 'vue'

const refDropdown = ref(null)

const hide: Ref<boolean> = ref(true)
const emit = defineEmits<{
  (e: 'activateRename', sectionName: string): void
}>()
// const noteStore = useNoteStore()

const props = defineProps({
  sectionName: {
    type: String,
    required: true
  }
})

const toggleContext = () => {

  // for (const i of document.getElementsByClassName('dropdown')) {
  //   i.classList.add('hide')
  // }
  hide.value = !hide.value
}

onClickOutside(refDropdown, () => hide.value = true)

const renameSection = () => {
  emit('activateRename', props.sectionName)
  hide.value = true
}

</script>

<style lang="scss" scoped>
.context {
  position: relative;
  z-index: 10000;
}

.dropdown {
  width: 100px;
  position: absolute;
  top: 25px;
  left: 0;
  z-index: 10000;
  background-color: $dark;
}

.button {
  margin: 1px 0px;
  width: 100%;
  background-color: $dark;
  font-size: 12px;
}
</style>