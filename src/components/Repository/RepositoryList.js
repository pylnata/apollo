import React from "react";
import RepositoryListItem from "./RepositoryListItem";
import FetchMore from "../FetchMore";
import Issues from "../Issue";
import { makeStyles } from "@material-ui/core/styles";

const getUpdateQuery = (entry) => (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return {
    ...previousResult,
    [entry]: {
      ...previousResult[entry],
      repositories: {
        ...previousResult[entry].repositories,
        ...fetchMoreResult[entry].repositories,
        edges: [
          ...previousResult[entry].repositories.edges,
          ...fetchMoreResult[entry].repositories.edges,
        ],
      },
    },
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  list: {
    margin: 'auto',
    width: 800,
"& > div": {
      margin: theme.spacing(1),
      maxWidth: theme.spacing(160),
      position: 'relative',
      padding: 20,
      background: '#e3f2fd',
      // height: theme.spacing(160),
    },
  },
}));

const RepositoryList = ({ repositories, fetchMore, loading, entry }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.list}>
        {repositories.edges.map(({ node }) => (
          <div key={node.id} >
            <div>
              <RepositoryListItem {...node} />

              <Issues
                repositoryName={node.name}
                repositoryOwner={node.owner.login}
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <FetchMore
          loading={loading}
          hasNextPage={repositories.pageInfo.hasNextPage}
          variables={{
            cursor: repositories.pageInfo.endCursor,
          }}
          updateQuery={getUpdateQuery(entry)}
          fetchMore={fetchMore}
        >
          Repositories
        </FetchMore>
      </div>
    </div>
  );
};

export default RepositoryList;
