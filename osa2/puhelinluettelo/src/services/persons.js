import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

//Search all
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => {
    return response.data;
  })
}

//Create new
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
    return request.then(response =>  response.data)
}

//Remove
const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

//Update
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, remove, update }