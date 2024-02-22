import React from 'react'
import { Formik } from 'formik'

import {
    TextField,
    Button,
    FormControlLabel,
    Grid,
    Icon,
    Radio,
    RadioGroup,
    MenuItem,
    Divider,
    Checkbox
    
  } from "@mui/material";
  import { Span } from "app/components/Typography";

  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  
  import { findOnemodel,getAllVariable} from './TableService'
  import * as yup from 'yup'
  import { useParams,useNavigate } from "react-router-dom";
   import 'react-responsive-select/dist/react-responsive-select.css';
  import CategoryDropdown from './CategoryDropdown';
  import SubcategoryDropdown from './SubcategoryDropdown copy';
  import ProductDropdown from './ProductDropdown';

const AddModelForm = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [findOne, setfindOne] = useState([])
  const [variablelist, setVariablelist] = useState([])
  
   /* ----------------- Get Category Id */
   const findOneModelData = () => {
    findOnemodel(id).then(({ data }) => {
      setfindOne(data)
    })
    }
    const variableData = () => {
      getAllVariable(id).then(({ data }) => {
        setVariablelist(data)
      })
      }

    const handleSubmit = async (values, { isSubmitting }) => {
        console.log("==",values)
        const formData = new FormData();
       
            /* if (id) {
                updateCategory({id,
                    ...values,
                })
            } else {
                addCategory({
                    ...values,
                })
            }
          */
            navigate('/model/list');
    }

  

    const initialValues = {
      products:'',
      subcategoryid:'',
      categoryid:'',
      metakdesc:'',
      metakeyword:'',
      metatitle:'',
      inputtype:'',
      variable:'',
      modelno:''
    }
    let modelno = findOne.model_number;
    //console.log("===",findOne)

    useEffect(() => {
      findOneModelData()
      variableData()
    }, [])
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedProducts, setSelectedProducts] = useState("");
  
  
    const handleCategoryChange = (category) => {
      setSelectedCategory(category);
    }; 
  
    const handleSubcategoryChange = (subcategory) => {
      setSelectedProducts(subcategory)
    };
    
  //console.log(findOne)
    
    return (
        <div className="m-sm-30">
                
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                    validationSchema={subCategorySchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                    <form className="p-4" onSubmit={handleSubmit}>
                      <Grid container spacing={3}>
                        <Grid item sm={6} xs={12}>
                        
                        <CategoryDropdown onCategoryChange={handleCategoryChange} />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <SubcategoryDropdown
                              category={selectedCategory}
                              onSubcategoryChange={handleSubcategoryChange}
                            />
                       
                        {/*selectedCategory && (
                            <SubcategoryDropdown
                              category={selectedCategory}
                              onSubcategoryChange={handleSubcategoryChange}
                            />
                        )*/}
                    </Grid> 
                    <Grid item sm={6} xs={12}>
                            <ProductDropdown
                             subcategory={selectedProducts}
                            />

                        {/*selectedProducts && (
                            <ProductDropdown
                             subcategory={selectedProducts}
                            />
                          )*/}
                   
                    </Grid>
                    
                    <Grid item sm={6} xs={12}>
                    <TextField
                        type="text"
                        name="modelno"
                        value={values.modelno || modelno}
                        fullWidth
                        onChange={handleChange}
                        label="Model No"
                        error={Boolean(
                            touched.modelno && errors.modelno
                        )}
                        helperText={touched.modelno && errors.modelno}
                    />
                    </Grid>
                    
                    <Grid item sm={12} xs={12}> <Divider className="mb-6" /><h4>Product Specifications</h4></Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField
                            className="min-w-188"
                            label="Select Variable"
                            name="variable"
                            size="small"
                            variant="outlined"
                            select
                            value={values.variable || ''}
                            onChange={handleChange}
                            fullWidth
                            error={Boolean(
                                touched.variable && errors.variable
                            )}
                            helperText={touched.variable && errors.variable}
                        >
                          {variablelist.map((item, ind) => (
                                    <MenuItem value={item.id} key={item.id}>
                                        {item.variable_name}
                                    </MenuItem>
                                ))}
                          
                        </TextField>
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <span>Input Type</span>
                      <RadioGroup
                        row
                        name="inputtype"
                        sx={{ mb: 2 }}
                        value={values.inputtype || 0}
                        onChange={handleChange}
                      >
                        <FormControlLabel
                          value="1"
                          label="Single Value"
                          labelPlacement="end"
                          control={<Radio color="secondary" 
                          />}
                        />
          
                        <FormControlLabel
                          value="2"
                          label="Range Values"
                          labelPlacement="end"
                          control={<Radio color="secondary" 
                          />}
                        />
                         <FormControlLabel
                          value="3"
                          label="Multiple Lines Value"
                          labelPlacement="end"
                          control={<Radio color="secondary" 
                          />}
                        />
                        
                      </RadioGroup>
                      
                    </Grid>
                    <Grid item sm={12} xs={12}> <Divider className="mb-6" /></Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                          type="text"
                          name="metatitle"
                          value={values.metatitle || ''}
                          fullWidth
                          onChange={handleChange}
                          label="Meta Title"
                          error={Boolean(
                              touched.metatitle && errors.metatitle
                          )}
                          helperText={touched.metatitle && errors.metatitle}
                      />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                          type="text"
                          name="metakeyword"
                          value={values.metakeyword || ''}
                          fullWidth
                          onChange={handleChange}
                          label="Meta Keyword"
                          error={Boolean(
                              touched.metakeyword && errors.metakeyword
                          )}
                          helperText={touched.metakeyword && errors.metakeyword}
                      />
                    </Grid>

                    <Grid item sm={12} xs={12}>
                   
                      <TextField
                          type="text"
                          name="metakdesc"
                          value={values.metakdesc || ''}
                          fullWidth
                          multiline
                          rows={4}
                          onChange={handleChange}
                          label="Meta Description"
                         
                      />
                    </Grid>


                    <Grid item sm={12} xs={12}>
                        <Button color="primary" variant="contained" type="submit" >
                            <Icon>send</Icon>
                            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span> 
                        </Button>
                        <Link to={'/subcategory/list'}>
                       
                        </Link>
                    </Grid>
                   
                    </Grid>
                    
                    </form>
                    )}
                </Formik>
          
        </div>
    )
}

const subCategorySchema = yup.object().shape({
//    categoryid: yup.number().required('Category is required'),
   //subcat: yup.number().required('Select Subcategory is required'),
    //status: yup.number().required('Status is required'),
    
})


export default AddModelForm
