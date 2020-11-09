import React from "react";
import { useQuery } from "@apollo/client";

import { GET_ISSUES_OF_REPOSITORY } from "./queries";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import IssueListItem from "./IssueListItem";
import FetchMore from "../FetchMore";

const updateQuery = (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) {
      return previousResult;
    }
  
    return {
      ...previousResult,
      repository: {
        ...previousResult.repository,
        issues: {
          ...previousResult.repository.issues,
          ...fetchMoreResult.repository.issues,
          edges: [
            ...previousResult.repository.issues.edges,
            ...fetchMoreResult.repository.issues.edges,
          ],
        },
      },
    };
  };

const IssueList = ({ repositoryName, repositoryOwner, issueState }) => {
  const { data, loading, error, fetchMore } = useQuery(
    GET_ISSUES_OF_REPOSITORY,
    {
      variables: {
        repositoryName,
        repositoryOwner,
        issueState,
      },
    }
  );

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!data) return null;

  const { repository } = data;

  if (loading && !repository) {
    return <Loading />;
  }

  if (!repository.issues.edges.length) {
    return <div style={{margin: 10, fontSize: 14}}>No issues ...</div>;
  }

  return (
    <>
      {repository.issues.edges.map(({ node }) => (
        <IssueListItem issue={node} />
      ))}

      {repository.issues.pageInfo.hasNextPage && (
        <FetchMore
          loading={loading}
          hasNextPage={repository.issues.pageInfo.hasNextPage}
          variables={{
            cursor: repository.issues.pageInfo.endCursor,
            repositoryOwner,
            repositoryName,
            issueState,
          }}
          updateQuery={updateQuery}
          fetchMore={fetchMore}
        >
          Issues
        </FetchMore>
      )}
    </>
  );
};

export default IssueList;
