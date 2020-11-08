import React from "react";

const IssueListItem = ({ issue }) => (
  <>
    <div>
      <h3>
        <a href={issue.url}>{issue.title}</a>
      </h3>
      <div dangerouslySetInnerHTML={{ __html: issue.bodyHTML }} />

    </div>
  </>
);

export default IssueListItem;
