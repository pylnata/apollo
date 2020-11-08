import React from "react";

import { useQuery } from "@apollo/client";

import Loading from "../../components/Loading";
import RepositoryList from "../../components/Repository/RepositoryList";
import ErrorMessage from "../../components/ErrorMessage";

import { GET_REPOSITORIES_OF_CURRENT_USER } from '../../components/Repository/queries';

const Profile = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORIES_OF_CURRENT_USER, {
    notifyOnNetworkStatusChange: true
  });

  if (error) {
    return <ErrorMessage error={error} />;
  }
 
  if (!data) {
    return <Loading />;
  }
  const { viewer } = data;

 
  return <RepositoryList repositories={viewer.repositories} fetchMore={fetchMore} loading={loading}  entry={'viewer'} />;
};

export default Profile;