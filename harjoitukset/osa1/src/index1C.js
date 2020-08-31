import React, { useState } from "react";
import ReactDOM from "react-dom";
//#region  1.c Komponentin tila ja tapahtumankäsittely

//Tapahtumankäsittelijä on funktio
//Tilallinen komponentti
const Display = ({ counter }) => <div>{counter}</div>

//Vastaava suoraviivaistus voidaan tehdä myös nappia edustavalle komponentille
//Destrukturoidaan props:ista tarpeelliset kentät ja käytetään nuolifunktioiden tiiviimpää muotoa
const Button = ({ handleClick, text}) => (
    <button onClick={handleClick}>
      {text}
    </button>
)

//Määritellään nyt sovelluksemme komponentille App tila Reactin state hookin avulla.
//counter ja setCounter molemmille alustetaan alkuarvoon 0
//Sovellus määrittelee funktion setTimeout avulla, että tilan counter arvoa kasvatetaan yhdellä sekunnin päästä:
const App = () => {
  const [counter, setCounter] = useState(0);
  const incrementByOne = () => setCounter(counter + 1)
  const decrementByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  //setTimeout(() => setCounter(counter + 1), 1000);
  //console.log("Rendering...", counter, "seconds");
  console.log('Counter', counter);

  return (
    <div>
      {/* <div>counter : {counter}</div> */}
      <Display counter={counter} />
      <Button handleClick={incrementByOne} text='plus'/>
      <Button handleClick={decrementByOne} text='minus'/>
      <Button handleClick={setToZero} text='reset to zero'/>
    </div>
  )
}

//Sivun uudelleenrenderöinti
let counter = 1;
const App = (props) => {
  const { counter } = props;
  return <div>counter sekunnit: {counter}</div>;
};

const refresh = () => {
  ReactDOM.render(<App counter={counter} />, document.getElementById("root"));
};

/*Renderöinti ja laskurin kasvatus toistuvasti sekunnin välein käyttäen SetInterval:*/
setInterval(() => {
  refresh()
  counter += 1
}, 1000);

// Voimme viedä destrukturoinnin vielä askeleen verran pidemmälle
// Destrukturointi tehdään nyt suoraan sijoittamalla komponentin saamat propsit muuttujiin name ja age.
// Eli sensijaan että props-olio otettaisiin vastaan muuttujaan props ja sen kentät sijoitettaisiin tämän jälkeen muuttujiin name ja age
// sijoitamme destrukturoinnin avulla propsin kentät suoraan muuttujiin kun määrittelemme komponettifunktion saaman parametrin:
const Hello = ({ name, age }) => {
  //Destrukturointi tekee apumuuttujien määrittelyn vielä helpommaksi, sen avulla voimme
  //"kerätä" olion oliomuuttujien arvot suoraan omiin yksittäisiin muuttujiin:
  //const { name, age } = props;
  const bornYear = () => new Date().getFullYear() - age; //Born year calculation

  return (
    <div>
      <p>Hello {name}, you are {age} years old.</p>
      <p>You were born on year {bornYear()}.</p>
    </div>
  )
}

const App = () => {
  const name = 'Pekka'
  const age = 21

  return (
    <div>
      <h1>Greeting all my friends</h1>
      <img src="https://i.pinimg.com/originals/d0/68/b7/d068b7ca5c4dda7ed2b0c851bdfa887f.jpg" width="300" height="400" />
      <p>
          <a href="https://github.com/TomiSar">My GitHub</a>
      </p>
      <Hello name={name} age={age} />
      <Hello name="Maukka" age={50} />

    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))

//#endregion