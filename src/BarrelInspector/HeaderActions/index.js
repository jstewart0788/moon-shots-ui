import React, { useState } from "react";
import Icon from "@material-ui/core/Icon";
import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Tooltip from "@material-ui/core/Tooltip";

import { useSatellite } from "../../shared/context/satellite";
import { ACTIONS } from "../../shared/constants";
import Uploader from "../Uploader";
import useStyles from "./styles";

const HeaderActions = () => {
  const [state, dispatch] = useSatellite();
  const [openSearch, setOpenSearch] = useState(false);
  const [uploaderOpen, toggUploaderOpen] = useState(false);

  const { searchText } = state;

  const searchHandler = e =>
    dispatch({
      type: ACTIONS.SEARCH_BARRELS,
      payload: e.target.value
    });

  const toggleOpenSearch = action => () => setOpenSearch(action);

  const setUploaderOpen = value => () => {
    toggUploaderOpen(value);
  };

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
            {openSearch && (
              <TextField
                className={classes.searchText}
                onChange={searchHandler}
                value={searchText}
              />
            )}
          </Fab>
        </Tooltip>
      </ClickAwayListener>
      <Tooltip title="Add New Satellite" aria-label="add">
        <Fab
          size="small"
          className={classes.headerAction}
          onClick={setUploaderOpen(true)}
        >
          <Icon className="far fa-plus" fontSize="small" />
        </Fab>
      </Tooltip>
      <Uploader open={uploaderOpen} setUploaderOpen={setUploaderOpen} />
    </section>
  );
};

export default HeaderActions;
