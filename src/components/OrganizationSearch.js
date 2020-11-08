import React, { useState } from "react";

const OrganizationSearch = ({ onOrganizationSearch }) => {
  const [organizationName, setOrganizationName] = useState("");

  const onChange = (event) => {
    setOrganizationName(event.target.value);
  };

  const onSubmit = (event) => {
    onOrganizationSearch(organizationName);
    event.preventDefault();
  };

  return (
    <div className="search">
      <form onSubmit={onSubmit}>
        <input type="text" value={organizationName} onChange={onChange} />{" "}
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default OrganizationSearch;
