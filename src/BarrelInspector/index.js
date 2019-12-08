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
    visibleBarrels
  } = useSatelliteState();
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <header className={classes.header}>
        <span className={classes.viewerTitle}>Moon Shots</span>
        <HeaderActions />
      </header>
      <Divider />
      <Grid container spacing={4} className={classes.barrels}>
        {visibleBarrels.map((barrel, index) => (
          <Grid item xs={12} md={4} key={`barrel-viewer-item-${index}`}>
            <Barrel barrel={byIds[barrel]} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default BarrelInspector;
