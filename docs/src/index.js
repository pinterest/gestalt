import React from 'react';
import { Router, hashHistory, Route } from 'react-router';
import { render } from 'react-dom';
import App from './components/App';
import routes from './routes';
import '!style-loader!css-loader!gestalt/dist/gestalt.css';

const node = document.createElement('DIV');
document.body.appendChild(node);

render(
  <Router history={hashHistory}>
    <Route component={App} path="/">
      {Object.keys(routes).map(pathname => (
        <Route
          component={routes[pathname]}
          path={`/${pathname}`}
          key={pathname}
        />
      ))}
    </Route>
  </Router>,
  node
);
