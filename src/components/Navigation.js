import React from "react";
import { Link, useLocation } from "react-router-dom";
import OrganizationSearch from "./OrganizationSearch";
import * as routes from "../constants/routes";

const Navigation = ({onOrganizationSearch}) => {
  const { pathname } = useLocation();
  return (
    <header>
      <div>
        <Link to={routes.PROFILE}>Profile</Link>
      </div>
      <div>
        <Link to={routes.ORGANIZATION}>Organization</Link>
      </div>

      {pathname === routes.ORGANIZATION && (
        <OrganizationSearch
          //organizationName={organizationName}
          onOrganizationSearch={onOrganizationSearch}
        />
      )}
    </header>
  );
};
export default Navigation;
