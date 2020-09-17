import React, { useState, useEffect } from "react"
import Note from "./components/Note"
import noteService from './services/notes'
import Notification from './components/Notification'

//käynnistetään json-server PORT=3001 --> npx json-server --port=3001 --watch db.json
//Kesken luku 2 d) Kehittyneempi tapa olioliteraalien määrittelyyn !!!
const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('') //text On label field
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('Some error occured')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

    //Komponentti App määrittelee tapahtumankäsittelijästä toggleImportanceOf ja välittää sen jokaiselle Note-komponentille:
    //Taulukon metodilla find etsitään muutettava muistiinpano ja talletetaan muuttujaan note viite siihen.
    //Sen jälkeen luodaan uusi olio, jonka sisältö on sama kuin vanhan olion sisältö poislukien kenttä important.
    //Niin sanottua object spread -syntaksia hyödyntävä uuden olion luominen näyttää hieman erikoiselta:
    //Yksittäistä json-serverillä olevaa muistiinpanoa voi muuttaa kahdella tavalla, joko korvaamalla sen 
    //tekemällä HTTP PUT -pyyntö muistiinpanon yksilöivään osoitteeseen tai muuttamalla ainoastaan joidenkin 
    //muistiinpanon kenttien arvoja HTTP PATCH -pyynnöllä.  console.log(`importance of ${id} needs to be toggled`)
    const toggleImportanceOf = id => {
      const note = notes.find(n => n.id === id)
      const changedNote = { ...note, important: !note.important }
  
      noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)   
      })
  }

  //#region Kommentoidaan pois GET-pyyntö palvelin ei palauta viestejä 
  //Add note
  // const addNote = (event) => {
  //   event.preventDefault()
  //   const noteObject = {
  //     content: newNote,
  //     date: new Date().toISOString(),
  //     important: Math.random() > 0.5,
  //     id: notes.length + 1,
  //   }
  //   //Uusi muistiinpano lisätään vanhojen joukkoon taulukon metodia concat
  //   //Tapahtumankäsittelijä tyhjentää myös syötekenttää kontrolloivan tilan newNote sen funktiolla setNewNote
  //   setNotes(notes.concat(noteObject))
  //   setNewNote('')
  // }
  //#endregion

  //Muutetaan nyt uuden muistiinpanon lisäämisestä huolehtivaa tapahtumankäsittelijää seuraavasti:
  //POST komennolla lisätään uusi noteObject json-serverilla. Muistiinpanoa vastaava olio, ei kuitenkaan lisätä 
  //sille kenttää id, sillä on parempi jättää id:n generointi palvelimen vastuulle!
  //Koska POST-pyynnössä lähettämämme data oli Javascript-olio, osasi axios automaattisesti 
  //asettaa pyynnön Content-type headerille oikean arvon eli application/json.
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
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
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}> 
          {showAll ? 'important' : 'all' }
        </button>
      </div>
      <ul>
        {notesToShow.map(note => 
          <Note key={note.id} note={note}
          toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App;