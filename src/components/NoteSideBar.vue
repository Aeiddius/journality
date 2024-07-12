<template>
  <ModalNewNote ref="createModalRef" />
  <ModalNewSection ref="createSectionModalref" />
  <ModalRenameSection ref="renameModalref" @updateInit="openSidebarInit" />
  <ModalDelete ref="deleteSectionModalref" />

  <div class="loading" :class="[!loaded ? 'show-loading' : '']">
    <h1 class="noselect">Loading</h1>
  </div>

  <div class="sidebar scrollbar-dark" v-if="loaded">
    <div class="header">
      <div class="title">
        <p class="folder-name">{{ noteStore.folders[folderId].title }}</p>
        <p class="app-name">Journality</p>
      </div>
      <div class="icons">
        <IconNoteReturn :size="24" @click="$router.push(`/user`)" />
        <IconNoteSection :size="18" @click="modals.handleNewSection()" />
        <!-- <IconNoteSearch :size="18" @click="noteStore.updateNotes()" /> -->
      </div>

    </div>

    <!-- <pre>{{ noteStore.folders[$route.params.folderId as string]['sections'] }}</pre> -->

    <!-- Sections -->
    <template v-if="loaded">

      <div class="section" v-for="(sectionName) in curFolder.section_sort" :key="sectionName">
        <div class="section-name noselect">
          <div class="left">
            <IconNoteArrowD :size="15" @click="modals.handleShowChapters(`section-${sectionName}`)"
              :class="{ 'disable-icon': curFolder.section[sectionName].note_sort.length == 0 }" />
            {{ sectionName }}
          </div>
          <div class="side">
            <IconNoteCreate :size="18" @click="modals.handleNewNote(sectionName)" />
            <SectionMenu :sectionName="sectionName" @activateRename="(val) => renameModalref.handleShowModal(val)"
              @activateDelete="(msg: string, sN: string) => deleteSectionModalref.handleShowSection(msg, sN)" />

          </div>
        </div>
        <!-- :class="{ 'hide': sectionName != curFolder.last_section }" -->
        <!-- Section List -->
        <ul class="section-block show noselect" :id="`section-${sectionName}`">

          <!-- Note List -->
          <template v-if="curFolder.section[sectionName].note_sort.length != 0">

            <li v-for="(noteId) in curFolder.section[sectionName].note_sort" :key="noteId"
              :class="{ 'active-note': noteStore.curTextarea.sectionName == sectionName && noteStore.curTextarea.id == noteId }"
              class="chapter-block">
              <NoteSideChapter :text="curFolder.section[sectionName].note[noteId].value"
                :noteName="curFolder.section[sectionName].note[noteId].name"
                @click="handleOpenText(sectionName, noteId, true)" />
              <hr>
            </li>
          </template>
        </ul>
      </div>

    </template>

  </div>
  <!-- <IconNoteCreate /> -->


</template>

<script lang="ts" setup>
// Import Icons
import IconNoteReturn from '@/assets/images/IconNoteReturn.vue'
import IconNoteSection from '@/assets/images/IconNoteSection.vue';
import IconNoteSearch from '@/assets/images/IconNoteSearch.vue';
import IconNoteCreate from '@/assets/images/IconNoteCreate.vue';
import IconNoteArrowD from '@/assets/images/IconNoteArrowD.vue';
import SectionMenu from '@/components/SectionMenu.vue';

// Import Components
import NoteSideChapter from '@/components/NoteSideChapter.vue';
import ModalNewNote from '@/components/ModalNewNote.vue';
import ModalNewSection from '@/components/ModalNewSection.vue';
import ModalRenameSection from '@/components/ModalRenameSection.vue';
import ModalDelete from './ModalDelete.vue';

// Import composable
import { useTimestamp } from '@/composables/useTimestamp'

// Import Vue
import { ref, watch, type Ref, onMounted } from 'vue';

// Modals
const createModalRef = ref()
const createSectionModalref = ref()
const renameModalref = ref()
const deleteSectionModalref = ref()

const modals = {
  handleShowChapters(id: string) {
    document.getElementById(id)?.classList.toggle("hide")
  },
  // Create Modal
  handleNewNote(sectionId: string) {
    createModalRef.value.handleShowModal(sectionId)
  },
  // Create section Modal
  handleNewSection() {
    createSectionModalref.value.handleShowModal()
  }
}


// Logic

import { useRoute, useRouter, type RouteLocationNormalized } from 'vue-router'
import { useNoteStore } from '@/stores/noteStore'
import type { Note, Folder } from '@/types/Folder'
import { useAuthStore } from '@/stores/authStore'




const noteStore = useNoteStore()
const route = useRoute()
const router = useRouter()
const folderId: string = route.params.folderId as string

const authStore = useAuthStore()

