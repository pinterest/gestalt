// @flow strict
import * as React from 'react';
import '../src/reset.css';
import 'gestalt/dist/gestalt-future.css';
import 'gestalt-datepicker/dist/gestalt-datepicker.css';
import '../components/Markdown.css';
import '../components/DocSearch.css';
import App from '../components/App.js';

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <App>
        <Component {...pageProps} />
      </App>
    </React.StrictMode>
  );
}
