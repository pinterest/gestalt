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

const container = document.getElementById('root');

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
            {Object.keys(routes).map(pathname => {
              const cleanPathname = pathname.replace(/\d-/g, '');
              return (
                <Route
                  path={`/${routes[pathname].navRoute.section}/${cleanPathname}`}
                  key={pathname}
                  render={() => <CardPage cards={routes[pathname].cards} />}
                />
              );
            })}
          </Switch>
        </App>
      </HashRouter>
    </React.StrictMode>,
    container
  );
} else {
  throw new Error("No element with id 'root' found in index.html file");
}
