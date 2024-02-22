
import {
  Button,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  styled,
  Divider
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Link } from "react-router-dom";
import { SimpleCard } from 'app/components'
import { makeStyles } from '@material-ui/core/styles'
import { findOneVariable,addVariable,updateVariable } from './TableService'
import { useParams,useNavigate } from "react-router-dom";


const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
  }));

  const AddForm = () => {
  const [findOne, setfindOne] = useState([])
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
      variable_name: '',
        status:'1',
        
    })
  const {
      variable_name,
        status,
      } = state;

  /* ----------------- Get Category Id */
  const findOneVariableData = () => {
    findOneVariable(id).then(({ data }) => {
      setfindOne(data)
    })
    }

    useEffect(() => {
      findOneVariableData()
    }, [])
    
   
    //console.log(findOne[0])

  const handleSubmit = (event) => {
    event.preventDefault();
    //console.log("submitted",event);
    if (id) {
      updateVariable({id,
            ...state,
        })
    } else {
      addVariable({
            ...state,
        })
    }
    setState({ variable_name: '', status: '' });
    navigate('/variable/list');
    
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    input: {
        display: 'none',
    },
}))
  const classes = useStyles()

  let variableName="";
  if(findOne.variable_name)
  {
    variableName = findOne.variable_name;
  }

  return (
    <div>
     
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="variable_name"
              id="standard-basic"
              value={variable_name || variableName}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="Variable (Min length 3)"
              validators={["required", "minStringLength: 3", "maxStringLength: 500"]}
            />
            </Grid>
            
           {/*
            <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
             
            {findOne.status && (
            <RadioGroup
              row
              name="status"
              sx={{ mb: 2 }}
              value={status || Number(findOne.status)}
              onChange={handleChange}
            >
              
              <FormControlLabel
                value="1"
                label="Active"
                labelPlacement="end"
                
                control={<Radio color="secondary" 
                
                />}
              />

              <FormControlLabel
                value="0"
                label="Deactive"
                labelPlacement="end"
                control={<Radio color="secondary" 
                
                />}
              />
            </RadioGroup>
            )}
          </Grid> */}
        </Grid>
        <SimpleCard>
        <Button color="primary" variant="contained" type="submit" className={classes.button}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>

        <Link to={'/variable/list'}>
        <Button color="primary" variant="contained" type="submit" className={classes.button}>
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Back</Span>
        </Button>
        </Link>
        </SimpleCard>

      </ValidatorForm>
    </div>
  );
};
export default AddForm;
