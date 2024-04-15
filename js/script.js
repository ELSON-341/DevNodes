// Elementos
const notesContainer = document.querySelector('#notes-container')
const noteInput = document.querySelector('#note-content')
const addNoteBtn = document.querySelector('.add-note')

// funçãoes
const addNote = () => {
    const noteObject = {
        id: createId(),
        content:noteInput.value,
        fixed: false,
    }
    const noteElement = createNote(noteObject.id, noteObject.content)
    notesContainer.appendChild(noteElement)
}
const createId = () => Math.floor(Math.random() * 5000)

const createNote = (id, content) => {
    const Element = document.createElement('div')
    Element.classList.add('note')

    const textarea = document.createElement('textarea')
    textarea.value = content
    textarea.placeholder = "Adicione algum texto"
    
    Element.appendChild(textarea)

    return Element
}

// Eventos
addNoteBtn.addEventListener('click', () => addNote())