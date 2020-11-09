import React, { useState } from "react";
import IssueList from "./IssueList";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

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

  const onChangeState = (state) => {
    setIssueState(state);
  };

  return (
    <>
      <ButtonGroup size="small" aria-label="small outlined button group">
        {Object.keys(TRANSITION_STATE).map((state) => (
          <Button
            key={state}
            color={state === issueState ? "secondary" : "default"}
            onClick={() => onChangeState(state)}
          >
            {TRANSITION_LABELS[state]}
          </Button>
        ))}
      </ButtonGroup>

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
