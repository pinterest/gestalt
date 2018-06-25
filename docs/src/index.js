// @flow
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import 'gestalt/dist/gestalt.css';
import App from './components/App';
import CardPage from './components/CardPage';
import routes from './components/routes';
import './reset.css';

const container = document.getElementById('root');

if (container instanceof Element) {
  render(
    <HashRouter>
      <App>
        <Switch>
          {Object.keys(routes).map(pathname => (
            <Route
              path={`/${pathname}`}
              key={pathname}
              render={() => <CardPage cards={routes[pathname]} />}
            />
          ))}
        </Switch>
      </App>
    </HashRouter>,
    container
  );
} else {
  throw new Error("No element with id 'root' found in index.html file");
}
