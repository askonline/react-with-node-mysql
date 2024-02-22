
import {
    Button,
    Icon,
    styled,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
  import { Link } from "react-router-dom";
  import { makeStyles } from '@material-ui/core/styles'
  import { getAllEvents,deleteEvents} from './TableService'
  import MUIDataTable from 'mui-datatables'
  import { useNavigate } from "react-router-dom";
  import {  ConfirmationDialog } from 'app/components'
  
  const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
  }));

  const EditForm = () => {
    const [EventsList, setEventsList] = useState([])
    const [Events, setEvents] = useState(null)
    const navigate = useNavigate();
    const [
        shouldOpenConfirmationDialog,
        setShouldOpenConfirmationDialog,
    ] = useState(false)
    
    const columns = [
        {
            name: 'name', // field name in the row object
            label: 'Event', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'from_date', // field name in the row object
            label: 'From Date', // column title that will be shown in table
            options: {
                filter: true,
            },
        },
        {
            name: 'to_date', // field name in the row object
            label: 'To Date', // column title that will be shown in table
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
                    let getStatus = EventsList[dataIndex].status
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
                    <Link to={`/events/edit/${EventsList[dataIndex].id}`}> <Icon fontSize="" color="primary" title="Edit">edit</Icon></Link>
                    
                   
                    <Button  type="submit" 
                    onClick={() => handleDelete(EventsList[dataIndex].id)} >
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

    const handleDelete = (Events) => {
        //console.log('delete',id)
        setEvents(Events)
        setShouldOpenConfirmationDialog(true)
        //navigate('/product/list');
       };
       const handleConfirmationResponse = () => {
        deleteEvents(Events).then(() => {
            handleDialogClose()
            
        })
    }
   
    /* const handleDelete = (id) => {
        //console.log('delete',id)
        deleteEvents(id)
        navigate('/Events/list');
       };*/

    /* ----------------- Get Events Id */
    const getEventsData = () => {
        getAllEvents().then(({ data }) => {
            setEventsList(data)
        })
        }
    
        useEffect(() => {
            getEventsData()
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
                title={ <h3> <Link to="/events/add" > <Icon fontSize="large" title="Add New">add</Icon></Link></h3> }
                data={EventsList}
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
  