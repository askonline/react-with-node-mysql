import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import SubCategoryTable from "./template/SubCategoryList";

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
        <Breadcrumb routeSegments={[ { name: 'Sub Category', path: '/subcategory/list' },{ name: 'Sub Category List' },]} />
      </Box>

      <SimpleCard>
        <SubCategoryTable />
      </SimpleCard>
    </Container>
  );
};

export default AppTable;
