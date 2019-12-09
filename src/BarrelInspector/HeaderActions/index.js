import React, { useState } from "react";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from "@material-ui/core/Tooltip";

import { useSatellite } from "../../shared/context/satellite";
import { ACTIONS } from "../../shared/constants";
import Sort from "../Sort";
import useStyles from "./styles";

const HeaderActions = () => {
  const [state, dispatch] = useSatellite();
  const [sortAnchor, setSortAnchor] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);


  const { searchText } = state;

  const openSort = event => {
    setSortAnchor(event.currentTarget);
  };

  const closeSort = () => {
    setSortAnchor(null);
  };

  const searchHandler = e =>
    dispatch({
      type: ACTIONS.SEARCH_BARRELS,
      payload: e.target.value
    });

   const toggleOpenSearch = action => () => setOpenSearch(action);

  const classes = useStyles();

  return (
    <section>
      <ClickAwayListener onClickAway={toggleOpenSearch(false)}>
        <Tooltip title="Search" aria-label="search">
          <Fab
            size="small"
            className={classes.headerAction}
            variant={openSearch ? "extended" : null}
            onClick={toggleOpenSearch(true)}
          >
            <Icon className="fal fa-search" fontSize="small" />
            {openSearch && <TextField className={classes.searchText} onChange={searchHandler} value={searchText} />}
          </Fab>
        </Tooltip>
      </ClickAwayListener>
      <Tooltip title="Sort" aria-label="sort">
        <Fab size="small" className={classes.headerAction} onClick={openSort}>
          <Icon className="fal fa-filter" fontSize="small" />
        </Fab>
      </Tooltip>
      <Tooltip title="Add New Satellite" aria-label="add">
        <Fab size="small" className={classes.headerAction}>
          <Icon className="far fa-plus" fontSize="small" />
        </Fab>
      </Tooltip>
      <Sort anchor={sortAnchor} handleClose={closeSort} />
    </section>
  );
};

export default HeaderActions;
