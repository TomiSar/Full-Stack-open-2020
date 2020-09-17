//Palvelimen kanssa tapahtuvan kommunikoinnin eristäminen omaan moduuliin
//Single responsibility -periaatteen hengessä kommunikointi onkin viisainta eristää omaan moduuliinsa.
//Promise ja virheet
//Simuloidaan tälläistä tilannetta "kovakoodaamalla" noteServiceen funktioon getAll muistiinpano, 
//jota ei ole todellisuudessa (eli palvelimella) olemassa:
//Hae kaikki
import axios from 'axios'
const baseUrl = 'htttp://localhost/3001/notes'

//Search all
const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        content: 'This note is not saved to server',
        date: '2019-05-30T17:30:31.098Z',
        important: true,
    }
    return request.then(response =>  response.data.concat(nonExisting))
}

//Luo uusi
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => {
        return response.data
    })
}

//Päivitä  
const update = (id, newObject) =>  {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => {
        return response.data
    })
}

//export 
export default { getAll, create, update }