import axios from "axios"
const baseUrl = "http://localhost:3001/people"

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = personObject => {
    const req = axios.post(baseUrl, personObject)
    return req.then(res => res.data)
}

const update = (id, personObject) => {
    const req = axios.put(`${baseUrl}/${id}`, personObject)
    return req.then(res => res.data)
}

const remove = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

export default { getAll, create, update, remove }