import React, { useState, useEffect } from "react"
import PersonForm from "./components/PersonForm"
import Persons from './components/Persons'
import PersonFilter from './components/PersonFilter'
import personService from './services/persons'

const App = () => {
  //vakiot
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')

  //useEffect HookFunction tuodaan axios.get('http://localhost:3001/persons') URL-osoitteesta Backend-serveriltä
  //db.json tiedostosta numerotiedot ja asetetaan vastaanotettu (response.data) persons luetteloon joka näkyy FrontEndissa  
  useEffect(() => {
    personService
      .getAll()
      .then((data) => {
        setPersons(data)
      })
  }, [])

  //handleNameChange, handleNumberChange and handleFilterChange with event  
  const handleNameChange = (event) => { setNewName(event.target.value )}
  const handleNumberChange = (event) => { setNewNumber(event.target.value )}
  const handleFilterChange = (event) => { setFilter(event.target.value )}

  const deletePerson = (id) => {
    const choiceToDelete = persons.find(p => p.id === id)
    const confirm = window.confirm(`Delete ${choiceToDelete.name}?`)
    if (confirm) {
      personService.remove(id)
      .then(response => {
        setPersons(persons.filter(p => p.id !== id))
        //notifyWith
      }).catch(() => {
        setPersons(persons.filter(p => p.id !== id))
        //notifyWith
      })
    }
  }
  //Uusi numero lisätään vanhojen joukkoon taulukon metodia concat hyödyntäen. Estetään lomakkeen lähetyksen oletusarvoinen toiminta!
  //Tapahtumankäsittelijä tyhjentää myös syötekenttää kontrolloivan tilan newName/newNumber funktioilla setNewName/setNewNote
  const addPerson = (event) => {
    event.preventDefault()
    const pbContains = persons.find(person => person.name === newName)
    if (pbContains) {
      const confirm = window.confirm(`${pbContains.name} is allready added to phonebook, replace the old number with new one?`)
      if (confirm) {
        personService.update(pbContains.id, {
          name: pbContains.name,
          number: newNumber
        }).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== pbContains.id ? person : returnedPerson))
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
        //notifyWith
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        //Search error Object from server by error.response.data.error
        console.log(error.response.data.console)
        //notifyWith
      })
    }
  }

    // //Jos lisättävä nimi on jo sovelluksen tiedossa, estä lisäys. Anna tilanteessa virheilmoitus alert().
    // var onPhonebook = persons.find(person => person.name === newName)
    // if (onPhonebook) {
    //   alert(`${newName} is already added to phonebook`)
    // } else {
    //   setPersons(persons.concat(person))
    //   setNewName('')
    //   setNewNumber('')
    // }

    // // axios.post('http://localhost:3001/persons', person)
    // // .then(response => { 
    // //   setPersons(persons.concat(response.data))
    // personService.create(person).then(returnedPerson => {
    //   setPersons(persons.concat(returnedPerson))
    //   setNewName('')
    //   setNewNumber('')
    //   })
    // }

    const personsToShow = filter ? persons.filter(person => {
      return person.name.toLowerCase().includes(filter.toLowerCase())
    }) : persons

  return (
    <div>
      <h1>Phonebook</h1>
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