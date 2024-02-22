import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationTable from "./template/List";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const ModelList = () => {
  return (
    <Container>
     
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[ { name: 'Model', path: '/model/list' },{ name: 'Model List' },]} />
      </Box>

      <SimpleCard>
        <PaginationTable />
      </SimpleCard>
    </Container>
  );
};

export default ModelList;
