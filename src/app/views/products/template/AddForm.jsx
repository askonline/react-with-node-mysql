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
    Divider,
    Checkbox
    
  } from "@mui/material";
  import { Span } from "app/components/Typography";

  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  
  import { findOneProduct,addCategory,updateCategory} from './TableService'
  import * as yup from 'yup'
  import { useParams,useNavigate } from "react-router-dom";
  import 'react-responsive-select/dist/react-responsive-select.css';
  import CategoryDropdown from './CategoryDropdown';
  import SubcategoryDropdown from './SubcategoryDropdown';

const AddProductForm = (props) => {
  const [state, setState] = useState({ date: new Date() });
  
  const navigate = useNavigate();
  const { id } = useParams();
  const [findOne, setfindOne] = useState([])
  
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  }; 

  const handleSubcategoryChange = (subcategory) => {
    
  };
 
console.log("===",props)
   const findOneData = () => {
    findOneProduct(id).then(({ data }) => {
      setfindOne(data)
    })
    }
    useEffect(() => {
      findOneData()
    }, [])
    const initialValues = {
      categoryid:'',
      subcat: '',
      projectname:'',
      url:'',
      feature_highlight:'',
      datasheetno:'',
      datasheetrevno:''
    }
  

    const handleSubmit = async (values, { isSubmitting }) => {
        const data = new FormData();
        console.log("===",values)
        data.append('parent_id',values.projectname)
        data.append('parent_cat_id',values.featureImage)
        data.append('url',values.url)
        data.append('feature_description',values.feature_description)
        data.append('new_product',values.new_product)
        data.append('menu_type',values.menu_type)
        data.append('feature_product',values.feature_product)
        data.append('feature_image',values.feature_image)
        data.append('description',values.description)
        data.append('pdf',values.pdf)
        data.append('meta_title',values.meta_title)
        data.append('meta_keyword',values.meta_keyword)
        data.append('meta_description',values.meta_description)
        data.append('datasheet_no',values.datasheet_no)
        data.append('feature_image_name',values.feature_image_name)
        data.append('outline_image',values.outline_image)
        data.append('outline_image_name',values.outline_image_name)
        data.append('outline_image1_name',values.outline_image1_name)
        data.append('outline_image2',values.outline_image2)
        data.append('outline_image2_name',values.outline_image2_name)
        data.append('block_img',values.block_img)
        data.append('block_img_name',values.block_img_name)
        data.append('block_img1',values.block_img1)
        data.append('block_img1_name',values.block_img1_name)
        data.append('block_img2',values.v)
        data.append('block_img2_name',values.block_img2_name)
        data.append('tree_level',values.tree_level)
        data.append('created_date',values.created_date)
        
            /* if (id) {
                updateCategory({id,
                    ...values,
                })
            } else {
                addCategory({
                    ...values,
                })
            }
        
            setState({ parent_id:'',name: '', status: '' });
            navigate('/subcategory/list');*/
    }
    
    //console.log("===",findOne)
   
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
                          

                           
                    </Grid>
                    <Grid item sm={6} xs={12}>
                    <TextField
                        type="text"
                        name="projectname"
                        id="standard-basic"
                        value={values.projectname || findOne.name}
                        fullWidth
                        onChange={handleChange}
                        label="Product Name"
                        error={Boolean(
                            touched.projectname && errors.projectname
                        )}
                        helperText={touched.projectname && errors.projectname}
                    />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                    <TextField
                        type="text"
                        name="url"
                        id="standard-basic"
                        value={values.url || findOne.url}
                        fullWidth
                        onChange={handleChange}
                        label="URL"
                        error={Boolean(
                            touched.url && errors.url
                        )}
                        helperText={touched.url && errors.url}
                    />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                          <TextField
                              label="Feature Highlight"
                              name="feature_highlight"
                              size="small"
                              variant="outlined"
                              multiline
                              rows={4}
                              fullWidth
                              value={values.feature_highlight || findOne.feature_description}
                              onChange={handleChange}
                              error={Boolean(
                                touched.feature_highlight && errors.feature_highlight
                            )}
                            helperText={touched.feature_highlight && errors.feature_highlight}
                          />
                      </Grid>
                     <Grid item sm={6} xs={12}>
                        <h5>Product Type</h5>
                        <FormControlLabel
                            control={
                              <Checkbox checked={state.new} 
                                onChange={handleChange('new')} 
                                name='productnew'
                                value={values.producttype || findOne.new_product} 
                                color="primary"/>
                            }
                            label="New"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={state.featured}
                                onChange={handleChange('featured')}
                                name='productfeature'
                                value={values.productfeature || findOne.new_product} 
                                color="primary"
                              />
                            }
                            label="Featured"
                          />
                      </Grid> 
                      
                     <Grid item sm={6} xs={12}>
                        <h5>Specification Table Heading</h5>
                      <RadioGroup
                          row
                          name="specification_table"
                          sx={{ mb: 2 }}
                          value={values.specification_table || Number(findOne.menu_type)}
                          onChange={handleChange}
                        >
                          <FormControlLabel
                            value="1"
                            label="Vertical Menu"
                            labelPlacement="end"
                            control={<Radio color="secondary" />}
                          />

                          <FormControlLabel
                            value="0"
                            label="Horizontal Menu"
                            labelPlacement="end"
                            control={<Radio color="secondary" />}
                          />

                         
                        </RadioGroup>
                  </Grid>
                 <Grid item sm={6} xs={12}>
                    <h4>Feature Image</h4>
                      <input type="file" 
                        onChange={(e) =>
                                setFieldValue(
                                    'featureImage',
                                    e.target.files
                                )
                            }
                       />   
                         
                    </Grid>
                   <Grid item sm={6} xs={12}>
                      <h4>Feature Image Title</h4>
                      <TextField
                          type="text"
                          name="fititle"
                          id="standard-fititle"
                          value={values.fititle || ''}
                          fullWidth
                          onChange={handleChange}
                          label=""
                          error={Boolean(
                              touched.fititle && errors.fititle
                          )}
                          helperText={touched.fititle && errors.fititle}
                      />
                    </Grid>
                   <Grid item sm={6} xs={12}>
                      <h4>Datasheet No</h4>
                      <TextField
                          type="text"
                          name="datasheetno"
                          id="standard-datasheet"
                          value={values.datasheetno || findOne.datasheet_no}
                          fullWidth
                          onChange={handleChange}
                          label=""
                          error={Boolean(
                              touched.datasheetno && errors.datasheetno
                          )}
                          helperText={touched.datasheetno && errors.datasheetno}
                      />
                    </Grid>
                   <Grid item sm={6} xs={12}>
                      <h4>Datasheet Revision No</h4>
                      <TextField
                          type="text"
                          name="datasheetrevno"
                          id="standard-datasheetrevno"
                          value={values.datasheetrevno || findOne.ds_rev_no}
                          fullWidth
                          onChange={handleChange}
                          label=""
                          error={Boolean(
                              touched.datasheetrevno && errors.datasheetrevno
                          )}
                          helperText={touched.datasheetrevno && errors.datasheetrevno}
                      />
                    </Grid>
                    <Grid item sm={12} xs={12}>
                      <TextField
                          label="Description"
                          name="description"
                          size="small"
                          variant="outlined"
                          multiline
                          rows={4}
                          fullWidth
                          value={values.description || findOne.description}
                          onChange={handleChange}
                      />
                  </Grid>         
                  <Grid item sm={12} xs={12}> <Divider className="mb-6" /></Grid>
                 <Grid item sm={6} xs={12}>
                    <h4>Website Outline Drawing Image</h4>
                    <input type="file" 
                        onChange={(e) =>
                                setFieldValue(
                                    'wodimage',
                                    e.target.files
                                )
                            }
                       />  
                         
                    </Grid>
                   <Grid item sm={6} xs={12}>
                      <h4>Website Outline Drawing Title</h4>
                      <TextField
                          type="text"
                          name="wodtitle"
                          id="standard-basic"
                          value={values.wodtitle || ''}
                          fullWidth
                          onChange={handleChange}
                          label=""
                          error={Boolean(
                              touched.wodtitle && errors.wodtitle
                          )}
                          helperText={touched.wodtitle && errors.wodtitle}
                      />
                    </Grid>

                 <Grid item sm={6} xs={12}>
                    <h4>Datasheet PDF Outline Drawing Image</h4>
                    <input type="file" 
                        onChange={(e) =>
                                setFieldValue(
                                    'dpdfodimage',
                                    e.target.files
                                )
                            }
                       /> 
                         
                    </Grid>
                   <Grid item sm={6} xs={12}>
                      <h4>Datasheet PDF Outline Drawing Title</h4>
                      <TextField
                          type="text"
                          name="dpodtitle"
                          id="standard-dpodtitle"
                          value={values.dpodtitle || ''}
                          fullWidth
                          onChange={handleChange}
                          label=""
                          error={Boolean(
                              touched.dpodtitle && errors.dpodtitle
                          )}
                          helperText={touched.dpodtitle && errors.dpodtitle}
                      />
                    </Grid>
                   <Grid item sm={6} xs={12}>
                    <h4>Website Block Diagram Image</h4>
                    <input type="file" 
                        onChange={(e) =>
                                setFieldValue(
                                    'wbdimage',
                                    e.target.files
                                )
                            }
                       />  
                         
                    </Grid>
                   <Grid item sm={6} xs={12}>
                      <h4>Website Block Diagram Title</h4>
                      <TextField
                          type="text"
                          name="wbdtitle"
                          id="standard-wbdtitle"
                          value={values.wbdtitle || ''}
                          fullWidth
                          onChange={handleChange}
                          label=""
                          error={Boolean(
                              touched.wbdtitle && errors.wbdtitle
                          )}
                          helperText={touched.wbdtitle && errors.wbdtitle}
                      />
                    </Grid>
                   <Grid item sm={6} xs={12}>
                    <h4>Datasheet PDF Block Diagram Image</h4>
                    <input type="file" 
                        onChange={(e) =>
                                setFieldValue(
                                    'spdfbdimage',
                                    e.target.files
                                )
                            }
                       />   
                         
                    </Grid>
                   <Grid item sm={6} xs={12}>
                      <h4>Datasheet PDF Block Diagram Title</h4>
                      <TextField
                          type="text"
                          name="dpbdtitle"
                          id="standard-dpbdtitle"
                          value={values.dpbdtitle || ''}
                          fullWidth
                          onChange={handleChange}
                          label=""
                          error={Boolean(
                              touched.dpbdtitle && errors.dpbdtitle
                          )}
                          helperText={touched.dpbdtitle && errors.dpbdtitle}
                      />
                    </Grid>
                    <Grid item sm={12} xs={12}> <Divider className="mb-6" /><h5>Others Add Extra Details</h5></Grid>
                    
                    <Grid item sm={6} xs={12}>
                      <h4>Other Title</h4>
                      <TextField
                          type="text"
                          name="othertitle"
                          id="standard-othertitle"
                          value={values.othertitle || ''}
                          fullWidth
                          onChange={handleChange}
                          label=""
                          error={Boolean(
                              touched.othertitle && errors.othertitle
                          )}
                          helperText={touched.othertitle && errors.othertitle}
                      />
                    </Grid>
                    
                    <Grid item sm={6} xs={12}>
                    <h4>Image</h4>
                    <input type="file" 
                        onChange={(e) =>
                                setFieldValue(
                                    'otherimage',
                                    e.target.files
                                )
                            }
                       /> 
                         
                    </Grid>
                    <Grid item sm={12} xs={12}>
                    <TextField
                          label="Other Description"
                          name="otherdescription"
                          size="small"
                          variant="outlined"
                          multiline
                          rows={4}
                          fullWidth
                          value={values.otherdescription}
                          onChange={handleChange}
                      />
                      
                    </Grid>
                    
                    <Grid item sm={12} xs={12}> <Divider className="mb-6" /></Grid>
                    <Grid item sm={12} xs={12}>
                    <h4>Upload Datasheet PDF</h4>
                    <input type="file" 
                        onChange={(e) =>
                                setFieldValue(
                                    'datasheetpdf',
                                    e.target.files
                                )
                            }
                       /> 
                         
                    </Grid>
                    <Grid item sm={12} xs={12}> <Divider className="mb-6" /></Grid>
                    <Grid item sm={6} xs={12}>
                      <TextField
                          type="text"
                          name="metatitle"
                          id="standard-othertitle"
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
                          id="standard-metakeyword"
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
                          id="standard-metakdesc"
                          value={values.metakeyword || ''}
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
   /*subcat: yup.number().required('Select Subcategory is required'),
    projectname: yup.string().required('Prodect name is required'),
    url: yup.string().required('URL is required'),
    feature_highlight: yup.string().required('Feature highlight is required'),
    datasheetno: yup.string().required('Data sheet no is required'),
    datasheetrevno: yup.string().required('Data sheet revison no is required'),
    */
    //status: yup.number().required('Status is required'),
    
})


export default AddProductForm
