import React from 'react'

//Komponentissa tulostetaan tulostetaan henkilöiden puhelinnumerot. Käyttää henkilö kentän key arvona henkilön nimeä. 
//Tee ohjelmaan mahdollisuus yhteystietojen poistamiseen. Poistaminen voi tapahtua esim. nimen yhteyteen liitetyllä napilla.
const Persons = ({ persons, deletePerson }) => {
    return (
      persons.map(person=>
        <p key={person.id}>
          {person.name} {person.number} 
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>
      )
    )
  }
  
  export default Persons