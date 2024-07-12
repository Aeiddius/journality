<template>
  <div class="textarea">

    <div class="title" v-if="authStore.loaded">
      {{ noteStore.folders[noteStore.currentFolder].title }} > {{ noteStore.curTextarea.sectionName }}
    </div>

    <input class="chapter-name" type="text" v-model="noteStore.curTextarea.noteName" placeholder="Note title"
      @input="handleInput(1000)" />

    <textarea class="scrollbar-dark" placeholder="Write note here..." v-model="noteStore.curTextarea.value"
      @input="handleInput()" autofocus />

    <div class="stats">
      <span>Last Edited {{ noteStore.curTextarea.dateUpdated }} </span>
      <span class="center">{{ wordCount }}
        <IconTrash @click="deleteNote" />
      </span>
    </div>

  </div>

</template>

<script lang="ts" setup>
import IconTrash from '@/assets/images/IconTrash.vue';

import { useAuthStore } from '@/stores/authStore'
import { useNoteStore } from '@/stores/noteStore'
import { computed } from 'vue';
let typingTimeout: number | undefined;

const handleInput = (delay: number = 1500) => {
  clearTimeout(typingTimeout);

  typingTimeout = window.setTimeout(() => {
    saveText();
  }, delay);
};

const authStore = useAuthStore()
const noteStore = useNoteStore()


const saveText = async () => {
  console.log('User stopped typing. Perform the desired action here.');
  await noteStore.updateText()
}

const wordCount = computed(() => {
  const value = noteStore.curTextarea.value

  const char = value.length
  let word = value.trim().split(/\s+/).length
  if (value.trim() === '') word = 0
  const paragraphs = value.split(/\n\n+/).length - 1
  return `Chars: ${char} | Words: ${word} | Paragraphs: ${paragraphs}`
})

const emit = defineEmits<{
  (e: 'activateDelete', message: string): void
}>()

const deleteNote = () => {
  emit('activateDelete', `Delete ${noteStore.curTextarea.noteName}?`)
}


</script>

<style lang="scss" scoped>
.textarea {
  width: 80%;
  padding: 50px 70px;
  padding-bottom: 40px;
  // background-color: red;
  transition: 1s all ease;
  display: flex;
  flex-direction: column;

  .chapter-name {
    font-weight: normal;
    font-size: 2.5em;
    width: 100%;
    border: 0;
    margin-top: 30px;
    margin-bottom: 10px;
  }

  .title {
    text-align: center;
    color: lighten($primary, 30%);
  }

  textarea {
    width: 100%;
    border: none;
    height: 100%;
    font-size: 1em;
    line-height: 20px;
    padding-right: 30px;
    text-align: justify;
    resize: none;
  }
}

.stats {
  display: flex;
  font-size: 0.8em;
  color: lighten($primary, 40%);
  justify-content: space-between;
  margin-top: 10px;
}

.center {
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-end;
  text-align: right;
}


@media (max-width: 800px) {
  .textarea {
    width: 90%;
    padding: 30px 20px;
    padding-bottom: 20px;
  }

  .chapter-name { 
    margin-top: 20px !important;
  }

  .stats { 
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
}
</style>