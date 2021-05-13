import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Loading.styles";

const Loading = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <CircularProgress className={classes.spinner} />
    </div>
  );
};

export default withStyles(styles)(Loading);
