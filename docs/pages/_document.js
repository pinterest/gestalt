// @flow strict
import { type Node } from 'react';
import Cookies from 'universal-cookie';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class GestaltDocument extends Document {
  // $FlowFixMe[signature-verification-failure]
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    const cookieHeader = ctx?.req?.headers?.cookie;
    if (cookieHeader) {
      return { ...initialProps, cookieHeader };
    }

    return { ...initialProps };
  }

  render(): Node {
    const { props } = this;
    // Flow is wrong here https://github.com/reactivestack/cookies/tree/master/packages/universal-cookie
    // $FlowFixMe[invalid-constructor]
    const cookies = new Cookies(props.cookieHeader);
    const dir = cookies.cookies['gestalt-text-direction'];

    return (
      <Html lang="en" dir={dir}>
        <Head>
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script
            type="text/javascript"
            src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
          />
          {/* eslint-disable-next-line @next/next/next-script-for-ga */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-12967896-44" />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'UA-12967896-44');
`,
            }}
          />
          <link rel="icon" href="/pinterest_favicon.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default GestaltDocument;
