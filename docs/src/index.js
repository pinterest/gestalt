// @flow
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import 'gestalt/dist/gestalt.css';
import App from './components/App';
import routes from './routes';
import './reset.css';

render(
  <HashRouter>
    <App>
      <Switch>
        {Object.keys(routes).map(pathname => (
          <Route
            component={routes[pathname]}
            path={`/${pathname}`}
            key={pathname}
          />
        ))}
      </Switch>
    </App>
  </HashRouter>,
  document.getElementById('root')
);
