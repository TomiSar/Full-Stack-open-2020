import React, { useState, useEffect } from "react"
import PersonForm from "./components/PersonForm"
import Persons from './components/Persons'
import PersonFilter from './components/PersonFilter'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  //vakiot
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification ] = useState(null)

  //useEffect HookFunction tuodaan axios.get('http://localhost:3001/persons') URL-osoitteesta Backend-serveriltä
  //db.json tiedostosta numerotiedot ja asetetaan vastaanotettu (response.data) persons luetteloon joka näkyy FrontEndissa  
  useEffect(() => {
    personService
      .getAll()
      .then((data) => {
        setPersons(data)
      })
  }, [])

  const notifyWith = (message, type='success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  //handleNameChange, handleNumberChange and handleFilterChange with event  
  const handleNameChange = (event) => { setNewName(event.target.value )}
  const handleNumberChange = (event) => { setNewNumber(event.target.value )}
  const handleFilterChange = (event) => { setFilter(event.target.value )}

  const deletePerson = (id) => {
    const toDelete = persons.find(p => p.id === id)
    const ok = window.confirm(`Delete ${toDelete.name}`)
    if (ok) {
      personService.remove(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          notifyWith(`Deleted ${toDelete.name}`)
        }).catch(() => {
          setPersons(persons.filter(p => p.id !== id))
          notifyWith(`${toDelete.name} had already been removed`, 'error')
        })
    }
  }
  //Uusi numero lisätään vanhojen joukkoon taulukon metodia concat hyödyntäen. Estetään lomakkeen lähetyksen oletusarvoinen toiminta!
  //Tapahtumankäsittelijä tyhjentää myös syötekenttää kontrolloivan tilan newName/newNumber funktioilla setNewName/setNewNote
  const addPerson = (event) => {
    event.preventDefault()
    const existing = persons.find(p => p.name === newName)
    if (existing) {
      const ok = window.confirm(`${existing.name} already in phonebook, replace the old number with new one?`)
      if (ok) {
        personService.update(existing.id, {
          name: existing.name,
          number: newNumber
        }).then(retunedPerson => {
          setPersons(persons.map(person => person.id !== existing.id ? person : retunedPerson))
          notifyWith(`Changed number of  ${existing.name}`)
          setNewName('')
          setNewNumber('')
        })
      }
    } else {
      personService.create({
        name: newName,
        number: newNumber   
      }).then(addedPerson => {
        setPersons(persons.concat(addedPerson))
        notifyWith(`Added ${newName}`)
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        // pääset käsiksi palvelimen palauttamaan virheilmoitusolioon näin
        console.log(error.response.data.error)
        notifyWith(`${error.response.data.error} `, 'error')
      })
    }
  }
    const personsToShow = filter ? persons.filter(person => {
      return person.name.toLowerCase().includes(filter.toLowerCase())
    }) : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification notification={notification} />
      <PersonFilter filter={filter} onFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
                  addPerson={addPerson} newName={newName} newNumber={newNumber}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App