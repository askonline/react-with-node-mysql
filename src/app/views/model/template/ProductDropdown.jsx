import React, { useState, useEffect } from 'react';
import makeAnimated from 'react-select/animated';
import Select from 'react-select'
import { findOnemodel,getProductBySubCategory} from './TableService'
import { useParams } from "react-router-dom";



const ProductDropdown = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const animatedComponents = makeAnimated();
  const [prodeuctsList, setProdeuctsList] = useState([])
  
  const { id } = useParams();
  const [findOne, setfindOne] = useState([])
  
  const findOneModelData = () => {
    findOnemodel(id).then(({ data }) => {
      setfindOne(data)
    })
    }
  useEffect(() => {
    findOneModelData()
  
  }, [])

  //console.log("===",findOne)

  useEffect(() => {
    if(id)
    {
      getProductBySubCategory(119).then(({ data }) => {
        setProdeuctsList(data)
      })
    }
    if(props.subcategory)
    {
      getProductBySubCategory(props.subcategory).then(({ data }) => {
        setProdeuctsList(data)
      })
    }
}, [props.subcategory])



const productsoptions = prodeuctsList.map((citem , ind) => {
  return <option 
              value={citem.value} 
              selected={citem.value === Number(findOne.sub_category_id)}>{citem.label}
         </option>
  })

  return (
    <div>
      
      <select id="products"  style={{ 
          padding:"8px",
          margin: "0px",
          width: "100%" 
        }} name='projectname' 
        multiple
        > 
        <option value={''}>Select Products</option>
        {productsoptions}
        </select> 

        {/*
        <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        //defaultValue={[prodeuctsList[1], prodeuctsList[1]]}
        value={[prodeuctsList[1],prodeuctsList[2]]}
        isMulti
        options={prodeuctsList}
        name="products[]"
      /> 
      */}
    </div>
  );
};

export default ProductDropdown;