<template>
  <div class="navbar" :class="[allignment]">
    <span class="nav-title" v-if="($route.name === 'home' && authStore.isLogged) || ($route.name !== 'home')">
      <Icon :size="0.6" class="icon" />
      <h2><RouterLink to="/">Journality</RouterLink></h2>
    </span>

    <span class="buttons" v-if="$route.name === 'home' && !authStore.isLogged">
      <LinkButton to="/auth/login">Login</LinkButton>
      <LinkButton to="/auth/register">Register</LinkButton>
    </span>

    <span class="buttons" v-if="$route.name === 'auth'">
      <LinkButton to="/">Home</LinkButton>
    </span>

    <span class="buttons" v-if="$route.name === 'user'">
      <LinkButton to="/" @click="authStore.logoutUser()">Signout</LinkButton>
    </span>
  </div>
</template>

<script lang="ts" setup>
import LinkButton from '@/components/LinkButton.vue'
import Icon from '@/assets/images/IconImage.vue'

import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const allignment = computed(() => {
  if (route.name === 'home' && authStore.isLogged) {
    return 'justify-between'
  }
  if (route.name === 'home') {
    return 'justify-end'
  }
  return 'justify-between'


})

</script>



<style lang="scss" scoped>
.justify-between {
  justify-content: space-between;
}

.justify-start {
  justify-content: flex-start;
}

.justify-end {
  justify-content: flex-end;
}

.navbar {
  // position: absolute;
  top: 0;
  right: 0;
  width: 100vw;
  // background-color: $primary;
  padding: 30px;
  display: flex;
}

.nav-title {
  display: flex;
  align-items: center;

  h2, a {
    font-family: 'Inter';
    font-weight: bold;
    font-style: normal;
    font-size: 1.4em;
    color: $primary;
    text-decoration: none;
    padding: 2px;
    user-select: none;
    border-bottom: 1px solid white;
    &:hover {
      border-bottom: 1px solid $primary;
    }
  }
}

.icon {
  margin-right: 5px;
}

.buttons {
  display: flex;
}
</style>