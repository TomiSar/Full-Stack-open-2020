// import React, { useState } from "react";
// import ReactDOM from "react-dom";
//#region 1.b Javascriptiä
//run on cmd --> node pathto.js file (C:\Users\TS\CodeRepos\FullStackOPEN2020\harjoitukset\osa1\src\node index1B.js)  
//Luokat
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log('Hello, my name is', this.name)
  }
}

const arto = new Person('Arto Hellas', 35)
console.log(arto)
console.log('arto tyyppi ' + typeof(arto))
console.log('arto konstruktorin oliomuutujan name tyyppi ' + (typeof(arto.name)))
console.log('arto konstruktorin oliomuutujan age tyyppi ' + (typeof(arto.age)))

//Olioiden metodit ja this
const arto = {
  name: 'Arto Hellas',
  greet: function () {
    console.log('hello, my name is', this.name)
  },
}

//On useita mekanismeja, joiden avulla alkuperäinen this voidaan säilyttää, eräs näistä on metodin bind käyttö:
//arto.greet.bind(arto) luo uuden funktion, missä se on sitonut this:in tarkoittamaan Artoa riippumatta siitä missä ja miten metodia kutsutaan.
setTimeout(arto.greet.bind(arto), 1000)

//Eräs this:in katoamiseen johtava tilanne tulee esim. jos pyydetään Artoa tervehtimään sekunnin kuluttua metodia setTimeout hyväksikäyttäen
setTimeout(arto.greet, 1000)  //hello, my name is undefined

const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'Filosofian tohtori',
  greet: function() {
    console.log('hello, my name is', this.name)
  },
  doAddition: function(a, b) {
    console.log(a + b)
  },
}

arto.greet()                                      //hello, my name is Arto Hellas
const referenceToGreet = arto.greet(this.name)  //hello, my name is Arto Hellas
const referenceToGreet = arto.greet
referenceToGreet()                                //hello, my name is undefined

arto.doAddition(1, 4)        // tulostuu 5
//talletetaan metodiviite muuttujaan ja kutsumalla metodia muuttujan kautta
const referenceToAddition = arto.doAddition
referenceToAddition(10, 15)  // tulostuu 25

const arto = {
  name: 'Arto Hellas',
  age: 35,
  education: 'Filosofian tohtori',
  greet: function() {
    console.log('Hello, my name is', this.name)
    console.log('My age is', this.age,'years')
    console.log('My education is', this.education)
  },
}

arto.greet()  // Hello my name is Arto Hellas
              //My age is 35 years
              //My education is Filosofian tohtori

console.log(arto.age) //35
arto.growOlder = function (years) {
  this.age += years;
}
arto.growOlder(5) //ikää kasvatetaan 5 vuodella
console.log(arto.age) //40

// Funktiot
// Toinen tapa on tehdä määrittely funktiolausekkeena. Tällöin funktiolle ei tarvitse antaa nimeä
// ja määrittely voi sijaita muun koodin seassa:
const average = function(a, b) {
  return (a + b) / 2
}

const vastaus = average(2, 5)
console.log(vastaus)

function average(a, b) {
  return (a + b) / 2
}
console.log(average(9, 7))

function multiply(a, b) {
  return a * b
}

const vastaus = multiply(2.5, 4.5)
console.log(vastaus)

const t = [1, 2, 3]
const tSquared = t.map(p => p * p)
console.log(tSquared) // tSquared on nyt [1, 4, 9]

//Jos funktio sisältää ainoastaan yhden lausekkeen, ei aaltosulkeita tarvita.
const square = p => p * p;
console.log(square(4))

const square = p => {
  return p * p;
}

console.log(square(4))

const sum = (p1, p2) => {
  return p1 + p2;
}

const result = sum(2, 3)
console.log(result)
console.log(sum(5, 7))

//Oliot
const object1 = {
  name: 'Tomi Sarjamo',
  age: '40',
  education: 'Electronics engineer'
}

const object12 = {
  name: 'Full Stack -websovelluskehitys',
  level: 'aineopinto',
  size: 5,
}

const object3 = {
  name: {
    first: 'Juha',
    last: 'Tauriainen',
  },
  grades: [2, 3, 5, 3],
  department: 'TKTL',
}

console.log('My name is ' + object1.name + " i'm " + object1.age + ' years old and my education is ' + object1.education + '.')
const fieldName = 'age'
console.log(object1[fieldName])    // tulostuu 40
object1.address = 'Tapiola'
object1['secret number'] = 12341
console.log(object1)

Taulukot
const taulukko = [1, 2, 3, 4, 5]
const [eka, toka, ...rest] = taulukko
console.log(eka, toka)                            //1 2
console.log('rest pituus: ' + rest.length)        //3
console.log(rest)                                 //[ 3, 4, 5 ]
console.log(eka, toka, rest[0], rest[1], rest[2]) //1 2 3 4 5

const taulukko = [1, 2, 3]
const map2 = taulukko.map(value => '<li>' + value + '</li>') //[ '<li>1</li>', '<li>2</li>', '<li>3</li>' ]
console.log(map2)

const map1 = taulukko.map(arvo => arvo * 2)
console.log(taulukko)
console.log(map1)

const taulukko2 = taulukko.concat(5)
console.log(taulukko)
console.log(taulukko2)

taulukko.push(4)
console.log('taulukon pituus: ' + taulukko.length)
console.log(taulukko[3], taulukko[2], taulukko[1], taulukko[0]) //4 3 2 1
taulukko.forEach(arvo => {
  console.log(arvo)
});

const x = 1
let y = 5
console.log(x, y)   // tulostuu 1, 5
y += 10
console.log(x, y)   // tulostuu 1, 15
y = 'teksti'
console.log(x, y)   // tulostuu 1, teksti
x = 4               // aiheuttaa virheen TypeError: Assignment to constant variable.
//#endregion