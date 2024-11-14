import { createClient } from '@sanity/client';
import { Post, Slug } from 'sanity-gestalt-docs';

export const client = createClient({
  projectId: 'k05lbr97',
  dataset: 'docs',
  apiVersion: new Date().toISOString().slice(0, 10),
  token: '', // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
  perspective: 'published',
});

function sanityFetch<T>(query: string, isDraftMode = false): Promise<T> {
  const token = process.env.NEXT_PUBLIC_SANITY_DRAFT_AUTHORIZATION_TOKEN;

  if (isDraftMode && !token) {
    throw new Error(
      'The `NEXT_PUBLIC_SANITY_DRAFT_AUTHORIZATION_TOKEN` environment variable is required.',
    );
  }

  return client.fetch<T>(
    query,
    {},
    {
      token,
      perspective: isDraftMode ? 'previewDrafts' : 'published',
    },
  );
}

// Fetch Sanity Draft Posts when in Preview Mode and populate the post

export async function getPostBySlug(slug: string, isDraftMode = false): Promise<Post | null> {
  const query = `*[_type == "post" && slug.current == "${slug}"][0]`;
  const post = await sanityFetch<Post | null>(query, isDraftMode);
  return post;
}

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getSanityRoutes(): Promise<ReadonlyArray<ReadonlyArray<string>>> {
  const slugs = await client.fetch<{ slug: Slug | null }[]>('*[_type == "post"] {slug{current}}');
  const validSlugs = slugs.filter((slug) => slug.slug !== null);
  const routes = validSlugs.map((s) => s.slug!.current?.split('/') || []);
  return routes;
}

export async function createPost(post: Post) {
  const result = client.create(post);
  return result;
}

export async function updateDocumentTitle(_id: string, title: string) {
  const result = client.patch(_id).set({ title });
  return result;
}
