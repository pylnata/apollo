import React, { useState } from 'react';
import "./App.css";
import Navigation from "./components/Navigation";
import Profile from "./pages/Profile";
import Organization from "./pages/Organization";
import { BrowserRouter as Router, Route } from "react-router-dom";

import * as routes from "./constants/routes";

function App() {

  const [organizationName, setOrganizationName] = useState("facebook");


  return (
    <Router>
        <Navigation onOrganizationSearch={setOrganizationName} />
        <Route
          exact
          path={routes.ORGANIZATION}
          component={() => (
            <div>
              <Organization organizationName={organizationName} />
            </div>
          )}
        />
        <Route
          exact
          path={routes.PROFILE}
          component={() => (
            <div>
              <Profile />
            </div>
          )}
        />
    </Router>
  );
}

export default App;
