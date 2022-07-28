// @flow strict
import { type Node, type ComponentType } from 'react';
import { type DocGen } from './docgen.js';
import PropTable from './PropTable.js';

function getTypeOverrideValue(description?: string): {|
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
function getDefaultValue(description?: string): {|
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
function getHref(description?: string): {|
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
  Component,
  id,
  name,
  generatedDocGen,
  excludeProps = [],
}: {|
  Component?: ComponentType<any>, // flowlint-line unclear-type:off
  name?: string,
  id?: string,
  generatedDocGen: DocGen,
  excludeProps?: $ReadOnlyArray<string>,
|}): Node {
  // Using Object.keys because of https://github.com/facebook/flow/issues/2174
  const props = Object.keys(generatedDocGen.props)
    .map((key: string) => {
      const { flowType, description, required, defaultValue } = generatedDocGen.props[key];

      // Filter out "_fooInternalProp" internal props that we don't want to document
      if (key.startsWith('_')) {
        return null;
      }

      // Filter out PropType only types & excluded props
      if (!flowType || excludeProps.includes(key)) {
        return null;
      }

      // Remove domain so local development (localhost) isn't broken
      const descriptionWithoutDomain = description?.replace(
        /https:\/\/gestalt\.pinterest\.systems/g,
        '',
      );

      // Parse out older-style links
      const { description: descriptionWithoutLink, href } = getHref(descriptionWithoutDomain);

      // Parse out default value override
      const { description: descriptionWithoutDefault, defaultValue: defaultValueOverride } =
        getDefaultValue(descriptionWithoutLink);

      const { description: descriptionWithoutTypeOverride, typeOverride } =
        getTypeOverrideValue(descriptionWithoutDefault);

      // Trim leading `|`
      const transformedType = (
        flowType.raw?.replace(/^\|/, '').trim() ??
        flowType?.value ??
        flowType.name ??
        ''
      )
        // Replace "Node" with "React.Node" to match docs convention
        .replace(/Node/g, 'React.Node')
        // Replace "ComponentType" with "React.ComponentType" to match docs convention
        .replace(/ComponentType/g, 'React.ComponentType')
        // Replace "Element" with "React.Element" to match docs convention
        // Includes `<` to avoid picking up `HTMLDivElement` and similar
        .replace(/^Element</g, 'React.Element<')
        // Replace "Ref" with "React.Ref" to match docs convention
        // Includes `<` to avoid picking up `HTMLDivElement` and similar
        .replace(/Ref</g, 'React.Ref<');

      return {
        name: key,
        type: typeOverride ?? transformedType,
        description: descriptionWithoutTypeOverride?.trim(),
        required,
        defaultValue: defaultValueOverride ?? defaultValue?.value?.replace(/'/g, ''),
        nullable: flowType?.nullable || false,
        href,
      };
    })
    .filter(Boolean);

  return <PropTable Component={Component} name={name} id={id} props={props} />;
}
