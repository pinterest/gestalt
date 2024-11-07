import {createClient} from '@sanity/client'
import {Post, Slug} from 'sanity-gestalt-docs'

// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
    projectId: 'k05lbr97',
    dataset: 'docs',
    apiVersion: new Date().toISOString().slice(0, 10),
    token: process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET || '', // or leave blank for unauthenticated usage
    useCdn: false, // `false` if you want to ensure fresh data
})

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getSanityRoutes(): Promise<ReadonlyArray<ReadonlyArray<string>>> {
  const slugs = await client.fetch<{slug:Slug|null}[]>('*[_type == "post"] {slug{current}}');
  const validSlugs = slugs.filter((slug) => slug.slug !== null);
  const routes = validSlugs.map((s) => s.slug!.current?.split('/')||[]);
  return routes;
}

export async function createPost(post: Post ) {
  const result = client.create(post);
  return result
}

export async function updateDocumentTitle(_id:string, title:string) {
  const result = client.patch(_id).set({title})
  return result
}