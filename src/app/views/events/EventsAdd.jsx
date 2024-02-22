import { Stack } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Breadcrumb, SimpleCard } from "app/components";
import AddForm from "./template/AddForm";

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
         <Breadcrumb routeSegments={[ { name: 'Events', path: '/events/list' },{ name: 'Event Add' },]} />
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
