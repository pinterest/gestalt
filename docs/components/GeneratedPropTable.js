// @flow strict
import { type Node } from 'react';
import { type DocGen } from './docgen.js';
import PropTable from './PropTable.js';

function getTypeOverrideValue(
  description?: string,
): {|
  description?: string,
  typeOverride?: string,
|} {
  const input = description ?? '';
  const match = input.match(/(?<main>Type: (?<typeOverride>.*))/);
  const groups = match?.groups ?? {};

  return {
    description: groups.main ? input.replace(groups.main, '') : description,
    typeOverride: groups.typeOverride?.replace(/'/g, ''),
  };
}

// Provide a default value where the actual one can't be parsed, e.g. Box
function getDefaultValue(
  description?: string,
): {|
  description?: string,
  defaultValue?: string,
|} {
  const input = description ?? '';
  const match = input.match(/(?<main>Default: (?<defaultValue>.*))/);
  const groups = match?.groups ?? {};

  return {
    description: groups.main ? input.replace(groups.main, '') : description,
    defaultValue: groups.defaultValue?.replace(/'/g, ''),
  };
}

// Support the older-style links in props, where the prop name is a link
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

      // Remove domain so local development (localhost) isn't broken
      const descriptionWithoutDomain = description?.replace(
        /https:\/\/gestalt\.pinterest\.systems/,
        '',
      );

      // Parse out older-style links
      const { description: descriptionWithoutLink, href } = getHref(descriptionWithoutDomain);

      // Parse out default value override
      const {
        description: descriptionWithoutDefault,
        defaultValue: defaultValueOverride,
      } = getDefaultValue(descriptionWithoutLink);

      const { description: descriptionWithoutTypeOverride, typeOverride } = getTypeOverrideValue(
        descriptionWithoutDefault,
      );

      // Replace "Node" with "React.Node" to match docs convention
      const transformedType = (
        flowType.raw?.replace(/^\|/, '').trim() ??
        flowType.name ??
        ''
      ).replace(/Node/g, 'React.Node');

      return {
        name: key,
        type: typeOverride ?? transformedType,
        description: descriptionWithoutTypeOverride?.trim(),
        required,
        defaultValue: defaultValueOverride ?? defaultValue?.value?.replace(/'/g, ''),
        href,
      };
    })
    .filter(Boolean);

  return <PropTable props={props} />;
}
