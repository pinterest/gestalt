// @flow strict
import path from 'path';
import { promises as fs } from 'fs';
import matter from 'gray-matter';
import logGAEvent from './gAnalytics.js';

export async function getDocByRoute(route: string): Promise<{|
  content?: string,
  meta: { [key: string]: string },
  route: string,
  isMDX: boolean,
|}> {
  const docsDirectory = path.join(process.cwd(), 'markdown');
  const fullPath = path.join(docsDirectory, `${route}.md`);

  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');

    // matter is the library used to parse the frontmatter from the md files
    // it breaks the data into { data: {title:'foo'}, content: '<HTML Markdown>' }

    const { data, content } = matter(fileContents);

    return { route, meta: data, content, isMDX: true };
  } catch (ex) {
    logGAEvent('md-page-not-found', { route, 'error': ex.message });
    return { route, isMDX: false, meta: {} };
  }
}

export async function getAllMarkdownPosts(): Promise<Array<string>> {
  const docsDirectory = path.join(process.cwd(), 'markdown');

  const fileContents = await fs.readdir(docsDirectory);
  const cleanedNames = fileContents.map((name) => name.replace('.md', ''));

  return cleanedNames;
}
