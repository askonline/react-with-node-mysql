
import {
    Button,
    FormControlLabel,
    Grid,
    Icon,
    Radio,
    RadioGroup,
    styled,
  } from "@mui/material";
  import { Span } from "app/components/Typography";
  import { useEffect, useState } from "react";
  import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
  import { Link } from "react-router-dom";
  import { SimpleCard } from 'app/components'
  import { makeStyles } from '@material-ui/core/styles'
  import { getAllCategory,deleteCategory} from './TableService'
  import MUIDataTable from 'mui-datatables'
  import { useNavigate } from "react-router-dom";

  const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));
  
  const EditForm = () => {
    const [categoryList, setCategoryList] = useState([])
    const navigate = useNavigate();
    const columns = [
        {
            name: 'name', // field name in the row object
            label: 'Category', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'status',
            label: 'Status',
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let getStatus = categoryList[dataIndex].status
                    if (getStatus == '1')
                        return (
                            <small className="text-white bg-error border-radius-4 px-2 py-2px">
                                Active
                            </small>
                        )
                    else 
                        return (
                            <small className="bg-secondary border-radius-4 px-2 py-2px">
                                  Deactive
                            </small>
                        )
                    
                },
            },
        },
        {
            name: 'action',
            label: 'Action',
            options: {
                filter: false,
                customBodyRenderLite: (dataIndex) => (
                    <div className="flex items-center">
                      <div className="flex-grow"></div>
                    <Link to={`/category/edit/${categoryList[dataIndex].id}`}> <Icon fontSize="" color="primary" title="Edit">edit</Icon></Link>
                    
                   
                    <Button  type="submit" 
                    onClick={() => handleDelete(categoryList[dataIndex].id)} >
                         <Icon fontSize="" color="error" title="Delete">delete</Icon>
                    </Button>

                    <Link to={`/subcategory/add/${categoryList[dataIndex].id}`} > <Icon fontSize=""  title="Add Subcategory">add</Icon></Link>
                    
                    </div>
                    
                    
                ),
            },
        },
    ]
    const handleDelete = (id) => {
        //console.log('delete',id)
        deleteCategory(id)
        navigate('/category/list');
       };

    /* ----------------- Get Category Id */
    const getCategoryData = () => {
        getAllCategory().then(({ data }) => {
            setCategoryList(data)
        })
        }
    
        useEffect(() => {
            getCategoryData()
        }, [])
    
  
  
    const useStyles = makeStyles((theme) => ({
      button: {
          margin: theme.spacing(1),
      },
      input: {
          display: 'none',
      },
  }))
    const classes = useStyles()
  
  
    return (
      <div>
        <MUIDataTable
                title={ <h3> <Link to="/category/add" > <Icon fontSize="large" title="Add New">add</Icon></Link></h3> }
                data={categoryList}
                columns={columns}
                options={{
                    filterType: 'textField',
                    responsive: 'standard',
                    selectableRows: 'none', // set checkbox for each row
                    // search: false, // set search option
                    // filter: false, // set data filter option
                    // download: false, // set download option
                    // print: false, // set print option
                    // pagination: true, //set pagination option
                    // viewColumns: false, // set column option
                    elevation: 0,
                    rowsPerPageOptions: [10, 20, 40, 80, 100],
                    
                }}
            />
      </div>
    );
  };
  export default EditForm;
  