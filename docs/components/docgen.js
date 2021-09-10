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
        name: string,
      |},
    |},
  |},
|};

export default async function docgen(component: string): Promise<DocGen> {
  const filePath = path.join(
    nextConfig().serverRuntimeConfig.GESTALT_ROOT,
    `/packages/gestalt/src/${component}.js`,
  );
  const contents = await fs.promises.readFile(filePath, 'utf-8');
  return parse(contents);
}
