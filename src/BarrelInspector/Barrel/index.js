import React from "react";
import moment from "moment";
import Icon from "@material-ui/core/Icon";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";

import { capitalizeFirstLetter } from "../../shared/utils";
import useStyles from "./styles";

const Barrel = ({
  barrel: {
    last_flavor_sensor_result: flavor,
    batch_id: id,
    status,
    satellite_id,
    lastUpdate,
    barrel_errors: errors
  }
}) => {
  const classes = useStyles();

  const renderStatusIcon = status => {
    switch (status) {
      case "aging":
        return (
          <Tooltip title={capitalizeFirstLetter(status)} aria-label={status}>
            <Icon
              classes={{ root: classes.iconRoot }}
              fontSize="default"
              className="fal fa-hourglass-half"
            />
          </Tooltip>
        );
      case "error":
        return (
          <Tooltip title={capitalizeFirstLetter(status)} aria-label={status}>
            <Icon
              classes={{ root: classes.iconRoot }}
              fontSize="default"
              className="fal fa-exclamation-triangle"
            />
          </Tooltip>
        );
      default:
        return (
          <Tooltip title={capitalizeFirstLetter(status)} aria-label={status}>
            <Icon
              classes={{ root: classes.iconRoot }}
              fontSize="default"
              className="fal fa-glass-whiskey-rocks"
            />
          </Tooltip>
        );
    }
  };
  return (
    <TableRow hover>
      <TableCell align="center">{renderStatusIcon(status)}</TableCell>
      <TableCell>{id}</TableCell>
      <TableCell>{satellite_id}</TableCell>
      <TableCell>
        {lastUpdate && moment(lastUpdate).format("MM/DD/YY @ HH:MM")}
      </TableCell>
      <TableCell>{capitalizeFirstLetter(flavor)}</TableCell>
      <TableCell>
        {errors.length > 0 && (
          <Tooltip
            title={errors.map(error => (
              <div key={`error-${error}`}>{error}</div>
            ))}
            aria-label={status}
          >
            <Icon className="fal fa-bug" />
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
};

export default Barrel;
