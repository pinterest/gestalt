// @flow strict
import type { Node } from 'react';
import type { DocGen } from './docgen.js';

import PropTable from './PropTable.js';

function getHref(
  description?: string,
): {|
  description?: string,
  href?: string,
|} {
  const input = description ?? '';
  const match = input.match(/(?<main>Link: (?<href>.*))/);
  const groups = match?.groups ?? {};

  return {
    description: groups.main ? input.replace(groups.main, '') : description,
    href: groups.href ? [...groups.href.split('#')].pop() : undefined,
  };
}

export default function GeneratedPropTable({
  generatedDocGen,
  excludeProps = [],
}: {|
  generatedDocGen: DocGen,
  excludeProps?: $ReadOnlyArray<string>,
|}): Node {
  // Using Object.keys because of https://github.com/facebook/flow/issues/2174
  const props = Object.keys(generatedDocGen.props)
    .map((key: string) => {
      const { flowType, description, required, defaultValue } = generatedDocGen.props[key];

      // Filter out PropType only types & excluded props
      if (!flowType || excludeProps.includes(key)) {
        return null;
      }
      const { description: descriptionWihoutLink, href } = getHref(
        description?.replace(/https:\/\/gestalt\.pinterest\.systems/, ''),
      );

      return {
        name: key,
        type: (flowType.raw?.replace(/^\|/, '').trim() ?? flowType.name ?? '').replace(
          /Node/g,
          'React.Node',
        ),
        description: descriptionWihoutLink?.trim(),
        required,
        defaultValue: defaultValue?.value?.replace(/'/g, ''),
        href,
      };
    })
    .filter(Boolean);

  return <PropTable props={props} />;
}
