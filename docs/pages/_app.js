// @flow strict
import { type Node } from 'react';
import '../docs.css';
import 'gestalt/dist/gestalt.css';
import 'gestalt-datepicker/dist/gestalt-datepicker.css';

// This default export is required in a new `pages/_app.js` file.
export default function GestaltApp(
  // $FlowFixMe[signature-verification-failure]
  { Component, pageProps }, // eslint-disable-line react/prop-types
): Node {
  return <Component {...pageProps} />;
}
