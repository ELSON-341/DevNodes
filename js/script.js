// Elementos
const notesContainer = document.querySelector('#notes-container')
const noteInput = document.querySelector('#note-content')
const addNoteBtn = document.querySelector('.add-note')

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
    const Element = document.createElement('div')
    Element.classList.add('note')

    const textarea = document.createElement('textarea')
    textarea.value = content
    textarea.placeholder = "Adicione algum texto"
    
    Element.appendChild(textarea)

    const pinIcon = document.createElement('i')
    pinIcon.classList.add(...['bi', 'bi-pin'])
    Element.appendChild(pinIcon)

    // Elventos do elemento
    Element.querySelector('.bi-pin').addEventListener('click', () => {
        toggleFixdNote(id)
    })

    if(fixed) Element.classList.add('fixed')

    return Element
}

const toggleFixdNote = (id) => {
    const notes = getNotes()
    
    const targetNote = notes.filter((note) => note.id === id)[0]
    targetNote.fixed = !targetNote.fixed
    seveNotes(notes);

    showNotes()
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