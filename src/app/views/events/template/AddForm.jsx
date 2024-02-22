import React from 'react'
import { Formik } from 'formik'

import {
    TextField,
    Button,
    Grid,
    Icon,
    Avatar
    
  } from "@mui/material";
  import DatePicker from "react-datepicker";

  import "react-datepicker/dist/react-datepicker.css";

  import { Span } from "app/components/Typography";

  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  
  import { findOneEvents,addEvents,updateEvents } from './TableService'
  import * as yup from 'yup'
  import { useParams,useNavigate } from "react-router-dom";
  import 'react-responsive-select/dist/react-responsive-select.css';
  import axios from 'axios'
  const apiUrl = process.env.REACT_APP_API_URL;

const AddProductForm = () => {
  const [findOne, setfindOne] = useState([])
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const { id } = useParams();
  const navigate = useNavigate();

    const initialValues = {
      name: '',
      description:'',
      from_date:'',
      to_date:'',
      status:'1',
    }
    const findOneEventsData = () => {
      findOneEvents(id).then(({ data }) => {
        setfindOne(data)
      })
      }
  
      useEffect(() => {
        findOneEventsData()
      }, [])

      const [imageFile, setImageFile] = useState(null)
    
      const fileHandler = (e) => {
        setImageFile(e.target.files[0])
        
      }
      const startDateFinal=(findOne.from_date)?findOne.from_date:startDate;
      const endDateFinal =(findOne.to_date)?findOne.to_date:endDate;
      //const enventImage = (findOne.image)?findOne.image:imageFile.name;


    const handleSubmit = async (values, { isSubmitting }) => {
        var data = new FormData();
        data.append('name', values.name);
        data.append('description', values.description);
        data.append('from_date', startDateFinal);
        data.append('to_date', endDateFinal);
        data.append('status', values.status);
        data.append('image', imageFile.name);
        data.append('eventimage', imageFile);
        
        if (id) {
        axios.post(`${apiUrl}/events/update/${id}`, data)
        .then((res) => {
          this.setState({ events: [res.data] });
        });
        
        } else {

          axios.post(`${apiUrl}/events/add`, data)
          .then((res) => {
            this.setState({ events: [res.data] });
          });
          
        }
        navigate('/events/list');
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
                    <TextField
                        type="text"
                        name="name"
                        id="standard-basic"
                        value={values.name || findOne.name}
                        fullWidth
                        onChange={handleChange}
                        label="Event Title"
                        error={Boolean(
                            touched.name && errors.name
                        )}
                        helperText={touched.name && errors.name}
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
                              error={Boolean(
                                touched.description && errors.description
                            )}
                            helperText={touched.description && errors.description}
                          />
                      </Grid>
                      <Grid item sm={3} xs={12}>
                           <h3>From Date</h3>     
                          <DatePicker
                          showIcon
                          selected={startDateFinal}
                          onChange={(date) => setStartDate(date)}
                          name="from_data"
                          value={values.from_data || startDateFinal}
                          dateFormat="yyyy/MM/dd"
                          
                        />        
                        
                      </Grid>
                      <Grid item sm={3} xs={12}>
                        <h3>To Date</h3>     
                            <DatePicker
                            showIcon
                            selected={endDateFinal}
                            onChange={(date) => setEndDate(date)}
                            name="to_date"
                            value={values.to_date || endDateFinal}
                            dateFormat="yyyy/MM/dd"
                          />        
                      </Grid>
                      <Grid item sm={6} xs={12}>
                        <h4>Image</h4>
                        <input type="file" onChange={fileHandler} />
                        {findOne.image && (
                          <img src={`https://akoninc.com/demo/assets/uploads/thumbs/event/${findOne.image}`} />
                        )}
                        
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
   name: yup.string().required('Event title is required'),
   description: yup.string().required('Description field is required'),
  
    
})


export default AddProductForm
