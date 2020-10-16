// @flow strict
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { render } from 'react-dom';
import 'gestalt/dist/gestalt.css';
import 'gestalt-datepicker/dist/gestalt-datepicker.css';
import App from './components/App.js';
import CardPage from './components/CardPage.js';
import routes from './components/routes.js';
import './docs.css';
import sidebarIndex from './components/sidebarIndex.js';

const container = document.getElementById('root');
const mapRoutes = pages =>
  pages.map((page, i) => (
    <Route
      path={`/${page}`}
      key={i}
      render={() => <CardPage cards={routes[page]} page={page} />}
    />
  ));

if (container instanceof Element) {
  render(
    <React.StrictMode>
      <BrowserRouter>
        <App>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/Changelog" />} />
            {sidebarIndex.map(section => mapRoutes(section.pages))}
          </Switch>
        </App>
      </BrowserRouter>
    </React.StrictMode>,
    container
  );
} else {
  throw new Error("No element with id 'root' found in index.html file");
}
