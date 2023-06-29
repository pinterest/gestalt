// @flow strict
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import logGAEvent from './gAnalytics.js';
import siteIndex, { type siteIndexType } from '../docs-components/siteIndex.js';

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

export async function getAllMarkdownPosts(): Promise<$ReadOnlyArray<$ReadOnlyArray<string>>> {
  function convertNamesForURL(name: string): string {
    return name.replace(/ /g, '_').replace(/'/g, '').toLowerCase();
  }

  const docsDirectory = path.join(process.cwd(), 'markdown');

  const getAllSitePaths = () => {
    const pagePaths = [];

    const addUrlPaths = (
      pageItems: $ReadOnlyArray<siteIndexType | string>,
      pages: $ReadOnlyArray<string>,
    ) => {
      // for each choice
      pageItems.forEach((page) => {
        if (typeof page !== 'string') {
          const siteIndexSection = page;
          addUrlPaths(siteIndexSection.pages, pages.concat([siteIndexSection.sectionName]));
        }
        // No section name exists, so it's a string
        else {
          pagePaths.push(pages.concat([page]));
        }
      });
    };

    siteIndex.forEach((section) => {
      const startPath = [section.sectionName];
      addUrlPaths(section.pages, startPath);
    });

    return pagePaths;
  };

  const pagePaths = getAllSitePaths();

  const checkIfPathExists = async (pagePath: $ReadOnlyArray<string>) => {
    const pathName = pagePath.join('/');

    try {
      await fs.stat(path.join(docsDirectory, `${convertNamesForURL(pathName)}.md`));
      return pagePath.map((name) => convertNamesForURL(name));
    } catch (ex) {
      // do nothing, a markdown page doesn't exist
      return [];
    }
  };

  // $FlowFixMe[incompatible-call]
  const pathResults = await Promise.all(pagePaths.map((pagePath) => checkIfPathExists(pagePath)));

  const validMarkdownPages = pathResults.filter((p) => p.length > 0);
  return validMarkdownPages;
}
