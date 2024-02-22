import { Box, styled } from "@mui/material";
import { Breadcrumb, SimpleCard } from "app/components";
import EventsTable from "./template/EventsList";

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
        <Breadcrumb routeSegments={[ { name: 'Events', path: '/events/list' },{ name: 'Events List' },]} />
      </Box>

      <SimpleCard>
        <EventsTable />
      </SimpleCard>
    </Container>
  );
};

export default AppTable;
