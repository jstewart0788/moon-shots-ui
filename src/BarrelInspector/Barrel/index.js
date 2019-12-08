import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

import { BARREL_STATUS } from "../../shared/constants";
import { capitalizeFirstLetter } from "../../shared/utils";

import useStyles from "./styles";

const statusColor = status => {
  switch (status) {
    case BARREL_STATUS.AGING:
      return null;
    case BARREL_STATUS.READY:
      return { backgroundColor: "#4BB543" };
    case BARREL_STATUS.ERROR:
      return { backgroundColor: "#E5202D" };
    default:
      return null;
  }
};

const Barrel = ({
  barrel: {
    last_flavor_sensor_result: flavor,
    batch_id: id,
    status,
    satellite_id,
    barrel_errors: errors = []
  },
  barrel
}) => {
  const classes = useStyles();

  const [barrelExpanded, setBarrelExpanded] = useState(false);

  const toggleExpand = () => {
    setBarrelExpanded(!barrelExpanded);
  };
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar style={statusColor(status)}>
            <Icon className="fal fa-glass-whiskey-rocks" />
          </Avatar>
        }
        action={
          <>
            <IconButton onClick={toggleExpand}>
              <Icon className="far fa-chevron-down" />{" "}
            </IconButton>
          </>
        }
        title={`Batch: ${id}`}
        subheader={`Satellite: ${satellite_id}`}
      />
      <CardContent classes={{ root: classes.cardRoot }}>
        <Collapse in={barrelExpanded}>
          <div className={classes.expandedBody}>
            <div>
              Status: <b> {capitalizeFirstLetter(status)} </b>
            </div>
            <div>
              Last Flavor: <b> {capitalizeFirstLetter(flavor)} </b>
            </div>
            {errors.length > 0 && (
              <div>
                Errors:
                <ul>
                  {errors.map((error, index) => (
                    <li key={`error-item-${index}`}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default Barrel;