const loaded: Ref<boolean> = ref(false)
const dontUseWatch: Ref<boolean> = ref(false)
let curFolder: Folder


noteStore.currentFolder = folderId

// Initial Setup 
watch(noteStore, async () => {
  if (dontUseWatch.value === true) {
    return
  }
  if (noteStore.loaded != true) return;
  if (loaded.value == true) return;
  curFolder = noteStore.folders[folderId]
  openSidebarInit()
  loaded.value = true;
})



onMounted(async () => {
  // Ensures that this mounted isn
  if (authStore.loaded == false) {
    return
  }
  console.log("text")
  curFolder = noteStore.folders[folderId]
  console.log("passed: ", curFolder)
  openSidebarInit()
  loaded.value = true;
  console.log("Done")

  dontUseWatch.value = true
})

const openSidebarInit = () => {
  const querySection: string = route.query.s as string
  const queryNoteId: string = route.query.n as string

  console.log("1. thus")
  // QUERY MODE. if there's a query chapter/secction in the url
  if (sectionAndNoteExist(querySection, queryNoteId)) {
    handleOpenText((route.query.s as string).trim(), (route.query.n as string).trim())
    return
  }
  console.log("2. thus")

  // LAST MODE. Check if there's a last opened section/note
  let lastSection: string = curFolder.last_section.trim()
  let lastNoteId: string = curFolder.last_note.trim()

  if (lastSection !== '' && lastNoteId !== '' && sectionAndNoteExist(lastSection, lastNoteId)) {
    handleOpenText(lastSection, lastNoteId)
    return
  }
  console.log("3. thus")

  // FIRST MODE. Get the first section's first note
  if (lastSection === '' || lastNoteId === '' || !sectionAndNoteExist(lastSection, lastNoteId)) {
    openFirstSectionNote()
    return
  }

  // ERROR MODE. False first section added 
  if (!curFolder.section_sort.includes(lastSection)) {
    const firstSection: string = curFolder.section_sort[0];
    noteStore.curTextarea.sectionName = firstSection;
    openFirstSectionNote()
    return
  }
  console.log("heello")
}

const openFirstSectionNote = () => {
  console.log("THISSSS: ", curFolder)
  router.push({ path: route.path, query: {} });

  let firstSection: string = curFolder.section_sort[0];
  if (curFolder.section[firstSection].note_sort.length === 0) return false
  let firstNoteId: string = curFolder.section[firstSection].note_sort[0]
  handleOpenText(firstSection, firstNoteId, true)
  return true
}

const sectionAndNoteExist = (sectionName: string, noteId: string) => {
  return sectionName in curFolder.section && noteId in curFolder.section[sectionName].note
}


const handleOpenText = async (sectionName: string, noteId: string, dontUpdate: boolean = false) => {
  if (noteStore.curTextarea.sectionName == sectionName && noteStore.curTextarea.id == noteId) {
    console.log("Already Opened")
    return
  }
  const Note: Note = curFolder.section[sectionName].note[noteId]
  noteStore.curTextarea.id = noteId
  noteStore.curTextarea.noteName = Note.name
  noteStore.curTextarea.value = Note.value
  noteStore.curTextarea.dateUpdated = useTimestamp(Note.date_updated)
  noteStore.curTextarea.sectionName = sectionName;
  noteStore.curTextarea.folderName = folderId;
  // Changes query note
  router.push({ query: { s: sectionName, n: noteId } })
  // changes last note id
  curFolder.last_section = sectionName
  curFolder.last_note = noteId

  if (dontUpdate == false) {
    await noteStore.updateNotes()
  }
}

defineExpose({
  openSidebarInit
})
</script>


<style lang="scss" scoped>
$padding: 10px;

.loading {
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: $primary;
  z-index: -1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Inter";
  transition: all 1s ease;
  opacity: 0;

  h1 {
    font-size: 2em;
    color: lighten($primary, 30%)
  }
}

.show-loading {
  opacity: 1;
  z-index: 100;
}

.sidebar {
  background-color: $primary;
  width: 250px;
  min-width: 250px;
  max-width: 250px;
  padding: 10px 0px;
  height: 100vh;
  // overflow-y: auto;
  color: white;
}

@media (max-width: 800px) {
  .sidebar {
    width: 200px;
    min-width: 200px;
    max-width: 200px;
  }

}


.header {
  padding: 0px $padding;
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  color: white;
  font-size: 0.8em;

  .app-name {
    font-size: 0.8em;
    font-style: italic;
    color: lighten($primary, 40%);
  }
}

.section-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 5px $padding;
  background-color: $dark;
  font-size: 0.7em;

  .left {
    display: flex;
    gap: 5px;
  }
}

.side {
  display: flex;
  height: 100%;
  align-items: center;
}

.icons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  // width: 100%;
}

hr {
  background-color: #383838;
  height: 1px;
  border: 0;
}
</style>