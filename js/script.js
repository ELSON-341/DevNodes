'use strict'

// Elementos
const notesContainer = document.querySelector('#notes-container')
const noteInput = document.querySelector('#note-content')
const addNoteBtn = document.querySelector('.add-note')
const searchInput = document.querySelector('#search-input')

// funçãoes
const showNotes = () => {
    cleanNotes()
    
    getNotes().forEach((note) => {
        const noteElement = createNote(note.id, note.content, note.fixed)
        notesContainer.appendChild(noteElement)
    })
    }


const cleanNotes = () => {
    notesContainer.replaceChildren([])
}

const addNote = () => {
    const notes = getNotes()

    const noteObject = {
        id: createId(),
        content:noteInput.value,
        fixed: false,
    }

    const noteElement = createNote(noteObject.id, noteObject.content)
    notesContainer.appendChild(noteElement)

    notes.push(noteObject)
    
    seveNotes(notes)
    noteInput.value = ''
    noteInput.focus()
}

const createId = () => Math.floor(Math.random() * 5000)

const createNote = (id, content, fixed) => {
    const element = document.createElement('div')
    element.classList.add('note')

    const textarea = document.createElement('textarea')
    textarea.value = content
    textarea.placeholder = "Adicione algum texto"
    
    element.appendChild(textarea)

    const pinIcon = document.createElement('i')
    pinIcon.classList.add(...['bi', 'bi-pin'])
    element.appendChild(pinIcon)

    const deleteTIcon = document.createElement('i')
    deleteTIcon.classList.add(...['bi', 'bi-x-lg'])
    element.appendChild(deleteTIcon)
    
    const duplicateIcon = document.createElement('i')
    duplicateIcon.classList.add(...['bi', 'bi-file-earmark-plus'])
    element.appendChild(duplicateIcon)
    
    if(fixed) element.classList.add('fixed')

    // Elventos do elemento
    element.querySelector('textarea').addEventListener('keyup', (e) => {
        const noteContent = e.target.value
        updateNote(id, noteContent)
    })
    element.querySelector('.bi-pin').addEventListener('click', () => toggleFixdNote(id))
    element.querySelector('.bi-x-lg').addEventListener('click', () => deleteNote(id, element))
    element.querySelector('.bi-file-earmark-plus').addEventListener('click', () => copyNote(id))

    return element
}

const toggleFixdNote = (id) => {
    const notes = getNotes()
    
    const targetNote = notes.filter((note) => note.id === id)[0]
    targetNote.fixed = !targetNote.fixed
    seveNotes(notes);

    showNotes()
}

const deleteNote = (id, element) => {
    const notes = getNotes().filter((note) => note.id !== id)
    
    seveNotes(notes)

    notesContainer.removeChild(element)
}

const copyNote = (id) => {
    const notes = getNotes()
    const targetNote = notes.filter((note) => note.id === id)[0]

    const noteObject = {
        id: createId(),
        content:targetNote.content,
        fixed: false,
    }

    const noteElement = createNote(noteObject.id, noteObject.content, noteObject.fixed)

    notesContainer.appendChild(noteElement)
    notes.push(noteObject)
    seveNotes(notes)
}

const updateNote = (id, newContent) => {
    const notes = getNotes()

    const targetNote = notes.filter((note) => note.id === id)[0]
    targetNote.content = newContent

    seveNotes(notes)
}

const searchNote = (search) => {
    const notes = document.querySelectorAll('.note')
    const upperCaseSaerch = search.toUpperCase()
    
    notes.forEach((note) => {
        const textareaValue = note.querySelector('textarea').value.toUpperCase()

        if(upperCaseSaerch === '') showNotes()

        if(!textareaValue.includes(upperCaseSaerch)) {
            note.classList.add('hide')
        }
    })
}

// Local storage
const getNotes = () => {
    const notes = JSON.parse(localStorage.getItem('notes') || "[]")

    const orderedNote = notes.sort((a, b) => a.fixed > b.fixed ? -1 : 1)

    return orderedNote
}   

const seveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}


// Eventos
addNoteBtn.addEventListener('click', () => addNote())

searchInput.addEventListener('keyup', (e) => {
    const search = e.target.value
    searchNote(search)
})

noteInput.addEventListener('keydown', (e) => {
    console.log(e.key);
    if(e.key === "Enter") addNote()
})

// Inicialização
showNotes()

'e'.toUpperCase()