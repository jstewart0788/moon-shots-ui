import React from "react";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { Icon } from "@material-ui/core";

import { useSatellite } from "../../shared/context/satellite";
import { ACTIONS } from "../../shared/constants";

import useStyles from "./styles";

const renderIcon = direction => {
  switch (direction) {
    case "asc":
      return <Icon className="fad fa-sort-up" />;
    case "desc":
      return <Icon className="fad fa-sort-down" />;
    default:
      return <Icon className="fad fa-sort" />;
  }
};

const Sort = ({ anchor, handleClose }) => {
  const classes = useStyles();
  const [state, dispatch] = useSatellite();
  const { sort } = state;

  const open = Boolean(anchor);

  const handleSortClick = field => () => {
    const direction = sort[field];
    switch (direction) {
      case "asc":
        dispatch({
          type: ACTIONS.SORT_BARRELS,
          payload: { field, direction: "desc" }
        });
        break;
      case "desc":
        dispatch({
          type: ACTIONS.SORT_BARRELS,
          payload: { field, direction: null }
        });
        break;
      default:
        dispatch({
          type: ACTIONS.SORT_BARRELS,
          payload: { field, direction: "asc" }
        });
        break;
    }
  };

  return (
    <Popover
      open={open}
      anchorEl={anchor}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
    >
      <div className={classes.root}>
        <MenuList>
          <MenuItem
            className={classes.sortItem}
            onClick={handleSortClick("status")}
          >
            Status {renderIcon(sort.status)}
          </MenuItem>
          <MenuItem
            className={classes.sortItem}
            onClick={handleSortClick("lastUpdate")}
          >
            Last Update {renderIcon(sort.lastUpdate)}
          </MenuItem>
          <MenuItem
            className={classes.sortItem}
            onClick={handleSortClick("error")}
          >
            Error {renderIcon(sort.error)}
          </MenuItem>
        </MenuList>
      </div>
    </Popover>
  );
};

export default Sort;
