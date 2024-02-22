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
    Divider
    
  } from "@mui/material";
  import { Span } from "app/components/Typography";

  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  
  import { getAllSubCategory,getAllCategory,findOneCategory,addCategory,updateCategory} from './TableService'
  import * as yup from 'yup'
  import { useParams,useNavigate } from "react-router-dom";

const EditForm = () => {
  const [state, setState] = useState({ date: new Date() });
    const [subcategoryList, setSubCategoryList] = useState([])
    const [categoryList, setCategoryList] = useState([])
   const navigate = useNavigate();
   const { id } = useParams();
   const [findOne, setfindOne] = useState([])
 
  const getCategoryData = () => {
    getAllCategory().then(({ data }) => {
        setCategoryList(data)
    })
    }

    useEffect(() => {
        getCategoryData()
    }, [])

    const getSubCategoryData = () => {
      getAllSubCategory().then(({ data }) => {
        setSubCategoryList(data)
      })
      }

    useEffect(() => {
      getSubCategoryData()
  }, [])
    
  
    const handleSubmit = async (values, { isSubmitting }) => {
        console.log("==",values)
             if (id) {
                updateCategory({id,
                    ...values,
                })
            } else {
                addCategory({
                    ...values,
                })
            }
        
            setState({ parent_id:'',name: '', status: '' });
            navigate('/subcategory/list');
    }

    /* ----------------- Get Category Id */
  const findOneCategoryData = () => {
    findOneCategory(id).then(({ data }) => {
      setfindOne(data)
    })
    }

    useEffect(() => {
      findOneCategoryData()
    }, [])

 
    const initialValues = {
        parent_id: Number(findOne.parent_id),
        name: findOne.name,
        status:findOne.status
    }
    
    //console.log("===",findOne)

    return (
        <div className="m-sm-30">
                 <div className="flex p-4">
                    <h4 className="m-0">Add New Sub Category</h4>
                </div>
                <Divider className="mb-6" />
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
                    }) => (
                    <form className="p-4" onSubmit={handleSubmit}>
                           <Grid container spacing={6}>
                           <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 2 }}>
                            <TextField
                                className="min-w-188"
                                label="Select Category"
                                name="parent_id"
                                size="small"
                                variant="outlined"
                                select
                                value={values.parent_id || Number(findOne.parent_id)}
                                onChange={handleChange}
                                fullWidth
                                error={Boolean(
                                    touched.parent_id && errors.parent_id
                                )}
                                helperText={touched.parent_id && errors.parent_id}
                            >
                                {categoryList.map((item, ind) => (
                                    <MenuItem value={item.id} key={item.id}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 2 }}>
                    <TextField
                        type="text"
                        name="name"
                        id="standard-basic"
                        value={values.name || findOne.name}
                        fullWidth
                        onChange={handleChange}
                        label="Sub Category"
                        error={Boolean(
                            touched.name && errors.name
                        )}
                        helperText={touched.name && errors.name}
                    />
                    </Grid>
                    
                    <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 2 }}>
                    <RadioGroup
                        row
                        name="status"
                        sx={{ mb: 2 }}
                        value={values.status || Number(findOne.status)}
                        onChange={handleChange}
                        
                    >
                        <FormControlLabel
                        value="1"
                        label="Active"
                        labelPlacement="end"
                        control={<Radio color="secondary" />}
                        
                        />
        
                        <FormControlLabel
                        value="0"
                        label="Deactive"
                        labelPlacement="end"
                        control={<Radio color="secondary" />}
                        />
                    </RadioGroup>
                    
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <Button color="primary" variant="contained" type="submit" >
                            <Icon>send</Icon>
                            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span> 
                        </Button>
                        <Link to={'/subcategory/list'}>
                        <Button color="primary" variant="contained" type="submit">
                            <Icon>send</Icon>
                            <Span sx={{ pl: 1, textTransform: "capitalize" }}>Back</Span>
                        </Button>
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
    parent_id: yup.number().required('Category is required'),
    name: yup.string().required('Sub Category is required'),
    //status: yup.number().required('Status is required'),
    
})


export default EditForm
