import React from "react";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import moment from "moment";

import { useSatelliteState } from "../shared/context/satellite";

import useStyles from "./styles";

const SattelliteMenu = () => {
  const {
    satellites: { byIds },
    visibleSatellites
  } = useSatelliteState();
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <List
        component="nav"
        aria-labelledby="Satellite Menu"
        disablePadding
        subheader={
          <ListSubheader component="div" className={classes.header}>
            Satellites
            <div>
              <Fab size="small" className={classes.headerAction}>
                <Icon className="fal fa-search" fontSize="small" />
              </Fab>
              <Fab size="small" className={classes.headerAction}>
                <Icon className="fal fa-filter" fontSize="small" />
              </Fab>
              <Fab size="small" className={classes.headerAction}>
                <Icon className="far fa-plus" fontSize="small" />
              </Fab>
            </div>
          </ListSubheader>
        }
      >
        {visibleSatellites.map((id, index) => (
          <div key={`satellite-menu-item-${index}`}>
            <ListItem button className={classes.item}>
              <ListItemAvatar>
                <Avatar>
                  <Icon className="fal fa-satellite" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`ID: ${byIds[id].satellite_id}`}
                secondary={`Last Transmission: ${moment(
                  byIds[id].telemetry_timestamp
                ).format("MM/DD/YY @ HH:MM")}`}
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </Paper>
  );
};

export default SattelliteMenu;
