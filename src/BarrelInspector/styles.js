import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 500,
    padding: 20
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "Center"
  },
  viewerTitle: {
    fontSize: "2rem",
    fontWeight: "bold"
  },
  barrels:{
    justifyContent: 'stretch',
    marginTop: 20
  }
}));

export default useStyles;
