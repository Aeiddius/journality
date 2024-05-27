<template>
  <NavBar />

  <div class="wrapper-center full-height">

    <h1>
      <span class="icon">
        <Icon :size="1.2" />
      </span>
      Journality
    </h1>
    <h6>A Simple Note Taking App</h6>
    <LinkButton to="/user" v-if="authStore.isLogged">Get Started</LinkButton>
  </div>

  <IconGithub />
</template>

<script lang="ts" setup>
import Icon from '@/assets/images/IconImage.vue'
import IconGithub from '@/assets/images/IconGithub.vue'
import LinkButton from '@/components/LinkButton.vue';

import NavBar from '@/layout/NavBar.vue';

import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()

</script>

<style lang="scss" scoped>
h1 {
  font-size: 6em;
  font-family: 'Inter';
  font-weight: bold;
  font-style: normal;
  color: $primary;

}

h6 {
  font-family: 'Inter';
  font-weight: 300;
  font-style: normal;
  margin-bottom: 10px;
}
</style>