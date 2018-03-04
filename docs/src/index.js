import 'corkboard/init';
import React from 'react';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import App from './components/App';
import CardPage from './components/CardPage';
import { render } from 'react-dom';
import { getCards } from 'corkboard/init';
import '!style-loader!css-loader!gestalt/dist/gestalt.css';

const requireCard = require.context('.', true, /\.doc\.js$/);
const paths = requireCard.keys();
paths.sort((a, b) => a.localeCompare(b));
paths.forEach(requireCard);

const components = paths.map(path => path.match(/\.\/(.+)\.doc\.js$/)[1]);

const connect = (state, Component) => props => (
  <Component {...state} {...props} />
);

const cards = getCards();
const ConnectedCardPage = connect({ cards }, CardPage);

const routes = (
  <Route component={App} path="/">
    <IndexRoute component={ConnectedCardPage} />
    {components.map(component => (
      <Route
        component={ConnectedCardPage}
        path={`/${component}`}
        key={component}
      />
    ))}
  </Route>
);

const node = document.createElement('DIV');
document.body.appendChild(node);

render(<Router history={hashHistory}>{routes}</Router>, node);
