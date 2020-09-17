import React from 'react'


//Lisätään muistiinpanojen yhteyteen painike, millä niiden tärkeyttä voi muuttaa.
//Muistiinpanon määrittelevän komponentin muutos on seuraavat:
const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
    <li>
      {note.content}
      <button onClick={toggleImportance}>{label}</button>
    </li>
  )
}

export default Note;