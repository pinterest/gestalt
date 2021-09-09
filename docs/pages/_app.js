// @flow strict
import { type Node } from 'react';
import '../docs.css';
import 'gestalt/dist/gestalt.css';
import 'gestalt-datepicker/dist/gestalt-datepicker.css';
import { useRouter } from 'next/router';
import { Box } from 'gestalt';
import App from '../components/App.js';

// This default export is required in a new `pages/_app.js` file.
export default function GestaltApp(
  // $FlowFixMe[signature-verification-failure]
  { Component, pageProps }, // eslint-disable-line react/prop-types
): Node {
  const router = useRouter();

  // Hide navigation / sidebar for visual tests
  if (router.pathname.startsWith('/visual-test/')) {
    return (
      <Box data-test-id="visual-test" display="inlineBlock">
        <Component {...pageProps} />
      </Box>
    );
  }

  return (
    <App>
      <Component {...pageProps} />
    </App>
  );
}
