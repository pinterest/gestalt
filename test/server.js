import React from 'react';
import ReactDOMServer from 'react-dom/server';
import RenderConfig from './utils/renderConfig';
import { readFileSync } from 'fs';

const express = require('express');

const app = express();

app.use(express.static('views'));

app.get('/__ping', (req, res) => res.send(''));

app.get('/styles.css', (req, res) =>
  res.send(readFileSync(require.resolve('gestalt/dist/gestalt.css')))
);

app.get('/:name', (req, res) => {
  const componentName = req.params.name || 'Masonry';
  if (!Object.prototype.hasOwnProperty.call(RenderConfig, componentName)) {
    return;
  }

  const { Component, styles = '', props: extra = {} } = RenderConfig[
    componentName
  ];

  const props = { ...extra, ...req.query };
  const serverHtml = ReactDOMServer.renderToString(<Component {...props} />);
  const renderProps = JSON.stringify(props);
  const data = { componentName, styles, serverHtml, renderProps };
  res.render('index.ejs', data);
});

app.listen(3001, () => {
  // console.log('Example app listening on port 3001!');
});
