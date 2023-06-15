// @flow strict
import { type Node } from 'react';
import { getSandpackCssText } from '@codesandbox/sandpack-react';
import Document, { type DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import Cookies from 'universal-cookie';

class GestaltDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<{||}> {
    const initialProps = await Document.getInitialProps(ctx);

    const cookieHeader = ctx?.req?.headers?.cookie;
    if (cookieHeader) {
      return { ...initialProps, cookieHeader };
    }

    return { ...initialProps };
  }

  render(): Node {
    const { props } = this;
    const cookies = new Cookies(props.cookieHeader);
    const dir = cookies.cookies['gestalt-text-direction'];

    return (
      <Html lang="en" dir={dir}>
        <Head>
          <meta name="p:domain_verify" content="752e3976762ef39258186e60a40bbe5a" />
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
          <link
            rel="icon"
            href={
              process.env.NODE_ENV === 'development'
                ? '/gestaltDev_favicon.png'
                : '/gestalt_favicon.png'
            }
          />
          {/* eslint-disable-next-line react/no-danger */}
          <style dangerouslySetInnerHTML={{ __html: getSandpackCssText() }} id="sandpack" />
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
