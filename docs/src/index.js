// @flow
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import 'gestalt/dist/gestalt.css';
import App from './components/App';
import CardPage from './components/CardPage';
import routes from './routes';
import './reset.css';

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
  document.getElementById('root')
);
