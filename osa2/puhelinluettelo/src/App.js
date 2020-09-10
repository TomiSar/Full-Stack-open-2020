import React, { useState, useEffect } from "react"
import axios from 'axios'
import PersonForm from "./components/PersonForm"
import Persons from './components/Persons'
import PersonFilter from './components/PersonFilter'

const App = () => {
  //vakiot
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  //useEffect HookFunction tuodaan axios.get('http://localhost:3001/persons') URL-osoitteesta Backend-serveriltä
  //db.json tiedostosta numerotiedot ja asetetaan vastaanotettu (response.data) persons luetteloon joka näkyy FrontEndissa  
  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data);
    })
  }, [])

  //Uusi numero lisätään vanhojen joukkoon taulukon metodia concat hyödyntäen. Estetään lomakkeen lähetyksen oletusarvoinen toiminta!
  //Tapahtumankäsittelijä tyhjentää myös syötekenttää kontrolloivan tilan newName/newNumber funktioilla setNewName/setNewNote
  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    //Jos lisättävä nimi on jo sovelluksen tiedossa, estä lisäys. Anna tilanteessa virheilmoitus alert().
    var onPhonebook = persons.find(person => person.name === newName)
    if (onPhonebook) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(person))
      setNewName('')
      setNewNumber('')
    }
  }

  //Jos persons taulukko sisältää syötteen kirjaimia. Nimen mukaisesti hakua filteröidään näyttämään vaan haun mukaiset nimet ja numerot.
  const filterPersons = filter ? persons.filter(person => {
      return person.name.toLowerCase().includes(filter.toLowerCase())
    }) : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <PersonFilter setFilter={setFilter} filter={filter} />
      <h2>Add a new</h2>
      <PersonForm addPerson={addPerson} setNewName={setNewName} newName={newName} 
                                        setNewNumber={setNewNumber} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons persons={filterPersons} />
    </div>
  );
};

export default App;