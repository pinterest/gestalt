/*
pages/[id].tsx renders a dynamic gestalt docs page with a with a page that isn't defined .

The getStaticPaths() will look at the files in the ./markdown folder and try to render a page if it exists, or returns a 404.

We do this so we don't have to define each page, and can just define the pages in the markdown folder.
*/

import {Text} from 'gestalt'
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import ErrorBoundary from '../docs-components/ErrorBoundary';
import MarkdownPage from '../docs-components/MarkdownPage';
import { getAllMarkdownPosts, getDocByRoute } from '../utils/mdHelper';
import {getSanityRoutes } from '../utils/sanity';

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

export default function DocumentPage({ content, meta, pageSourceUrl, platform, sanity }: Props) {
  return (
    <ErrorBoundary>
      {sanity ? <Text>omg we have this page in sanity :)</Text> : 
      <MarkdownPage meta={meta} pageSourceUrl={pageSourceUrl} platform={platform}>
        <MDXRemote {...content} />
      </MarkdownPage>
      }
    </ErrorBoundary>
  );
}

export async function getStaticProps(context: {
  params: {
    id: ReadonlyArray<string>;
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


  if(id.includes('sanity')){
      // if the content is from sanity, we can fetch the content from sanity and set it as the page content
      return {props:{
        sanity: true,
        meta: {},
        content: {},
        pageSourceUrl: '',
        platform: 'android'
      }}
  }

  const pathName = id.join('/');
  const { meta, content, isMDX } = await getDocByRoute(pathName);

  if (!isMDX) {
    return {
      notFound: true,
    };
  }
  // @ts-expect-error - TS2345 - Argument of type 'string | undefined' is not assignable to parameter of type 'string'.
  const mdxSource = await serialize(content, {
    mdxOptions: { remarkPlugins: [remarkGfm, remarkBreaks], format: 'mdx' },
  });

  return {
    props: {
      meta,
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


  // to-do: disable CDN cache on client

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
