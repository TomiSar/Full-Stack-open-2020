import React, { useState } from "react";
import ReactDOM from "react-dom";

//#region  1.d Monimutkaisempi tila, Reactin debuggaus
//Funktio joka palauttaa funktion
//Hyödyllistä materiaalia --> https://reactjs.org/docs/getting-started.html
//Egghead.io:n kurssi --> https://egghead.io/courses/start-learning-react
//Hieman uudempi kurssi --> https://egghead.io/courses/the-beginner-s-guide-to-react

const Display = ({value}) => (<div> {value}</div>)

const Button = ({onClick, text}) => (
  <button onClick={onClick}> {text} </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    setValue(newValue)
  }

  return (
    <div>
      <Display value={value} />
      <Button onClick={() => setToValue(1000)} text='thousand'/>
      <Button onClick={() => setToValue(0)} text='reset' />
      <Button onClick={() => setToValue(value + 1)} text='increment'/>
    </div>
  )
}

const App = (props) => {
  const [value, setValue] = useState(10)

  //Voimme käyttää samaa kikkaa myös muodostamaan tapahtumankäsittelijöitä, jotka asettavat komponentin tilalle halutun arvon.
  const setToValue = (newValue) => () => {
    setValue(newValue)
  }

  return (
    <div>
      <button onClick={setToValue(value + 1)}>increment</button>
      <button onClick={setToValue(value - 1)}>decrement</button>
      <button onClick={setToValue(0)}>reset</button>
      <p>{value}</p>
    </div>
  )
}

const App = (props) => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => () => {
    setValue(newValue)
  }

  //Käyttämämme määrittelytapa on hieman verboosi
  //Eliminoidaan apumuuttuja, ja määritellään palautettava funktio suoraan returnin yhteydessä:
  const hello = (parameter) => () => {
    console.log('hello',parameter)
  } 

  return (
    <div>
      {value}
      <button onClick={hello('world')}>world button</button>
      <button onClick={hello('world')}>react button</button>
      <button onClick={hello('function')}>function button</button>
    </div>
  )
}


//Tapahtumankäsittely revisited
const App = (props) => {
  const [value, setValue] = useState(10)

  const handleClick = () => {
    console.log('clicked the button')
    setValue(0)
  }

  return (
    <div>
      {value}
      <button onClick={handleClick}>button</button>
    </div>
  )
}

//Hookien säännöt
const App = (props) => {
  // nämä ovat ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // ei ehtolauseessa
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // eikä myöskään loopissa
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // ei muiden kuin komponentin määrittelevän funktion sisällä
    const [x, setX] = useState(-1000)
  }

  return (
    <div>
      Hooks rules
    </div>
  )
}

// Ehdollinen renderöinti
// Muutetaan sovellusta siten, että näppäilyhistorian renderöinnistä vastaa komponentti
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        No button has been pressed. The app is used by pressing the buttons.
      </div>
    )
  }
  return <div>Button press history {props.allClicks.join(" ")}</div>;
}

//Debug option
const Button = (props) => { 
  console.log(props)
  const { onClick, text } = props
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

//Remember Event name --> onClick
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
)

const App = (props) => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat("L"))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat("R"))
    setRight(right + 1)
  }

  const handleResetClick = () => {
    allClicks.length = 0
    setLeft(0)
    setRight(0)
  }

  //  return (
  //   <div>
  //     <div>
  //       <h1>Choose your button</h1>
  //       {left}
  //       <Button onClick={handleLeftClick} text='left'/>
  //       <Button onClick={handleRightClick} text='right'/>
  //       {right}
  //       <Button onClick={handleResetClick} text='reset'/>
  //       <h2>Moves:</h2>
  //       <History allClicks={allClicks} />
  //       {/* <p>{allClicks.join(' ')}</p> */}
  //       <p>Total moves {allClicks.length}</p>
  //     </div>
  //   </div>
  // )

  return (
    <div>
      <div>
        <h1>Choose your button</h1>
        {left}
        <button onClick={handleLeftClick}>left+</button>
        <button onClick={handleRightClick}>right+</button>
        {right}
        <button onClick={handleResetClick}>reset</button>
        <h2>Moves:</h2>
        <History allClicks={allClicks} />
        {/* <p>{allClicks.join(' ')}</p> */}
        <p>Total moves {allClicks.length}</p>
      </div>
    </div>
  )
}

//Taulukon käsittelyä
const App = (props) => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  const handleResetClick = () => {
    allClicks.length = 0
    setLeft(0)
    setRight(0)
  }

  return (
    <div>
      <div>
        <h1>Choose your button</h1>
        {left}
        <button onClick={handleLeftClick}>left+</button>
        <button onClick={handleRightClick}>right+</button>
        {right}
        <button onClick={handleResetClick}>reset</button>
        <h2>Moves:</h2>
        <p>{allClicks.join(' ')}</p>
        <p>Total moves {allClicks.length}</p>
      </div>
    </div>
  )
}

//Complex syntax
const App = (props) => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const handleLeftClick = () => setClicks({...clicks, left: clicks.left + 1})
  const handleRightClick = () => setClicks({...clicks, right: clicks.right + 1})
  const handleResetCLick = () => setClicks({left: clicks.left = 0, right: clicks.right = 0})

  //Complicated syntax use equivalent spread syntax above (much simple)
  // const handleLeftClick = () => {
  //   const newClicks = {
  //     ...clicks,
  //     right: clicks.left++
  //   }
  //   setClicks(newClicks)
  // }

  // const handleRightClick = () => {
  //   const newClicks = {
  //     ...clicks,
  //     right: clicks.right++
  //   }
  //   setClicks(newClicks)
  // }

  // const handleResetCLick = () => {
  //   const newClicks = {
  //     left: 0,
  //     right: 0
  //   }
  //   setClicks(newClicks)
  // }

  return (
    <div>
      <div>
        {clicks.left}
        <button onClick={handleLeftClick}>left</button>
        <button onClick={handleRightClick}>right</button>
        {clicks.right}
        <button onClick={handleResetCLick}>reset</button>
      </div>
    </div>
  )
}

const App = (props) => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  //const resetHandle = () => setLeft(0) + setRight(0)

  return (
    <div>
      <div>
        {left}
        <button onClick={() => setLeft(left + 1)}>left+</button>
        <button onClick={() => setRight(right + 1)}>right+</button> {right}
        <button onClick={() => setLeft(0) + setRight(0)}>reset</button>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"));
//#endregion
