import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_URL;

export const getAllVariable = (id) => {
    return axios.get(`${apiUrl}/variable/list`)
}
export const findOneVariable = (id) => {
    //console.log('==',id)
    return axios.get(`${apiUrl}/variable/list/${id}`)
}

export const deleteVariable = (id) => {
    console.log('==',id)
    return axios.get(`${apiUrl}/variable/delete/${id}`)
}
export const addVariable = (Variable) => {
    //console.log("===",Variable)
    return axios.post(`${apiUrl}/variable/add`, Variable)
}
export const updateVariable = (Variable) => {
    //console.log("====",Variable)
    return axios.post(`${apiUrl}/variable/update/${Variable.id}`, Variable)
}
