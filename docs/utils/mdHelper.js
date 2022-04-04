// @flow strict
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

export function getDocByRoute(route: string) {
  const docsDirectory = path.join(process.cwd(), 'markdown');
  const fullPath = path.join(docsDirectory, `${route}.md`);

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return { route, meta: data, content, isMDX: true };
  } catch (ex) {
    return { route, isMDX: false };
  }
}

export function getAllMarkdownPosts() {
  const docsDirectory = path.join(process.cwd(), 'markdown');
  // requiring fs here as a dynamic import

  const fileContents = fs.readdirSync(docsDirectory);
  const cleanedNames = fileContents.map((name) => name.replace('.md', ''));

  return cleanedNames;
}
