// @flow strict
import path from 'path';
import { promises as fs } from 'fs';
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

export async function getAllMarkdownPosts(): Promise<Array<string[]>> {
  function convertNamesForURL(name: string): string {
    return name.replace(/ /g, '_').replace(/'/g, '').toLowerCase();
  }

  const docsDirectory = path.join(process.cwd(), 'markdown');

  const getAllSitePaths = () => {
    const pagePaths = [];

    const addUrlPaths = (pageItems: Array<siteIndexType | string>, _pages: Array<string>) => {
      const pages: Array<string> = _pages.concat([]);

      // for each choice
      pageItems.forEach((page) => {
        if (page.sectionName) {
          // $FlowFixMe: This is a siteIndexType because it has a section name and isn't a string
          const siteIndexSection: siteIndexType = page;
          addUrlPaths(siteIndexSection.pages, pages.concat([siteIndexSection.sectionName]));
        } else {
          // $FlowFixMe: No section name exists. It's a string
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

  const checkIfPathExists = async (pagePath: string[]) => {
    // join the paths
    const pathName = pagePath.join('/');
    // console.log(path.join(docsDirectory, `${convertNamesForURL(pathName)}.md`));

    try {
      await fs.stat(path.join(docsDirectory, `${convertNamesForURL(pathName)}.md`));
      return pagePath.map((name) => convertNamesForURL(name));
    } catch (ex) {
      // do nothing, a markdown page doesn't exist
      // console.log(ex);
      return [];
    }
  };

  const pathResults = await Promise.all(pagePaths.map((pagePath) => checkIfPathExists(pagePath)));

  const validMarkdownPages = pathResults.filter((p) => p.length > 0);
  return validMarkdownPages;
}
