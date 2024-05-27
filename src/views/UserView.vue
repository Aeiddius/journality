<template>
  <NavBar />
  <IconGithub />
  <ModalNewFolder ref="createModalRef" />



  <!-- Page -->
  <div class="wrapper-center ">
    <div class="wrapper">

      <!-- User Page Title  -->
      <div class="title">
        <div>
          <h3>Welcome Back</h3>
          <h1 class="font-bold ">{{ authStore.user.name }}</h1>
        </div>

        <div class="action-icons">
          <IconAddFolder @click="handleNewFolder" />
          <IconEdit :thickness="showEdit === true ? 1 : 0" @click="showEdit = !showEdit" />
          <IconGear />
        </div>
      </div>

      <hr class="hr-dark">

      <!-- Content: Folder and Infos -->
      <div class="content">
        <UserFolders :isShowEdit="showEdit" />
        <UserInfo />
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import NavBar from '@/layout/NavBar.vue';
import UserInfo from '@/components/UserInfo.vue';
import UserFolders from '@/components/UserFolders.vue';
import ModalNewFolder from '@/components/ModalNewFolder.vue';

import IconGithub from '@/assets/images/IconGithub.vue'
import IconEdit from '@/assets/images/IconEdit.vue';
import IconAddFolder from '@/assets/images/IconAddFolder.vue';
import IconGear from '@/assets/images/IconGear.vue';

import { ref, onMounted, type Ref, } from 'vue';
import { useAuthStore } from '@/stores/authStore'


const authStore = useAuthStore()

const showEdit: Ref<boolean> = ref(false)


// CreateModal
const createModalRef = ref()
const handleNewFolder = (): void => {
  createModalRef.value.handleShowModal()
}

// Mounted
onMounted(() => {
  showEdit.value = false;
})

</script>


<style lang="scss" scoped>
h1 {
  font-size: 3em;
  color: $primary;
}

h3 {
  font-size: 1.2em;
}

.hr-dark {
  height: 0.5px;
  margin: 20px 0px;
}

.wrapper {
  padding: 30px;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.action-icons {
  display: flex;
  gap: 5px;
}

.content {
  display: flex;
  gap: 30px;
  justify-content: space-between;
}
</style>