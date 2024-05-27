<template>
  <button>
    <p class="chapter-title">{{ noteName }}</p>
    <p class="chapter-desc color-fd-40">{{ chapterDesc }}</p>
  </button>
</template>


<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  noteName: {
    type: String,
    // required: true,
    default: "none"
  },
  text: {
    type: String,
    required: true
  },
})

const chapterDesc = computed(() => {
  return props.text?.slice(0, 120) + "...";
})



</script>

<style lang="scss" scoped>
$padding: 10px;

button {
  padding: 10px $padding;
  width: 100%;

  &:hover {
    background-color: $dark;
  }
}

.chapter-title {
  text-align: left;
  color: white;
  font-weight: bold;
  font-size: 0.8em;
}

.chapter-desc {
  font-size: 0.7em;
  text-align: justify;
  line-height: 14px;
}
</style>