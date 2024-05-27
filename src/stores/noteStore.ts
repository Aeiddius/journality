import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/js/firebase'
import { collection, getDocs, updateDoc, doc, Timestamp } from 'firebase/firestore'

// Import Types
import { type Folder } from '@/types/Folder'
import { type Textarea } from '@/types/Textarea'

import { useTimestamp } from '@/composables/useTimestamp'

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
  const noteRef = collection(db, 'users', 'aeid-13', 'folders')

  // Get Notes from the database
  const getNotes = async () => {
    const querySnapshot = await getDocs(noteRef)

    querySnapshot.forEach((doc) => {
      folders.value[doc.id] = doc.data() as Folder
      console.log('This: ', folders.value)
    })

    loaded.value = true
  }

  // Updates Note Databse
  const updateNotes = async () => {
    // folders.value['folder1'].section['section1'].note['pad1'].value = 'asdas'
    await updateDoc(doc(noteRef, 'folder1'), {
      ...folders.value['folder1']
    })
    console.log(folders.value['folder1'])
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
    console.log('Text Updated')
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
        console.log("DONE", s[i])
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

  return {
    getNotes,
    updateNotes,
    deleteSection,
    renameSection,
    createSection,
    updateText,
    folders,
    curTextarea,
    loaded,
    currentFolder
  }
})
