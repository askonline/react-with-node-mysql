import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_URL;


export const getAllModel = () => {
    return axios.get(`${apiUrl}/model/list`)
}


export const findOnemodel = (id) => {
    return axios.get(`${apiUrl}/model/list/${id}`)
}
export const deletemodel = (id) => {
    //console.log('==',id)
    return axios.get(`${apiUrl}/model/delete/${id}`)
}

export const getAllCategory = () => {
    return axios.get(`${apiUrl}/category/list`)
}
export const findSubCategoryByCategoryId = (id) => {
    //console.log("===",id)
    return axios.get(`${apiUrl}/subcategorybycategory/${id}`)
}

export const getAllSubCategory = () => {
    return axios.get(`${apiUrl}/subcategory/list`)
}
export const getProductBySubCategory = (id) => {
    return axios.get(`${apiUrl}/productbysubcategory/${id}`)
}

export const getAllVariable = (id) => {
    return axios.get(`${apiUrl}/variable/list`)
}