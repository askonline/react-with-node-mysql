
import {
    Button,
   
    Icon,
   
    styled,
    Avatar,
    Box,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
  import { Link,useNavigate } from "react-router-dom";
  import { makeStyles } from '@material-ui/core/styles'
  import { getAllProducts,deleteProduct} from './TableService'
  import MUIDataTable from 'mui-datatables'
  import { Paragraph } from 'app/components/Typography';
  import {  ConfirmationDialog } from 'app/components'




  const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));
  
  const ProductList = () => {
    const [productsList, setProductList] = useState([])
    const [products, setProduct] = useState(null)

    const navigate = useNavigate();
    const [
        shouldOpenConfirmationDialog,
        setShouldOpenConfirmationDialog,
    ] = useState(false)
   
    const columns = [
        {
            name: 'parent_cat_id', // field name in the row object
            label: 'Category', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'parent_id', // field name in the row object
            label: 'Sub Category', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'name', // field name in the row object
            label: 'Product', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'imaged', // field name in the row object
            label: 'Image', // column title that will be shown in table
            options: {
                filter: true,
                customBodyRenderLite: (dataIndex) => {
                    let getfeature_image = productsList[dataIndex].feature_image
                    if (getfeature_image)
                        return (
                    <Box display="flex" alignItems="center">
                    <Avatar src={`https://akoninc.com/demo/assets/uploads/thumbs/category/${productsList[dataIndex].feature_image}`} />
                    </Box>
                        )
                    
                },
            },
        },
        {
            name: 'created_date', // field name in the row object
            label: 'Created', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'Modified_date', // field name in the row object
            label: 'Modified', // column title that will be shown in table
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
                    let getStatus = productsList[dataIndex].status
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
                    <Link to={`/product/edit/${productsList[dataIndex].id}`}> <Icon fontSize="" color="primary" title="Edit">edit</Icon></Link>
                    
                   
                    <Button  type="submit" 
                    onClick={() => handleDelete(productsList[dataIndex].id)} >
                         <Icon fontSize="" color="error" title="Delete">delete</Icon>
                    </Button>
                  

                    
                    </div>
                    
                    
                ),
            },
        },
    ]
    
    const handleDialogClose = () => {
        setShouldOpenConfirmationDialog(false)
       
    }

    const handleDelete = (products) => {
        //console.log('delete',id)
        setProduct(products)
        setShouldOpenConfirmationDialog(true)
        //navigate('/product/list');
       };
       const handleConfirmationResponse = () => {
        deleteProduct(products).then(() => {
            handleDialogClose()
            
        })
    }
    /* ----------------- Get Category Id */
    const getProductsData = () => {
        getAllProducts().then(({ data }) => {
            setProductList(data)
        })
        }
    
        useEffect(() => {
            getProductsData()
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
                title={ <h3> <Link to="/product/add" > <Icon fontSize="large" title="Add New">add</Icon></Link></h3> }
                data={productsList}
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
            {shouldOpenConfirmationDialog && (
                    <ConfirmationDialog
                        open={shouldOpenConfirmationDialog}
                        onConfirmDialogClose={handleDialogClose}
                        onYesClick={handleConfirmationResponse}
                        text="Are you sure to delete?"
                    />
                )}
      </div>
    );
  };
  export default ProductList;
  