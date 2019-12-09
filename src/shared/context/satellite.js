import React from "react";
import _ from "lodash";
import { ACTIONS } from "../constants";

const SatelliteStateContext = React.createContext();
const SatelliteDispatchContext = React.createContext();

const initialState = {
  satellites: { byIds: {}, allIds: [] },
  barrels: { byIds: {}, allIds: [] },
  visibleBarrels: [],
  sort: { status: null, lastUpdate: null, error: null },
  searchText: ""
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
        satelliteByIds[satellite.satellite_id] = {
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

        return satellite.satellite_id;
      });
      return {
        ...state,
        satellites: { byIds: satelliteByIds, allIds: satelliteAllIds },
        barrels: { byIds: barrelByIds, allIds: barrelAllIds },
        visibleBarrels: barrelAllIds
      };
    }
    case ACTIONS.SORT_BARRELS: {
      // set up search variables
      const sortedFields = [];
      const sortedDirections = [];

      //update sort state
      const { field, direction } = payload;
      const newSort = { ...state.sort };
      newSort[field] = direction;

      // create custom collection to sort
      let sortedBarrelIds = state.barrels.allIds.map(id => {
        const barrel = state.barrels.byIds[id];
        const lastUpdate =
          state.satellites.byIds[barrel.satellite_id].telemetry_timestamp;
        const error = barrel.barrel_errors.length;
        return { ...barrel, lastUpdate, error };
      });
      // set search variables
      Object.keys(newSort).forEach(field => {
        if (newSort[field]) {
          sortedFields.push(field);
          sortedDirections.push(newSort[field]);
        }
      });
      //sort collections and return ids
      sortedBarrelIds = _.orderBy(
        sortedBarrelIds,
        sortedFields,
        sortedDirections
      ).map(barrel => barrel.batch_id);

      return {
        ...state,
        sort: newSort,
        visibleBarrels: sortedBarrelIds
      };
    }
    case ACTIONS.SEARCH_BARRELS: {
      const {
        barrels: { allIds, byIds }
      } = state;
      const searchPhrase = payload.toLowerCase();
      const sortedBarrelIds = allIds.filter(
        id =>
          byIds[id].status.toLowerCase().includes(searchPhrase) ||
          byIds[id].last_flavor_sensor_result.toLowerCase().includes(searchPhrase) ||
          byIds[id].barrel_errors.some(err => err.toLowerCase().includes(searchPhrase))
      );
      return {
        ...state,
        searchText: payload,
        visibleBarrels: sortedBarrelIds
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
