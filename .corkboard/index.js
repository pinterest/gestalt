import 'corkboard/init';
import React from 'react';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import App from './App';
import CardPage from './CardPage';
import { render } from 'react-dom';
import { getCards } from 'corkboard/init';

const requireCard = require.context('../src', true, /[\-\.]doc\.js$/);
const paths = requireCard.keys();
paths.sort((a, b) => a.localeCompare(b));
paths.forEach(requireCard);

const connect = (state, Component) => props => (
  <Component {...state} {...props} />
);

const cards = getCards();

const ConnectedApp = connect({ cards }, App);
const ConnectedCardPage = connect({ cards }, CardPage);

const routes = (
  <Route component={ConnectedApp} path="/">
    <IndexRoute component={ConnectedCardPage} />
    <Route component={ConnectedCardPage} path="/:ns" />
  </Route>
);

const node = document.createElement('DIV');
document.body.appendChild(node);

render(<Router history={hashHistory}>{routes}</Router>, node);
