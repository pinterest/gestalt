import { type ReactNode } from 'react';
import { getSandpackCssText } from '@codesandbox/sandpack-react';
import Document, { type DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import Cookies from 'universal-cookie';

class GestaltDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<Record<any, any>> {
    const initialProps = await Document.getInitialProps(ctx);

    const cookieHeader = ctx?.req?.headers?.cookie;
    if (cookieHeader) {
      return { ...initialProps, cookieHeader };
    }

    return { ...initialProps };
  }

  // @ts-expect-error - TS2416 - Property 'render' in type 'GestaltDocument' is not assignable to the same property in base type 'Document<{}>'.
  render(): ReactNode {
    const { props } = this;
    // @ts-expect-error - TS2339 - Property 'cookieHeader' does not exist on type 'Readonly<RenderPageResult & { styles?: Element | ReactElement<any, string | JSXElementConstructor<any>>[] | ReactFragment | undefined; } & HtmlProps>'.
    const cookies = new Cookies(props.cookieHeader);
    // @ts-expect-error - TS2341 - Property 'cookies' is private and only accessible within class 'Cookies'.
    const dir = cookies.cookies['gestalt-text-direction'];

    return (
      <Html dir={dir} lang="en">
        <Head>
          <meta content="752e3976762ef39258186e60a40bbe5a" name="p:domain_verify" />
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script
            src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
            type="text/javascript"
          />
          {/* eslint-disable-next-line @next/next/next-script-for-ga */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-EYTY1WTV8B" />
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: `
window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag('js', new Date());
gtag('config', 'G-EYTY1WTV8B');
`,
            }}
          />
          <link
            href={
              process.env.NODE_ENV === 'development'
                ? '/gestaltDev_favicon.png'
                : '/gestalt_favicon.png'
            }
            rel="icon"
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
