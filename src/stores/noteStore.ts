import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/js/firebase'
import { collection, getDocs, setDoc, doc, Timestamp } from 'firebase/firestore'

// Import Types
import { type Folder } from '@/types/Folder'
import { type Textarea } from '@/types/Textarea'

import { useTimestamp } from '@/composables/useTimestamp'

import { useAuthStore } from '@/stores/authStore'

// Main Function
export const useNoteStore = defineStore('noteStore', () => {
  // Set Variables
  const loaded: Ref<boolean> = ref(false)
  const folders: Ref<{ [key: string]: Folder }> = ref({})

  const currentFolder: Ref<string> = ref('')

  const curTextarea: Ref<Textarea> = ref({
    id: '',
    value: 'test',
    noteName: '',
    sectionName: '',
    folderName: '',
    dateUpdated: ''
  })

  // Firebase Note Reference
  let noteRef = collection(db, 'users', 'aeid-13', 'folders')


  const init = () => {
    const authStore = useAuthStore()   

    noteRef = collection(db, "users", authStore.user.id, "folders")
    console.log("FOLDER VALUE: ", folders.value)
    getNotes()
  }

  const createNewUserNote = async () => {
    // const authStore = useAuthStore()   

    // noteRef = collection(db, "users", authStore.user.id, "folders")

    folders.value['default'] = {
      title: 'Test Folder',
      last_note: '',
      last_section: '',
      section: {
        'section_1': {
          note: { '8176rm1': {
            date_created: Timestamp.now(),
            date_updated: Timestamp.now(),
            name: 'note_1',
            value: 'First note'
          }},
          note_sort: ['8176rm1']
        }
      },
      section_sort: []
    }
    console.log("registered")
    await updateNotes()
  }

  // Get Notes from the database
  const getNotes = async () => {
    const querySnapshot = await getDocs(noteRef)

    querySnapshot.forEach((doc) => {
      folders.value[doc.id] = doc.data() as Folder
    })

    loaded.value = true
  }

  // Updates Note Databse
  const updateNotes = async () => {
    // folders.value['folder1'].section['section1'].note['pad1'].value = 'asdas'
    const folderName: string = currentFolder.value
    await setDoc(doc(noteRef, folderName), {
      ...folders.value[folderName]
    })
  }

  // Updates the Text. Set the current text into the actual folder note text
  const updateText = async () => {
    const id = curTextarea.value.id
    const note = curTextarea.value.noteName
    const section = curTextarea.value.sectionName
    const value = curTextarea.value.value
    const s = folders.value[currentFolder.value].section[section].note_sort
    const o = folders.value[currentFolder.value].section[section].note

    // Renames in note_sort
    for (let i = 0; i < s.length; i++) {
      const element = s[i]
      if (element === o[id].name) {
        s[i] = note
        break
      }
    }

    // Update value if value is changed
    if (o[id].value != value) {
      o[id].date_updated = Timestamp.now()
      curTextarea.value.dateUpdated = useTimestamp(o[id].date_updated)
    }

    // Set value and new name
    o[id].value = value
    o[id].name = note

    await updateNotes()
  }


  // Delete Section
  const deleteSection = async (sectionName: string) => {

    const o = folders.value[currentFolder.value].section
    const s = folders.value[currentFolder.value].section_sort
  
    delete o[sectionName]
  
    // Delete section_sort element
    for (let i = 0; i < s.length; i++) {
      if (s[i] === sectionName) {
        s.splice(i, 1)
      }
    }
    await updateNotes()
  }


  // deleteNote
  const deleteNote = async () => {
    const sectionName = curTextarea.value.sectionName
    const noteId = curTextarea.value.id

    const o = folders.value[currentFolder.value].section[sectionName].note
    const s = folders.value[currentFolder.value].section[sectionName].note_sort

    delete o[noteId]
    
    // Delete section_sort element
    for (let i = 0; i < s.length; i++) {
      if (s[i] === noteId) {
        s.splice(i, 1)
      }
    }
    await updateNotes()
    
  
  }



  // Create 
  const createSection = async (sectionName: string, hideModal: Function) => {
    const o = folders.value[currentFolder.value].section
    const s = folders.value[currentFolder.value].section_sort

    // Don't create if section already exists
    if (s.includes(sectionName)) {
      return false
    }

    // Create new section
    o[sectionName] = {
      note: {
      }, note_sort: []
    }
    // Add new section to section sort
    s.push(sectionName)


    hideModal()

    // update database
    await updateNotes()
    return true
  }


  const renameSection = async (sectionName: string, origSectionName: string, 
                               isError: Function, hideModal: Function) => {
    const o = folders.value[currentFolder.value].section
    const s = folders.value[currentFolder.value].section_sort

    // If no change
    if (sectionName == origSectionName) {
      return false
    }
  
    // Don't create if section already exists
    if (s.includes(sectionName)) {
      isError()
      return false
    }
  
    // Rename section map entry
    o[sectionName] = o[origSectionName]
    delete o[origSectionName]
  
    // Rename section_sort element
    for (let i = 0; i < s.length; i++) {
      if (s[i] === origSectionName) {
        s[i] = sectionName
        break
      }
    }
  
    // Replace last_section if it's the current entry
    if (folders.value[currentFolder.value].last_section === origSectionName) {
      folders.value[currentFolder.value].last_section = sectionName
    }
  
    
    hideModal()

    await updateNotes()

    return true
  }


  const createNewFolder = async (folderName: string) => {
    console.log(folders.value)

    if (folderName in folders.value) {
      console.log("Its there")
      return
    }
    console.log("Done")
  }

  return {
    init,
    getNotes,
    updateNotes,
    deleteNote,
    deleteSection,
    renameSection,
    createSection,
    updateText,
    createNewFolder,
    createNewUserNote,
    folders,
    curTextarea,
    loaded,
    currentFolder
  }
})
