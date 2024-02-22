import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import SubcategoryAddEditForm from "./template/SubcategoryAddEditForm";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const AppForm = () => {
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Edit Category" }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="">
          <SubcategoryAddEditForm />
        </SimpleCard>

        
      </Stack>
    </Container>
  );
};

export default AppForm;
