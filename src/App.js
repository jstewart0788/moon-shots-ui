import React, {useEffect } from "react";
import axios from "axios";

import SatelliteMenu from "./SatelliteMenu";

import { useSatelliteDispatch } from "./shared/context/satellite";
import { ACTIONS } from "./shared/constants";

function App() {
  const dispatch = useSatelliteDispatch();
  useEffect(() => {
    async function fetchCharms() {
      try {
        // Fetch Claims from API
        const {
          data: { satellites }
        } = await axios.get(`/api`);

        dispatch({ type: ACTIONS.UPDATE_SATELLITES, payload: satellites });
      } catch (error) {
        console.log(error);
      }
    }
    fetchCharms();
  }, []);

  return (
    <main>
      <SatelliteMenu />
    </main>
  );
}

export default App;
