import type { Timestamp } from 'firebase/firestore'

interface Note {
  name: string
  value: string
  date_created: Timestamp
  date_updated: Timestamp
}

interface Section {
  note: {
    [key: string]: Note
  }
  note_sort: string[]
}

interface Folder {
  last_section: string
  last_note: string
  section: {
    [key: string]: Section
  }
  section_sort: string[]
}

export type { Folder, Section, Note }
