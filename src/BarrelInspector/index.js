import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Divider from "@material-ui/core/Divider";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

import HeaderActions from "./HeaderActions";
import Barrel from "./Barrel";
import { useSatellite } from "../shared/context/satellite";
import { ACTIONS } from "../shared/constants";

import useStyles from "./styles";

const BarrelInspector = () => {
  const [state, dispatch] = useSatellite();
  const {
    barrels: { byIds },
    sort,
    visibleBarrels,
    sortedBarrels
  } = state;
  const classes = useStyles();

  const displayedBarrels = sortedBarrels.filter(barrel =>
    visibleBarrels.includes(barrel)
  );

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
    <Paper className={classes.root}>
      <header className={classes.header}>
        <span className={classes.viewerTitle}>Moon Shots - Barrels</span>
        <HeaderActions />
      </header>
      <Divider />
      {displayedBarrels.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                Status{" "}
                <IconButton
                  onClick={handleSortClick("status")}
                  component="span"
                >
                  {renderIcon(sort.status)}
                </IconButton>
              </TableCell>
              <TableCell>Batch ID</TableCell>
              <TableCell>Satellite ID</TableCell>
              <TableCell>
                Last Update{" "}
                <IconButton
                  onClick={handleSortClick("lastUpdate")}
                  component="span"
                >
                  {renderIcon(sort.lastUpdate)}
                </IconButton>
              </TableCell>
              <TableCell>Flavor</TableCell>
              <TableCell>
                Error{" "}
                <IconButton onClick={handleSortClick("error")} component="span">
                  {renderIcon(sort.error)}
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedBarrels.map((barrel, index) => (
              <Barrel
                barrel={byIds[barrel]}
                key={`barrel-viewer-item-${index}`}
              />
            ))}
          </TableBody>
        </Table>
      ) : (
        <div> No Barrels to Display!</div>
      )}
    </Paper>
  );
};

export default BarrelInspector;
