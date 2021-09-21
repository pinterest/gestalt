// @flow strict
import { parse } from 'react-docgen';
import path from 'path';
import fs from 'fs';
import nextConfig from 'next/config';

export type DocGenProps = {|
  [key: string]: {|
    defaultValue: ?{|
      value: string,
      computed: boolean,
    |},
    required: boolean,
    description: string,
    flowType: {|
      raw?: string,
      name: string,
    |},
  |},
|};

export type DocGen = {|
  description: string,
  displayName: string,
  methods: $ReadOnlyArray<string>,
  props: DocGenProps,
|};

export default async function docgen(component: string): Promise<DocGen> {
  const filePath = path.join(
    nextConfig().serverRuntimeConfig.GESTALT_ROOT,
    `/packages/gestalt/src/${component}.js`,
  );
  const contents = await fs.promises.readFile(filePath, 'utf-8');
  const parsed = parse(contents);

  if (parsed.description) {
    parsed.description = parsed.description
      // Remove the first markdown link from the description so we don't link to the page itself
      .replace(/\[(.*?)\][[(].*?[\])]/, '$1')
      // Remove images from the description
      .replace(/!\[(.*?)\][[(].*?[\])]/g, '');
  }

  return parsed;
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
