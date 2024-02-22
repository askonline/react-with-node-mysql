import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import CategoryTable from "./template/Table";

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
        <Breadcrumb routeSegments={[ { name: 'Category', path: '/category/list' },{ name: 'Category List' },]} />
      </Box>

      <SimpleCard>
        <CategoryTable />
      </SimpleCard>
    </Container>
  );
};

export default AppTable;
