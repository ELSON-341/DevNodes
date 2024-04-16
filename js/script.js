// Elementos
const notesContainer = document.querySelector('#notes-container')
const noteInput = document.querySelector('#note-content')
const addNoteBtn = document.querySelector('.add-note')

// funçãoes
const showNotes = () => {
    getNotes().forEach((note) => {
        const noteElement = createNote(note.id, note.content, note.fixed)
        notesContainer.appendChild(noteElement)
    })
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
    const Element = document.createElement('div')
    Element.classList.add('note')

    const textarea = document.createElement('textarea')
    textarea.value = content
    textarea.placeholder = "Adicione algum texto"
    
    Element.appendChild(textarea)

    return Element
}

// Local storage
const getNotes = () => {
    const notes = JSON.parse(localStorage.getItem('notes') || "[]")
    
    return notes
}

const seveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Eventos
addNoteBtn.addEventListener('click', () => addNote())

// Inicialização
showNotes()