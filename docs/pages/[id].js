import ReactDOMServer from 'react-dom/server';
import { getDocByRoute, markdownToHtml, getAllMarkdownPosts } from '../utils/mdHelper';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import MarkdownPage from '../components/MarkdownPage';

export default function DocumentPage({ content, meta, pageSourceUrl }) {
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
      meta: meta,
      content: mdxSource,
      pageSourceUrl: `https://github.com/pinterest/gestalt/tree/master/docs/pages/markdown/${id}.md`,
    },
  };
}

export async function getStaticPaths({ params }) {
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
