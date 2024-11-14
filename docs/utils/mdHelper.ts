import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getPostBySlug } from './sanity';
import siteIndex, { siteIndexType } from '../docs-components/siteIndex';

export async function getMarkdownFileContent(route: string): Promise<{
  content?: string;
  meta: {
    [key: string]: string;
  };
  route: string;
  isMDX: boolean;
}> {
  const docsDirectory = path.join(process.cwd(), 'markdown');
  const fullPath = path.join(docsDirectory, `${route}.md`);

  try {
    const fileContents = await fs.readFile(fullPath, 'utf8');

    // matter is the library used to parse the frontmatter from the md files
    // it breaks the data into { data: {title:'foo'}, content: '<HTML Markdown>' }

    const { data, content } = matter(fileContents);

    return { route, meta: data, content, isMDX: true };
  } catch (ex: any) {
    return { route, isMDX: false, meta: {} };
  }
}

export async function getDocByRoute(
  route: string,
  isDraftMode?: boolean,
): Promise<{
  content?: string;
  meta: {
    [key: string]: string;
  };
  route: string;
  isMDX: boolean;
}> {
  // check if the the route is available locally
  const localMarkdownData = await getMarkdownFileContent(route);

  if (localMarkdownData.isMDX) {
    return localMarkdownData;
  }

  const sanityPost = await getPostBySlug(route, isDraftMode);
  if (sanityPost && sanityPost.markdown) {
    console.log('sanityPost', sanityPost);
    // to-do: meta should align with the meta data from the markdown files
    return { route, meta: sanityPost, content: sanityPost.markdown, isMDX: true };
  }
  return { route, meta: {}, isMDX: false };
}

export async function getAllMarkdownPosts(): Promise<ReadonlyArray<ReadonlyArray<string>>> {
  function convertNamesForURL(name: string): string {
    return name.replace(/ /g, '_').replace(/'/g, '').toLowerCase();
  }

  const docsDirectory = path.join(process.cwd(), 'markdown');

  const getAllSitePaths = () => {
    // @ts-expect-error - TS7034 - Variable 'pagePaths' implicitly has type 'any[]' in some locations where its type cannot be determined.
    const pagePaths = [];

    const addUrlPaths = (
      pageItems: ReadonlyArray<siteIndexType | string>,
      pages: ReadonlyArray<string>,
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

    // @ts-expect-error - TS7005 - Variable 'pagePaths' implicitly has an 'any[]' type.
    return pagePaths;
  };

  const pagePaths = getAllSitePaths();

  const checkIfPathExists = async (pagePath: ReadonlyArray<string>) => {
    const pathName = pagePath.join('/');

    try {
      await fs.stat(path.join(docsDirectory, `${convertNamesForURL(pathName)}.md`));
      return pagePath.map((name) => convertNamesForURL(name));
    } catch (ex: any) {
      // do nothing, a markdown page doesn't exist
      return [];
    }
  };

  const pathResults = await Promise.all(pagePaths.map((pagePath) => checkIfPathExists(pagePath)));

  const validMarkdownPages = pathResults.filter((p) => p.length > 0);
  return validMarkdownPages;
}
