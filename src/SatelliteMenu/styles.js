import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    margin: "50px 30px",
    width: 500
  },
  item: {
    padding: 24
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "Center"
  },
  headerAction:{
    margin:16
  }
}));

export default useStyles;
