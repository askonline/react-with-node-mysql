import React from 'react'
  import { useEffect, useState } from "react";
  import { Link } from "react-router-dom";
  
  import { getAllSubCategory,findOneCategory} from './TableService'
  import MUIDataTable from 'mui-datatables'
  import {
    Icon,
  } from "@mui/material";

const SubCategoryList = () => {
  const [state, setState] = useState({ date: new Date() });
    const [subcategoryList, setSubCategoryList] = useState([])
    

    const columns = [
    {
        name: 'parent_id', // field name in the row object
        label: 'Category', // column title that will be shown in table
        options: {
            filter: true,
            customBodyRenderLite: (dataIndex) => {
                let getPid = subcategoryList[dataIndex].parent_id
                //console.log("===",getPid)
                    return (
                        <small className="text-white bg-error border-radius-4 px-2 py-2px">
                             Integrated Microwave Subsystems 
                        </small>
                    )
               
                
            },
        },
    },

      {
          name: 'name', // field name in the row object
          label: 'Sub Category', // column title that will be shown in table
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
                  let getStatus = subcategoryList[dataIndex].status
                  
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
                  <Link to={`/subcategory/edit/${subcategoryList[dataIndex].id}`}> <Icon fontSize="" color="primary" title="Edit">edit</Icon></Link>
                  
                  <Link to={`/subcategory/delete/${subcategoryList[dataIndex].id}`}> <Icon fontSize="" color="error" title="Delete">delete</Icon></Link>
                  
                  </div>
                  
                  
              ),
          },
      },
  ]

     const getSubCategoryData = () => {
      getAllSubCategory().then(({ data }) => {
        setSubCategoryList(data)
      })
      }

    useEffect(() => {
      getSubCategoryData()
  }, [])
   
  
    return (
        <div className="m-sm-30">
                
           <MUIDataTable
                title={<h3> <Link to="/subcategory/add" > <Icon fontSize="large" title="Add New">add</Icon></Link></h3> }
                data={subcategoryList}
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
    )
}




export default SubCategoryList
