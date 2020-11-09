import React from "react";
import Loading from "./Loading";
import {Button} from '@material-ui/core';

const FetchMore = ({
  variables,
  updateQuery,
  fetchMore,
  children,
  loading,
  hasNextPage,
}) => (
  <>
    {loading ? (
      <div className="fetchMore">
       <Loading />
      </div>
    ) : (
      hasNextPage && (
        <Button
          color="primary"
          variant="contained"
          style={{marginBottom: 20}}      
          onClick={() => fetchMore({ variables, updateQuery })}
        >
          More {children}
        </Button>
      )
    )}
  </>
);

export default FetchMore;
