<template>
  <div class="info">
    <!-- Resume -->
    <div class="font-light">
      <h3 class="header font-bold">Resume</h3>
      <RouterLink to="/" class="p-0 router-link router-link__dark section ">Section 2 - Chapter 3</RouterLink>
      <p class="text color-fd-60">lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sed nulla
        vulputate,
        congue
        felis a, euismod
        erat. Integer ac justo orci. </p>
    </div>
    <hr class="hr-white">

    <!-- Sections -->
    <h3 class="header font-bold">Sections</h3>
    <ul class="section-list color-fd-40">
      <li v-for="num in 5" class="text" :key="num">
        <RouterLink class="p-0 router-link router-link__dark " to="/">Section {{ num }}</RouterLink>
      </li>
    </ul>
    <hr class="hr-white">

    <!-- Statistics -->
    <h3 class="header font-bold">Statistics</h3>
    <p class="text color-fd-40">Chars: 0</p>
    <p class="text color-fd-40">Words: 0</p>
    <p class="text color-fd-40">Paragraphs: 0</p>
    <p class="text color-fd-40">Secctions: 0</p>

  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
.hr-white {
  border-top: 1px solid white;
  margin: 10px 0px;
}

.info {
  padding: 30px;
  border-radius: 10px;
  background-color: $primary;
  color: white;
  max-width: 400px;
  height: fit-content;

  .header {
    font-size: 0.9em;
  }

  .text {
    font-size: 0.8em;
    text-align: justify;
  }

  .section {
    font-size: 0.8em;
    margin: 3px 0px;
  }

  .section-list {
    li {
      display: inline-block;
      margin-right: 5px;
    }
  }
}
</style>