import React, { useState } from "react";
import IssueList from "./IssueList";

const ISSUE_STATES = {
  NONE: "NONE",
  OPEN: "OPEN",
  CLOSED: "CLOSED",
};

const TRANSITION_LABELS = {
  [ISSUE_STATES.NONE]: "Hide Issues",
  [ISSUE_STATES.OPEN]: "Show Open Issues",
  [ISSUE_STATES.CLOSED]: "Show Closed Issues",
};

const TRANSITION_STATE = {
  [ISSUE_STATES.NONE]: ISSUE_STATES.OPEN,
  [ISSUE_STATES.OPEN]: ISSUE_STATES.CLOSED,
  [ISSUE_STATES.CLOSED]: ISSUE_STATES.NONE,
};

const isShow = (issueState) => issueState !== ISSUE_STATES.NONE;

const Issues = ({ repositoryName, repositoryOwner }) => {
  const [issueState, setIssueState] = useState(ISSUE_STATES.NONE);

  const onChangeState = (event) => {
    setIssueState(event.target.value);
  };

  return (
    <>
      {Object.keys(TRANSITION_STATE).map((state) => (
        <label>
          <input
            type="radio"
            value={state}
            name={`${repositoryName}-state`}
            checked={state === issueState}
            onChange={onChangeState}
          />{" "}
          {TRANSITION_LABELS[state]}
        </label>
      ))}

      {isShow(issueState) && (
        <IssueList
          repositoryName={repositoryName}
          repositoryOwner={repositoryOwner}
          issueState={issueState}
        />
      )}
    </>
  );
};

export default Issues;
