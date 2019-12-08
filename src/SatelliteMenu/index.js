import React from "react";
import moment from "moment";

import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Fab from "@material-ui/core/Fab";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";

import { useSatelliteState } from "../shared/context/satellite";

import useStyles from "./styles";

const SattelliteMenu = () => {
  const {
    satellites: { byIds, allIds }
  } = useSatelliteState();

  const classes = useStyles();

  return (
    <Paper>
      <List
        component="nav"
        aria-labelledby="Satellite Menu"
        disablePadding
        subheader={<ListSubheader component="div">Satellites</ListSubheader>}
      >
        {allIds.map((id, index) => (
          <div key={`satellite-menu-item-${index}`}>
            <ListItem button className={classes.item} disableRipple>
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
              <div>
                <Tooltip title="Trigger Deorbit Burn" aria-label="trigger deorbit burn">
                  <Fab
                    size="small"
                    color="primary"
                    className={classes.action}
                  >
                    <Icon
                      className="fal fa-chevron-double-down"
                      fontSize="small"
                    />
                  </Fab>
                </Tooltip>
                <Tooltip title="Detonate" aria-label="detonate">
                  <Fab
                    size="small"
                    color="secondary"
                    className={classes.action}
                  >
                    <Icon className="fal fa-bomb" fontSize="small" />
                  </Fab>
                </Tooltip>
              </div>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </Paper>
  );
};

export default SattelliteMenu;
