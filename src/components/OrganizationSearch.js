import React, { useState } from "react";

import { fade, makeStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    margin: '20px auto',
    display: 'flex'
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#ffffff',
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: 400,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const OrganizationSearch = ({ onOrganizationSearch }) => {
  const classes = useStyles();

  const [organizationName, setOrganizationName] = useState("facebook");

  const onChange = (event) => {
    setOrganizationName(event.target.value);
  };

  const onSubmit = (event) => {
    onOrganizationSearch(organizationName);
    event.preventDefault();
  };

  return (
      <form className={classes.root} onSubmit={onSubmit}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            value={organizationName}
            onChange={onChange}
          />
        </div>

        <Button variant="contained" color="primary" type="submit">Search</Button>
      </form>
  );
};

export default OrganizationSearch;
