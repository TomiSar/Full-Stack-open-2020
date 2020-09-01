import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//#region  2.a Kokoelmien renderöinti ja moduulit
//Taulukkojen käyttö Javascriptissä
//Kokoelmien renderöiminen
const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2020-01-10T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2020-01-10T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2020-01-10T19:20:14.298Z',
    important: true
  },
  {
    id: 4,
    content: 'PUT and DELETE are also methods of HTTP protocol',
    date: '2020-03-12T19:20:14.298Z',
    important: false
  }
]

ReactDOM.render(<App notes={notes} />, document.getElementById('root'));

//#endregion