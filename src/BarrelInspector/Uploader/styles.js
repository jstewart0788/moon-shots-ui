import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  flexCenter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  marginInput: {
    margin: '16px 40px'
  },
  margin: {
    margin: 16
  }
}));

export default useStyles;
