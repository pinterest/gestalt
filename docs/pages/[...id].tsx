/*
pages/[id].tsx renders a dynamic gestalt docs page with a with a page that isn't defined .

The getStaticPaths() will look at the files in the ./markdown folder and try to render a page if it exists, or returns a 404.

We do this so we don't have to define each page, and can just define the pages in the markdown folder.
*/

import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { Text } from 'gestalt';
import ErrorBoundary from '../docs-components/ErrorBoundary';
import MarkdownPage from '../docs-components/MarkdownPage';
import { getAllMarkdownPosts, getDocByRoute } from '../utils/mdHelper';
import { getPostBySlug, getSanityRoutes } from '../utils/sanity';

function getPlatform(pathName: string): 'android' | 'ios' | 'web' {
  if (pathName.startsWith('android')) return 'android';
  if (pathName.startsWith('ios')) return 'ios';
  return 'web';
}

type MDXRemoteSerializeResult = {
  compiledSource: string;
  frontmatter?: {
    [key: string]: string;
  };
};

type Props = {
  content: MDXRemoteSerializeResult;
  meta: {
    title: string;
    badge: 'pilot' | 'deprecated';
    fullwidth?: boolean;
    description: string;
    component: boolean;
  };
  pageSourceUrl: string;
  platform: 'android' | 'ios' | 'web';
};

export default function DocumentPage({ content, meta, pageSourceUrl, platform }: Props) {
  return (
    <ErrorBoundary>
      <MarkdownPage meta={meta} pageSourceUrl={pageSourceUrl} platform={platform}>
        <MDXRemote {...content} />
      </MarkdownPage>
    </ErrorBoundary>
  );
}

export async function getStaticProps(context: {
  params: {
    id: ReadonlyArray<string>;
  };
  preview?: boolean;
  previewData?: {
    [key: string]: string;
  };
}): Promise<{
  props?: {
    sanity?: boolean;
    meta: {
      [key: string]: string;
    };
    content: Record<any, any>;
    pageSourceUrl: string;
    platform: 'android' | 'ios' | 'web';
  };
  notFound?: boolean;
}> {
  const { id } = context.params;

  if (context.preview) {
    console.log('In Preview Mode.. Fetching the latest draft from Sanity....');
  }

  const pathName = id.join('/');

  const { meta, content, isMDX } = await getDocByRoute(pathName, context.preview);

  if (!isMDX) {
    return {
      notFound: true,
    };
  }

  console.log(content);

  // @ts-expect-error - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  const mdxSource = await serialize(content, {
    mdxOptions: { remarkPlugins: [remarkGfm, remarkBreaks], format: 'mdx' },
  });

  return {
    props: {
      meta,
      // if it's preview mode, (pass in the raw data from GetserverSideProps...) also pass the raw content to be rendered.. the client side will handle the rendering
      content: mdxSource,
      pageSourceUrl: `https://github.com/pinterest/gestalt/tree/master/docs/markdown/${pathName}.md`,
      platform: getPlatform(pathName),
    },
  };
}

export async function getStaticPaths(): Promise<{
  paths: ReadonlyArray<{
    params: {
      id: string | ReadonlyArray<string>;
    };
  }>;
  fallback: boolean | 'blocking';
}> {
  const sanityRoutes = await getSanityRoutes();
  console.log('paths', sanityRoutes);

  // get all the possible paths that exist within ./markdown folder
  const paths = await getAllMarkdownPosts();

  return {
    paths: sanityRoutes.map((name) => ({
      params: {
        id: name,
      },
    })),

    fallback: 'blocking', // show 404 if not a valid path }
  };
}
