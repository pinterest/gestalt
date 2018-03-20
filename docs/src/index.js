// @flow
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { render } from 'react-dom';
import App from './components/App';
import routes from './routes';
import 'gestalt/dist/gestalt.css';

render(
  <Router>
    <App>
      {Object.keys(routes).map(pathname => (
        <Route
          component={routes[pathname]}
          path={`/${pathname}`}
          key={pathname}
        />
      ))}
    </App>
  </Router>,
  document.getElementById('root')
);
