
import {
    Button,
    Icon,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  import { getAllVariable,deleteVariable} from './TableService'
  import MUIDataTable from 'mui-datatables'
  
  import {  ConfirmationDialog } from 'app/components'
  
    const EditForm = () => {
    const [variableList, setVariableList] = useState([])
    const [variable, setVariable] = useState(null)
  
    const [
        shouldOpenConfirmationDialog,
        setShouldOpenConfirmationDialog,
    ] = useState(false)
    
    const columns = [
        {
            name: 'variable_name', // field name in the row object
            label: 'Variable', // column title that will be shown in table
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
                    let getStatus = variableList[dataIndex].status
                    if (getStatus === '1')
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
                    <Link to={`/variable/edit/${variableList[dataIndex].id}`}> <Icon fontSize="" color="primary" title="Edit">edit</Icon></Link>
                    
                   
                    <Button  type="submit" 
                    onClick={() => handleDelete(variableList[dataIndex].id)} >
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

    const handleDelete = (variable) => {
        //console.log('delete',id)
        setVariable(variable)
        setShouldOpenConfirmationDialog(true)
        //navigate('/product/list');
       };
       const handleConfirmationResponse = () => {
        deleteVariable(variable).then(() => {
            handleDialogClose()
            
        })
    }
   
    /* const handleDelete = (id) => {
        //console.log('delete',id)
        deleteVariable(id)
        navigate('/variable/list');
       };*/

    /* ----------------- Get Variable Id */
    const getVariableData = () => {
        getAllVariable().then(({ data }) => {
            setVariableList(data)
        })
        }
    
        useEffect(() => {
            getVariableData()
        }, [])
    
  
  

  
  
    return (
      <div>
        <MUIDataTable
                title={ <h3> <Link to="/variable/add" > <Icon fontSize="large" title="Add New">add</Icon></Link></h3> }
                data={variableList}
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
  export default EditForm;
  