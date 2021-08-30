// @flow strict
import type { Node } from 'react';
import type { DocGen } from './docgen.js';

import PropTable from './PropTable.js';

function getDefaultValue(
  description?: string,
): {|
  description?: string,
  defaultValue?: string,
|} {
  const input = description ?? '';
  const match = input.match(/(?<main>Default: '(?<defaultValue>.*)')/);
  const groups = match?.groups ?? {};

  return {
    description: groups.main ? input.replace(groups.main, '') : description,
    defaultValue: groups.defaultValue ?? null,
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
      const { flowType, description, required } = generatedDocGen.props[key];

      // Filter out PropType only types & excluded props
      if (!flowType || excludeProps.includes(key)) {
        return null;
      }

      const { description: descriptionWithoutDefaultValue = '', defaultValue } = getDefaultValue(
        description,
      );

      return {
        name: key,
        type: (flowType.raw ?? flowType.name ?? '').replace(/Node/g, 'React.Node'),
        description: descriptionWithoutDefaultValue.replace(
          /https:\/\/gestalt\.pinterest\.systems/,
          '',
        ),
        required,
        defaultValue,
      };
    })
    .filter(Boolean);

  return <PropTable props={props} />;
}
