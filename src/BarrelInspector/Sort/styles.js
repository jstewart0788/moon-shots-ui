import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: 200
  },
  sortItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: 16
  }
}));

export default useStyles;
