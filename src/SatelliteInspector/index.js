import React from "react";
import Paper from "@material-ui/core/Paper";


import { useSatelliteState } from "../shared/context/satellite";

import useStyles from "./styles";

const SattelliteMenu = () => {
  const {
    satellites: { byIds },
    selectedSatelite
  } = useSatelliteState();
  const classes = useStyles();

  return <Paper className={classes.root}>
      test
  </Paper>;
};

export default SattelliteMenu;
