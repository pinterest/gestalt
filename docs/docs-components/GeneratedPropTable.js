// @flow strict
import { type Node } from 'react';
import { type DocGen } from './docgen.js';
import PropTable from './PropTable.js';

// Note if the prop has responsive versions (e.g. margin, smMargin, mdMargin, lgMargin)
function getResponsive(description?: string): {
  description?: string,
  responsive?: boolean,
  ...
} {
  const input = description ?? '';
  const match = input.match(/(?<main>Responsive: (?<responsive>.*))/);
  const groups = match?.groups ?? {};

  return {
    description: groups.main ? input.replace(groups.main, '') : description,
    ...(groups.responsive ? { responsive: Boolean(groups.responsive?.replace(/'/g, '')) } : {}),
  };
}

// Provide a different type to display when needed
function getTypeOverrideValue(description?: string): {
  description?: string,
  typeOverride?: string,
  ...
} {
  const input = description ?? '';
  const match = input.match(/(?<main>Type: (?<typeOverride>.*))/);
  const groups = match?.groups ?? {};

  return {
    description: groups.main ? input.replace(groups.main, '') : description,
    ...(groups.typeOverride ? { typeOverride: groups.typeOverride?.replace(/'/g, '') } : {}),
  };
}

// Provide a default value where the actual one can't be parsed, e.g. Box
function getDefaultValue(description?: string): {
  description?: string,
  defaultValue?: string,
  ...
} {
  const input = description ?? '';
  const match = input.match(/(?<main>Default: (?<defaultValue>.*))/);
  const groups = match?.groups ?? {};

  return {
    description: groups.main ? input.replace(groups.main, '') : description,
    ...(groups.defaultValue ? { defaultValue: groups.defaultValue?.replace(/'/g, '') } : {}),
  };
}

function removeDomain(description: string) {
  return { description: description?.replace(/https:\/\/gestalt\.pinterest\.systems/g, '') };
}

type Props = {|
  excludeProps?: $ReadOnlyArray<string>,
  generatedDocGen: DocGen,
  id?: string,
  name?: string,
|};

export default function GeneratedPropTable({
  excludeProps = [],
  generatedDocGen,
  id,
  name,
}: Props): Node {
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

      const { description: descriptionWithoutOverrides, ...overrides } = [
        removeDomain,
        getDefaultValue,
        getTypeOverrideValue,
        getResponsive,
      ].reduce(
        (acc, cur) => ({
          ...acc,
          ...cur(acc.description),
        }),
        { description: description ?? '' },
      );

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
        .replace(/Element</g, 'React.Element<')
        // Replace "Ref" with "React.Ref" to match docs convention
        // Includes `<` to avoid picking up `HTMLDivElement` and similar
        .replace(/Ref</g, 'React.Ref<');
      // $FlowFixMe[cannot-spread-inexact]
      return {
        name: key,
        type: transformedType,
        description: descriptionWithoutOverrides?.trim(),
        required,
        defaultValue: defaultValue?.value?.replace(/'/g, ''),
        nullable: flowType?.nullable || false,
        ...overrides,
      };
    })
    .filter(Boolean);

  return (
    <PropTable componentName={generatedDocGen.displayName} name={name} id={id} props={props} />
  );
}
