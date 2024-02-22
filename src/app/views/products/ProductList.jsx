import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import PaginationTable from "./template/Table";

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
        <Breadcrumb routeSegments={[ { name: 'Product', path: '/product/list' },{ name: 'Product List' },]} />
      </Box>

      <SimpleCard>
        <PaginationTable />
      </SimpleCard>
    </Container>
  );
};

export default AppTable;
