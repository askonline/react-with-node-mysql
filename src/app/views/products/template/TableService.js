import axios from 'axios'
const apiUrl = process.env.REACT_APP_API_URL;
export const getAllProducts = () => {
    return axios.get(`${apiUrl}/product/list`)
}

export const findOneProduct = (id) => {
    return axios.get(`${apiUrl}/product/list/${id}`)
}


export const deleteProduct = (id) => {
    //console.log('==',id)
    return axios.get(`${apiUrl}/product/delete/${id}`)
}
export const addProduct = (Product) => {
    //console.log("===",Product)
    return axios.post(`${apiUrl}/product/add`, Product)
}
export const updateProduct = (Product) => {
    //console.log("====",Product)
    return axios.post(`${apiUrl}/product/update/${Product.id}`, Product)
}
export const getAllCategory = () => {
    return axios.get(`${apiUrl}/category/list`)
}
export const getAllSubCategory = () => {
    return axios.get(`${apiUrl}/subcategory/list`)
}

export const findOneCategory = (id) => {
    return axios.get(`${apiUrl}/category/list/${id}`)
}
export const findSubCategoryByCategoryId = (id) => {
    //console.log("===",id)
    return axios.get(`${apiUrl}/subcategorybycategory/${id}`)
}
