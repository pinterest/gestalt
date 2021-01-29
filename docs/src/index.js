// @flow strict
import React from 'react';
import { render } from 'react-dom';
import AppWrapper from './AppWrapper.js';

const container = document.getElementById('root');

if (container instanceof Element) {
  render(
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>,
    container,
  );
} else {
  throw new Error("No element with id 'root' found in index.html file");
}
