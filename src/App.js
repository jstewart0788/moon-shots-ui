import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

import SatelliteMenu from "./SatelliteMenu";
import BarrelInspector from "./BarrelInspector";

import { useSatelliteDispatch } from "./shared/context/satellite";
import { ACTIONS } from "./shared/constants";

function App() {
  const dispatch = useSatelliteDispatch();
  useEffect(() => {
    async function fetchSatellites() {
      try {
        // Fetch Satellites from API
        const {
          data: { satellites }
        } = await axios.get(`/api`);

        dispatch({ type: ACTIONS.UPDATE_SATELLITES, payload: satellites });
      } catch (error) {
        console.log(error);
      }
    }
    fetchSatellites();
  }, []);

  return (
    <main>
      <Grid container spacing={3}>
        <Grid item xs={12} md={5} lg={4}>
          <SatelliteMenu />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <BarrelInspector />
        </Grid>
      </Grid>
    </main>
  );
}

export default App;
