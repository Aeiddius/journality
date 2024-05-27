<template>
  <div class="textarea">

    <div class="title">
      {{ noteStore.curTextarea.folderName }} > {{ noteStore.curTextarea.sectionName }}
    </div>

    <input class="chapter-name" type="text" v-model="noteStore.curTextarea.noteName" placeholder="Note title"
      @input="handleInput(1000)" />

    <textarea class="scrollbar-dark" placeholder="Write note here..." v-model="noteStore.curTextarea.value"
      @input="handleInput()" autofocus />

    <div class="stats">
      <span>Last Edited {{ noteStore.curTextarea.dateUpdated }} </span>
      <span>{{ wordCount }}</span>
    </div>

  </div>

</template>

<script lang="ts" setup>
import { useNoteStore } from '@/stores/noteStore'
import { computed } from 'vue';
let typingTimeout: number | undefined;

const handleInput = (delay: number = 1500) => {
  clearTimeout(typingTimeout);

  typingTimeout = window.setTimeout(() => {
    saveText();
  }, delay);
};

const noteStore = useNoteStore()


const saveText = () => {
  console.log('User stopped typing. Perform the desired action here.');
  noteStore.updateText()
}

const wordCount = computed(() => {
  const value = noteStore.curTextarea.value

  const char = value.length
  let word = value.trim().split(/\s+/).length
  if (value.trim() === '') word = 0
  const paragraphs = value.split(/\n\n+/).length - 1
  return `Chars: ${char} | Words: ${word} | Paragraphs: ${paragraphs}`
})

</script>

<style lang="scss" scoped>
.textarea {
  width: 80%;
  padding: 50px 70px;
  padding-bottom: 40px;
  // background-color: red;

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
</style>