import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_URL;

export const getAllCategory = () => {
    return axios.get(`${apiUrl}/category/list`)
}
export const getAllSubCategory = () => {
    return axios.get(`${apiUrl}/subcategory/list`)
}

export const findOneCategory = (id) => {
    return axios.get(`${apiUrl}/category/list/${id}`)
}


export const deleteCategory = (id) => {
    //console.log('==',id)
    return axios.get(`${apiUrl}/category/delete/${id}`)
}
export const addCategory = (Category) => {
    //console.log("===",Category)
    return axios.post(`${apiUrl}/category/add`, Category)
}
export const updateCategory = (Category) => {
    //console.log("====",Category)
    return axios.post(`${apiUrl}/category/update/${Category.id}`, Category)
}
