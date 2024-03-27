import { Grid } from "@mui/material";
import { Column } from "@/shared/ui";

const Home = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={16} md={4}>
        <Column columnId={1} />
      </Grid>
      <Grid item xs={16} md={4}>
        <Column columnId={2} />
      </Grid>
      <Grid item xs={16} md={4}>
        <Column columnId={3} />
      </Grid>
    </Grid>
  );
};

export default Home;
