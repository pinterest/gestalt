// @flow strict
import { MDXRemote } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

import { getDocByRoute, getAllMarkdownPosts } from '../utils/mdHelper.js';
import MarkdownPage from '../components/MarkdownPage.js';

type Props = {|
  content: MDXRemoteSerializeResult<Record<string, unknown>>,
  meta: {|
    title: string,
    badge: 'pilot' | 'deprecated',
    component?: boolean,
    description: string,
  |},
  pageSourceUrl: string,
|};

export default function DocumentPage({ content, meta, pageSourceUrl }: Props): Node {
  return (
    <MarkdownPage meta={meta} pageSourceUrl={pageSourceUrl}>
      <MDXRemote {...content} />
    </MarkdownPage>
  );
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const { meta, content } = getDocByRoute(id);
  const mdxSource = await serialize(content);

  return {
    props: {
      meta,
      content: mdxSource,
      pageSourceUrl: `https://github.com/pinterest/gestalt/tree/master/docs/pages/markdown/${id}.md`,
    },
  };
}

export async function getStaticPaths() {
  // get the paths that exist
  const paths = getAllMarkdownPosts();
  return {
    paths: paths.map((name) => ({
      params: {
        id: name,
      },
    })),

    fallback: false, // show 404 if not a valid path }
  };
}
