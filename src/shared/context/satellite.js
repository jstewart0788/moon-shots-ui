import React from "react";
import { ACTIONS } from "../constants";

const SatelliteStateContext = React.createContext();
const SatelliteDispatchContext = React.createContext();

const initialState = {
  satellites: { byIds: {}, allIds: [] },
  visibleSatellites: [],
};

function satelliteReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.UPDATE_SATELLITES: {
      const byIds = {};
      const allIds = payload.map(satellite => {
        byIds[satellite.id] = satellite;
        return satellite.id;
      });
      return {
        ...state,
        satellites: { byIds, allIds },
        visibleSatellites: allIds
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
    throw new Error("useSatelliteState must be used within a SatelliteProvider");
  }
  return context;
}
function useSatelliteDispatch() {
  const context = React.useContext(SatelliteDispatchContext);
  if (context === undefined) {
    throw new Error("useSatelliteDispatch must be used within a SatelliteProvider");
  }
  return context;
}

function useSatellite() {
  return [useSatelliteState(), useSatelliteDispatch()];
}

export { SatelliteProvider, useSatellite, useSatelliteState, useSatelliteDispatch };