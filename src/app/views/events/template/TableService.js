import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_URL;

export const getAllEvents = () => {
    return axios.get(`${apiUrl}/events/list`)
}
export const findOneEvents = (id) => {
    //console.log('==',id)
    return axios.get(`${apiUrl}/events/list/${id}`)
}

export const deleteEvents = (id) => {
    console.log('==',id)
    return axios.get(`${apiUrl}/events/delete/${id}`)
}
export const addEvents = (events) => {
    //console.log("===",events)
    return axios.post(`${apiUrl}/events/add`, events)
}
export const updateEvents = (events) => {
    //console.log("====",events)
    return axios.post(`${apiUrl}/events/update/${events.id}`, events)
}
