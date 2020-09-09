import React from 'react'

//Komponentissa tulostetaan tulostetaan henkilöiden puhelinnumerot. Käyttää henkilö kentän key arvona henkilön nimeä. 
const Persons = (props) => {
    return (
        props.persons.map(person => 
            <p key={person.name}>{person.name} {person.number}</p>
        )
    )
}

export default Persons