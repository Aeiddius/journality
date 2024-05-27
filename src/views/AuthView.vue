<template>
  <div>
    <NavBar />
    <div class="wrapper-center full-height">

      <div class="auth-choice">
        <ActiveButton color="light" :is-active="!isRegister" @click="changeAuth('login')">Login</ActiveButton>
        <ActiveButton color="light" :is-active="isRegister" @click="changeAuth('register')">Register</ActiveButton>
      </div>

      <form class="form" @submit.prevent="">
        <input type="text" name="username" id="username" aria-label="Username" hidden autocomplete="username">
        <span>
          <label for="email">Email</label>
          <input type="email" name="email" id="email" autocomplete="username email" placeholder="jondoe@email.com">
        </span>
        <span>
          <label for="password">Password</label>
          <input type="password" name="password" id="password" autocomplete="new-password">
        </span>
        <span v-if="$route.params.id === 'register'">
          <label for="confirmpass">Confirm Password</label>
          <input type="password" name="confirmpass" id="confirmpass" autocomplete="new-password">
        </span>
        <div class="submit">
          <ActiveButton>{{ useCapitalize($route.params.id as string) }}</ActiveButton>
        </div>
      </form>
    </div>

  </div>
  <IconGithub />
</template>


<script lang="ts" setup>
import NavBar from '@/layout/NavBar.vue';
import ActiveButton from '@/components/ActiveButton.vue';
import IconGithub from '@/assets/images/IconGithub.vue'

import { ref, onMounted, type Ref } from 'vue'

import { useRoute, useRouter } from 'vue-router'
import { useCapitalize } from '@/composables/useCapitalize'



const route = useRoute()
const router = useRouter()

const isRegister: Ref<boolean> = ref(false)

type AuthValue = 'login' | 'register'



onMounted((): void => {
  console.log("ID:", route.params.id)
  if (!['login', 'register'].includes(route.params.id as string)) {
    router.push('/auth/login')
  }
  isRegister.value = route.params.id as string === 'register' ? true : false;
})

const changeAuth = (mode: AuthValue): void => {
  isRegister.value = mode === 'register' ? true : false;
  if (route.params.id === mode) return
  router.push(`/auth/${mode}`)
}


</script>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;

  font-family: 'Inter';
  font-weight: 300;
  font-style: normal;

  padding: 40px;
  border-radius: 15px;
  background-color: $primary;

  min-width: 400px;

}

span {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

label {
  color: white;
  margin-bottom: 5px;
}

input {
  padding: 5px;
  border: 0px;
  border-radius: 4px;
  font-size: 0.9em;
}

.submit {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}



.auth-choice {
  display: flex;
  margin-bottom: 10px;

}

.is-active {
  button {
    font-weight: bold;
  }
}
</style>