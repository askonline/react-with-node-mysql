import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import AddForm from "./template/AddForm";
import { useParams } from "react-router-dom";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppForm = () => {
  const { id } = useParams();
  const breadcrumbVal = (id)?"Update":"Add";
  
  return (
    <Container>
      <Box className="breadcrumb">
        
        <Breadcrumb routeSegments={[ { name: 'Product', path: '/product/list' },{ name: breadcrumbVal },]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="">
          <AddForm />
        </SimpleCard>

        
      </Stack>
    </Container>
  );
};

export default AppForm;
