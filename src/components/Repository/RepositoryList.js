import React from "react";
import RepositoryListItem from "./RepositoryListItem";
import FetchMore from "../FetchMore";
import Issues from "../Issue";

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

const RepositoryList = ({ repositories, fetchMore, loading, entry }) => {
  return (
    <>
      {repositories.edges.map(({ node }) => (
        <div key={node.id} className="RepositoryItem">
          <RepositoryListItem {...node} />

          <Issues
            repositoryName={node.name}
            repositoryOwner={node.owner.login}
          />
        </div>
      ))}

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
    </>
  );
};

export default RepositoryList;
