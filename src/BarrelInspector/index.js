import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

import HeaderActions from "./HeaderActions";
import Barrel from "./Barrel";
import { useSatelliteState } from "../shared/context/satellite";

import useStyles from "./styles";

const BarrelInspector = () => {
  const {
    barrels: { byIds },
    visibleBarrels,
    sortedBarrels
  } = useSatelliteState();
  const classes = useStyles();

  const displayedBarrels = sortedBarrels.filter(barrel =>
    visibleBarrels.includes(barrel)
  );

  return (
    <Paper className={classes.root}>
      <header className={classes.header}>
        <span className={classes.viewerTitle}>Moon Shots</span>
        <HeaderActions />
      </header>
      <Divider />
      {displayedBarrels.length > 0 ? (
        <Grid container spacing={4} className={classes.barrels}>
          {displayedBarrels.map((barrel, index) => (
            <Grid item xs={12} sm={6} lg={4} key={`barrel-viewer-item-${index}`}>
              <Barrel barrel={byIds[barrel]} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div> No Barrels to Display!</div>
      )}
    </Paper>
  );
};

export default BarrelInspector;
