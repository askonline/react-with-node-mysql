import React, {useEffect, useState } from 'react';
import { findOneProduct,getAllCategory} from './TableService'
import { useParams } from "react-router-dom";

const CategoryDropdown = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoryList, setCategoryList] = useState([])
  const { id } = useParams();
  const [findOne, setfindOne] = useState([])

  const findOneData = () => {
    findOneProduct(id).then(({ data }) => {
      setfindOne(data)
    })
    }
  //console.log("====",findOne)

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    props.onCategoryChange(event.target.value);
  };

  const getCategoryData = () => {
    getAllCategory().then(({ data }) => {
        setCategoryList(data)
    })
    }
    useEffect(() => {
      getCategoryData()
      findOneData()
    
    }, [])

    const options = categoryList.map((citem , ind) => {
      return <option 
                  value={citem.id} 
                  selected={citem.id === findOne.parent_cat_id}>{citem.name}
             </option>
      })

  return (
    <div>
      
      <select id="category"  onChange={handleCategoryChange} style={{ 
          padding:"8px",
          margin: "0px",
          width: "100%" 
        }} name='categoryid' 
        required> 
        <option value={''}>Select Category</option>
         {options}
       
        </select> 
        
        
    </div>
  );
};

export default CategoryDropdown;