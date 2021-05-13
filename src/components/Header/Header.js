import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import styles from "./Header.styles";

function Header(props) {
  const { classes } = props;
  return (
    <Typography variant="h3" classes={{ root: classes.header }}>
      EDA Application
    </Typography>
  );
}

export default withStyles(styles)(Header);
