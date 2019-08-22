import React, { useState } from "react";
import '../styles/lock.css'
import Grid from '@material-ui/core/Grid';

const styles = {
  root: {
    fontFamily:
      '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
    fontWeight: 300
  },
  header: {
    backgroundColor: "#03a9f4",
    color: "white",
    padding: "16px",
    fontSize: "1.5em"
  }
};

const Header = props => {
  const [verified, setVerified] = useState(false)

  return (
    <Grid container alignItems='center' justify="center" style={styles.header}>
      <Grid item xs={11}>{props.title}</Grid>
      <Grid
        onClick={() => {
          setVerified(!verified)
        }}
        className={`lock ${verified ? 'unlocked' : ''}`
        }></Grid>
    </Grid>
  );
};



export default Header;