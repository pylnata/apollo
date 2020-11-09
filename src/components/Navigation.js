import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import GroupWorkIcon from "@material-ui/icons/GroupWork";

import { Link, useLocation } from "react-router-dom";
import OrganizationSearch from "./OrganizationSearch";
import * as routes from "../constants/routes";
import { withStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#ffffff",
    "&:hover": {
      color: blue[100],
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
}))(Button);

const Navigation = ({ onOrganizationSearch }) => {
  const classes = useStyles();

  const { pathname } = useLocation();
  return (
    <>
      <AppBar position="static">
        <Toolbar className={classes.center}>
          <Typography variant="h6">
    
          <ColorButton
              variant="text"
              component={Link}
              to={routes.ORGANIZATION}
              startIcon={<GroupWorkIcon />}
            >
              Organization
            </ColorButton>

            <ColorButton
              component={Link}
              variant="text"
              to={routes.PROFILE}
              startIcon={<PersonIcon />}
            >
             My Profile
            </ColorButton>
    
          </Typography>
        </Toolbar>
      </AppBar>

      {pathname === routes.ORGANIZATION && (
        <OrganizationSearch onOrganizationSearch={onOrganizationSearch} />
      )}
    </>
  );
};
export default Navigation;
