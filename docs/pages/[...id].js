/*
pages/[id].js renders a dynamic gestalt docs page with a with a page that isn't defined .

The getStaticPaths() will look at the files in the ./markdown folder and try to render a page if it exists, or returns a 404.

We do this so we don't have to define each page, and can just define the pages in the markdown folder.
*/

// @flow strict
import { type Node } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import ErrorBoundary from '../docs-components/ErrorBoundary.js';
import MarkdownPage from '../docs-components/MarkdownPage.js';
import { getAllMarkdownPosts, getDocByRoute } from '../utils/mdHelper.js';

type MDXRemoteSerializeResult = {|
  compiledSource: string,

  frontmatter?: { [key: string]: string },
|};

type Props = {|
  content: MDXRemoteSerializeResult,
  meta: {|
    title: string,
    badge: 'pilot' | 'deprecated',
    fullwidth?: boolean,
    description: string,
    component: boolean,
  |},
  pageSourceUrl: string,
|};

export default function DocumentPage({ content, meta, pageSourceUrl }: Props): Node {
  return (
    <ErrorBoundary>
      <MarkdownPage meta={meta} pageSourceUrl={pageSourceUrl}>
        <MDXRemote {...content} />
      </MarkdownPage>
    </ErrorBoundary>
  );
}

export async function getStaticProps(context: {|
  params: {| id: $ReadOnlyArray<string> |},
|}): Promise<{|
  props: {|
    meta: { [key: string]: string },
    content: {||},
    pageSourceUrl: string,
  |},
|}> {
  const { id } = context.params;

  const pathName = id.join('/');
  const { meta, content } = await getDocByRoute(pathName);

  const mdxSource = await serialize(content, {
    mdxOptions: { remarkPlugins: [remarkGfm, remarkBreaks], format: 'mdx' },
  });

  return {
    props: {
      meta,
      content: mdxSource,
      pageSourceUrl: `https://github.com/pinterest/gestalt/tree/master/docs/markdown/${pathName}.md`,
    },
  };
}

export async function getStaticPaths(): Promise<{|
  paths: $ReadOnlyArray<{|
    params: {| id: string | $ReadOnlyArray<string> |},
  |}>,
  fallback: boolean,
|}> {
  // get all the possible paths that exist within ./markdown folder
  const paths = await getAllMarkdownPosts();

  return {
    paths: paths.map((name) => ({
      params: {
        id: name,
      },
    })),

    fallback: false, // show 404 if not a valid path }
  };
}
