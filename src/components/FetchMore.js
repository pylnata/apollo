import React from "react";
import Loading from "./Loading";

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
        <button
          type="button"
          className="fetchMore"
          onClick={() => fetchMore({ variables, updateQuery })}
        >
          More {children}
        </button>
      )
    )}
  </>
);

export default FetchMore;
