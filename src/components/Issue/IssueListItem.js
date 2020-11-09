import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    background: '#ffffff',
    padding: 10,
    margin: '10px 0',
  },
  title: {
    color: grey[700],
  },
  description: {
    fontSize: 14
  }
}));

const IssueListItem = ({ issue }) => {
  const classes = useStyles();
  return (
      <div className={classes.root}>
        <h4>
          <a  className={classes.title} href={issue.url}>{issue.title}</a>
        </h4>
        <p className={classes.description} dangerouslySetInnerHTML={{ __html: issue.bodyHTML }} />
      </div>
  
  );
};
export default IssueListItem;
