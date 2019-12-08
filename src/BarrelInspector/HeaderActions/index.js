import React, { useState } from "react";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from "@material-ui/core/Tooltip";

import useStyles from "./styles";

const HeaderActions = () => {
  const [searching, setSearching] = useState(false);

  const searchHandler = value => () => setSearching(value);

  const classes = useStyles();

  return (
    <section>
      <ClickAwayListener onClickAway={searchHandler(false)}>
        <Tooltip title="Search" aria-label="search">
          <Fab
            size="small"
            className={classes.headerAction}
            variant={searching ? "extended" : null}
            onClick={searchHandler(true)}
          >
            <Icon className="fal fa-search" fontSize="small" />
            {searching && <TextField className={classes.searchText} />}
          </Fab>
        </Tooltip>
      </ClickAwayListener>
      <Tooltip title="Sort" aria-label="sort">
        <Fab size="small" className={classes.headerAction}>
          <Icon className="fal fa-filter" fontSize="small" />
        </Fab>
      </Tooltip>
      <Tooltip title="Add New Satellite" aria-label="add">
        <Fab size="small" className={classes.headerAction}>
          <Icon className="far fa-plus" fontSize="small" />
        </Fab>
      </Tooltip>
    </section>
  );
};

export default HeaderActions;
