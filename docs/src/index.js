// @flow strict
import { StrictMode } from 'react';
import { render } from 'react-dom';
import AppWrapper from './AppWrapper.js';

const container = document.getElementById('root');

if (container instanceof Element) {
  render(
    <StrictMode>
      <AppWrapper />
    </StrictMode>,
    container,
  );
} else {
  throw new Error("No element with id 'root' found in index.html file");
}
