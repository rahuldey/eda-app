import { useContext } from "react";
import { withStyles } from "@material-ui/core/styles";
import { DataContext } from "../../App";
import styles from "./ImageList.styles";

const ImageList = (props) => {
  const { classes } = props;
  const value = useContext(DataContext);
  const list =
    value.imageList.length > 0
      ? value.imageList.map((image) => (
          <div className={classes.item} key={image}>
            <img
              src={`http://localhost:8000/images/${image}`}
              alt={image}
              className={classes.img}
            />
          </div>
        ))
      : null;
  return list;
};

export default withStyles(styles)(ImageList);
