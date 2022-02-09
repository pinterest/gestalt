// @flow strict

import { parse } from 'react-docgen';
import path from 'path';
import fs from 'fs';
import nextConfig from 'next/config';

export type DocGen = {|
  description: string,
  displayName: string,
  methods: $ReadOnlyArray<string>,
  props: {|
    [key: string]: {|
      defaultValue: ?{|
        value: string,
        computed: boolean,
      |},
      required: boolean,
      description: string,
      flowType: {|
        raw?: string,
        nullable?: boolean,
        name: string,
        value?: string,
      |},
    |},
  |},
|};

const getFilePath = (componentName: string, alternativeSubdirectory?: string): string =>
  path.join(
    nextConfig().serverRuntimeConfig.GESTALT_ROOT,
    alternativeSubdirectory || `/packages/gestalt/src/${componentName}.js`,
  );

const getParsedContent = (contents): DocGen => {
  const parsed = parse(contents);

  if (parsed.description) {
    parsed.description = parsed.description
      // Remove the first markdown link from the description so we don't link to the page itself
      .replace(/\[(.*?)\][[(].*?[\])]/, '$1')
      // Remove images from the description
      .replace(/!\[(.*?)\][[(].*?[\])]/g, '');
  }
  return parsed;
};

export default async function docgen({
  componentName,
  alternativeSubdirectory = '',
}: {|
  componentName: string,
  alternativeSubdirectory?: string,
|}): Promise<DocGen> {
  const filePath = getFilePath(componentName, alternativeSubdirectory);
  const contents = await fs.promises.readFile(filePath, 'utf-8');
  return getParsedContent(contents);
}

export async function multipledocgen({
  componentName,
  alternativeSubdirectory = '',
}: {|
  componentName: Array<string> | string,
  alternativeSubdirectory?: string,
|}): Promise<{| [string]: DocGen |}> {
  const docGenMap = {};
  await Promise.all(
    (Array.isArray(componentName) ? componentName : [componentName]).map(async (cmp) => {
      const filePath = getFilePath(cmp, alternativeSubdirectory);
      const contents = await fs.promises.readFile(filePath, 'utf-8');
      docGenMap[cmp] = getParsedContent(contents);
      return cmp;
    }),
  );

  return docGenMap;
}

export function overrideTypes(docGen: DocGen, typeOverrides: {| [string]: string |}): DocGen {
  Object.keys(typeOverrides).forEach((key) => {
    if (docGen?.props?.[key]) {
      // eslint-disable-next-line no-param-reassign
      docGen.props[key].flowType = {
        name: 'union',
        raw: typeOverrides[key],
      };
    }
  });
  return docGen;
}
