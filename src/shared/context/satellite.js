import React from "react";
import { ACTIONS } from "../constants";

const SatelliteStateContext = React.createContext();
const SatelliteDispatchContext = React.createContext();

const initialState = {
  satellites: { byIds: {}, allIds: [] },
  barrels: { byIds: {}, allIds: [] },
  visibleBarrels: []
};

function satelliteReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.UPDATE_SATELLITES: {
      const satelliteByIds = {};
      const barrelByIds = {};
      const barrelAllIds = [];
      // Flatten Data
      const satelliteAllIds = payload.map(satellite => {
        // Organize Satellite Data
        satelliteByIds[satellite.id] = {
          ...satellite,
          barrels: satellite.barrels.map(barrel => barrel.batch_id)
        };
        // Organize Barrel DAta
        satellite.barrels.forEach(barrel => {
          barrelAllIds.push(barrel.batch_id);
          barrelByIds[barrel.batch_id] = {
            ...barrel,
            satellite_id: satellite.satellite_id
          };
        });

        return satellite.id;
      });

      return {
        ...state,
        satellites: { byIds: satelliteByIds, allIds: satelliteAllIds },
        barrels: { byIds: barrelByIds, allIds: barrelAllIds },
        visibleBarrels: barrelAllIds
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
function SatelliteProvider({ children }) {
  const [state, dispatch] = React.useReducer(satelliteReducer, initialState);
  return (
    <SatelliteStateContext.Provider value={state}>
      <SatelliteDispatchContext.Provider value={dispatch}>
        {children}
      </SatelliteDispatchContext.Provider>
    </SatelliteStateContext.Provider>
  );
}
function useSatelliteState() {
  const context = React.useContext(SatelliteStateContext);
  if (context === undefined) {
    throw new Error(
      "useSatelliteState must be used within a SatelliteProvider"
    );
  }
  return context;
}
function useSatelliteDispatch() {
  const context = React.useContext(SatelliteDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useSatelliteDispatch must be used within a SatelliteProvider"
    );
  }
  return context;
}

function useSatellite() {
  return [useSatelliteState(), useSatelliteDispatch()];
}

export {
  SatelliteProvider,
  useSatellite,
  useSatelliteState,
  useSatelliteDispatch
};
