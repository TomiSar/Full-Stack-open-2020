import React, { useState, useEffect } from "react"
import axios from 'axios'
import Note from "./components/Note"

//käynnistetään json-server PORT=3001 --> npx json-server --port=3001 --watch db.json
const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('') //text On label field
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/notes').then(response => {
      console.log('promise fulfilled')
      setNotes(response.data)
    })
  }, [])
  //console.log('render', notes, notes)

  //Add note
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1,
    }
    //Uusi muistiinpano lisätään vanhojen joukkoon taulukon metodia concat
    //Tapahtumankäsittelijä tyhjentää myös syötekenttää kontrolloivan tilan newNote sen funktiolla setNewNote
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  //Näytetään vain tärkeäksi mnerkityt muistiinpanot -->  note-important jos nappia painetaan 
  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}> 
        show : {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App;