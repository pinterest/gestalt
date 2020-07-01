// @flow strict
import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { render } from 'react-dom';
import 'gestalt/dist/gestalt.css';
import 'gestalt-datepicker/dist/gestalt-datepicker.css';
import App from './components/App.js';
import CardPage from './components/CardPage.js';
import routes from './components/routes.js';
import './reset.css';
import sidebarIndex from './components/sidebarIndex.js';

const container = document.getElementById('root');
const mapRoutes = (pages, pathname) =>
  pages.map((page, i) => (
    <Route
      path={`/${pathname}/${page}`}
      key={i}
      render={() => <CardPage cards={routes[page]} />}
    />
  ));

if (container instanceof Element) {
  render(
    <React.StrictMode>
      <HashRouter>
        <App>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Redirect to="/getting-started/Installation" />}
            />
            {sidebarIndex.map(section =>
              section.pages
                ? mapRoutes(section.pages, section.sectionPathname)
                : section.subsections.map(subsection =>
                    mapRoutes(subsection.pages, section.sectionPathname)
                  )
            )}
          </Switch>
        </App>
      </HashRouter>
    </React.StrictMode>,
    container
  );
} else {
  throw new Error("No element with id 'root' found in index.html file");
}
