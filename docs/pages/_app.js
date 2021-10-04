// @flow strict
import { type Node, Fragment } from 'react';
import '../docs.css';
import 'gestalt/dist/gestalt.css';
import 'gestalt-datepicker/dist/gestalt-datepicker.css';
import { useRouter } from 'next/router';
import { Box } from 'gestalt';
import Script from 'next/script';
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
    <Fragment>
      <Script
        strategy="lazyOnload"
        src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
      />
      <Script id="docsearch" strategy="afterInteractive">
        {`
if (typeof window !== 'undefined' && !window.docsearch) {
  window.docsearch({
    apiKey: 'a22bd809b2fb174c5defd3c0f44cab8c',
    debug: false, // Set debug to true if you want to keep open and inspect the dropdown
    indexName: 'gestalt',
    inputSelector: '#algolia-doc-search',
  });
}
        `}
      </Script>

      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=UA-12967896-44"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-12967896-44');
        `}
      </Script>
      <App>
        <Component {...pageProps} />
      </App>
    </Fragment>
  );
}
