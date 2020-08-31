import React from "react";
import ReactDOM from "react-dom";

//#region  1.a Reactin alkeet
const Footer = () => {
  return (
    <div>
      Greeting app created by
      <a href="https://github.com/TomiSar"> Tomi Sarjamo</a>
    </div>
  )
}

//props: tiedonvälitys komponenttien välillä
const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}, you are {props.age} years old.</p>
    </div>
  )
}

const App = () => {
  const nimi = 'Pekka'
  const ika = '19'

  return (
    <div>
      <h1>Greetings my friends</h1>
      <Hello name={nimi} age={ika} />
      <Hello name="Jurgen" age={50 + 19}/>
      <Footer />
    </div>
  )
}

const App = () => {
  // console.log('Hello from console')
  //muuttujat
  const now = new Date()
  const a = 10
  const b = 20

  return (
    <div>
      <p>Hello World from React.</p>
      <p>Date: {now.toLocaleDateString()} and time: {now.toTimeString()}</p>
      <p>{a} + {b} = {a + b}</p>
    </div>
  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
//#endregion