import React from "react";

import { useQuery } from "@apollo/client";

import Loading from "../../components/Loading";
import RepositoryList from "../../components/Repository/RepositoryList";
import ErrorMessage from "../../components/ErrorMessage";

import { GET_REPOSITORIES_OF_ORGANIZATION } from "../../components/Repository/queries";

const Organization = ({ organizationName }) => {
  const { loading, error, data, fetchMore } = useQuery(
    GET_REPOSITORIES_OF_ORGANIZATION,
    {
      notifyOnNetworkStatusChange: true,
      variables: {
        organizationName:'the-road-to-learn-react',
      },
      skip: organizationName === "",
    }
  );

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if(!organizationName) return null

  if (!data) {
    return <><Loading /></>;
  }
  const { organization } = data;

  return (
    <RepositoryList
      repositories={organization.repositories}
      fetchMore={fetchMore}
      loading={loading}
      entry={'organization'}
    />
  );
};

export default Organization;
