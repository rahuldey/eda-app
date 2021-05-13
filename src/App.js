import { createContext, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import DropInput from "./components/DropInput/DropInput";
import Header from "./components/Header/Header";
import Loading from "./components/Loading/Loading";
import ImageList from "./components/ImageList/ImageList";
import styles from "./App.styles";

export const DataContext = createContext();

function App(props) {
  const { classes } = props;
  const [appData, setAppData] = useState({
    imageList: [],
    loading: false,
  });

  const setImages = (imageList) => {
    setAppData({
      ...appData,
      imageList: imageList,
    });
  };

  const setLoading = (loading) => {
    setAppData({
      ...appData,
      loading: loading,
    });
  };

  return (
    <>
      <CssBaseline />
      <div className={classes.root}>
        <Header />
        {appData.loading ? <Loading /> : null}
        <DataContext.Provider value={appData}>
          <div className={classes.app}>
            <DropInput setImages={setImages} setLoading={setLoading} />
            <ImageList />
          </div>
        </DataContext.Provider>
      </div>
    </>
  );
}

export default withStyles(styles)(App);
