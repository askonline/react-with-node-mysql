import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import VariableTable from "./template/VariableList";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppTable = () => {
  return (
    <Container>
    
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[ { name: 'Variable', path: '/variable/list' },{ name: 'Variable List' },]} />
      </Box>

      <SimpleCard>
        <VariableTable />
      </SimpleCard>
    </Container>
  );
};

export default AppTable;
