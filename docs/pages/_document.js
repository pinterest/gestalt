// @flow strict
import { type Node } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class GestaltDocument extends Document {
  // $FlowFixMe[signature-verification-failure]
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): Node {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/pinterest_favicon.png" />
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
