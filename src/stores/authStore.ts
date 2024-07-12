import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { auth } from '@/js/firebase'
import type { Credentials } from '@/types/Credentials'
import { useRouter } from 'vue-router'

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'

import { useNoteStore } from '@/stores/noteStore'

export const useAuthStore = defineStore('authStore', () => {
  interface User {
    id: string
    email: string
  }

  const loaded: Ref<boolean> = ref(false)

  const user = ref<User>({ id: '', email: '' })
  const router = useRouter()
  const noteStore = useNoteStore()

  const isLogged: Ref<boolean> = ref(false)

  const init = async () => {
    console.log("I CAME HERE")
    // const noteStore = useNoteStore()
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        console.log('USER LOGGED iN: ', currentUser)
        user.value.id = currentUser.uid
        user.value.email = currentUser.email as string
        isLogged.value = true


        await noteStore.init()
        loaded.value = true

      } else {
        isLogged.value = false
        console.log('[Auth Change]: user logged out')
        user.value.id = ''
        user.value.email = ''
        // router.push('/auth')

        noteStore.folders = {}
        noteStore.folders_sort = []
        router.push('/')
        // noteStore.clearNotes()
      }
    })
  }

  const registerUser = async (credentials: any) => {
    console.log(credentials)
    createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then(async (userCredential) => {
        // Signed up
        // await noteStore.createNewUserNote()
        const user = userCredential.user
        console.log('Registered: ', user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
        // ..
      })
  }

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        console.log('User logged out')
        router.push('/')
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  const loginUser = async (credentials: any) => {
    signInWithEmailAndPassword(auth, credentials.email, credentials.password)
      .then((userCredential) => {
        // Signed in
        // user.value = userCredential.user;
        console.log('Login: ', user)
        router.push('/user')

      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  return { user, isLogged, loaded,
    init, logoutUser, loginUser, registerUser }
})
