// @flow strict
import React, { type Node } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import App from './components/App.js';
import CardPage from './components/CardPage.js';
import routes from './components/routes.js';
import sidebarIndex from './components/sidebarIndex.js';

import './docs.css';
import 'gestalt/dist/gestalt.css';
import 'gestalt-datepicker/dist/gestalt-datepicker.css';

const mapRoutes = (pages) =>
  pages.map((page, i) => (
    <Route path={`/${page}`} key={i} render={() => <CardPage cards={routes[page]} page={page} />} />
  ));

function AppWrapper(): Node {
  return (
    <BrowserRouter>
      <App>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/What's New" />} />
          {sidebarIndex.map((section) => mapRoutes(section.pages))}
        </Switch>
      </App>
    </BrowserRouter>
  );
}

export default AppWrapper;
