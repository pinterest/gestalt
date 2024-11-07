import {createClient} from '@sanity/client'
import {Post} from 'sanity-gestalt-docs'

// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
    projectId: 'gbh5chyk',
    dataset: 'production',
    apiVersion: new Date().toISOString().slice(0, 10),
    token: process.env.NEXT_PUBLIC_SANITY_PREVIEW_SECRET, // or leave blank for unauthenticated usage
    useCdn: false, // `false` if you want to ensure fresh data
})

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getPosts() {
  const posts = await client.fetch('*[_type == "post"]')
  return posts
}

export async function createPost(post: Post ) {
  const result = client.create(post);
  return result
}

export async function updateDocumentTitle(_id:string, title:string) {
  const result = client.patch(_id).set({title})
  return result
}