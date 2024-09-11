import { DocGen } from './docgen';
import PropTable from './PropTable';

// Note if the prop has responsive versions (e.g. margin, smMargin, mdMargin, lgMargin)
function getResponsive(description?: string): {
  description?: string;
  responsive?: boolean;
} {
  const input = description ?? '';
  // @ts-expect-error - TS1503
  const match = input.match(/(?<main>Responsive: (?<responsive>.*))/);
  const groups = match?.groups ?? {};

  return {
    description: groups.main ? input.replace(groups.main, '') : description,
    ...(groups.responsive ? { responsive: Boolean(groups.responsive?.replace(/'/g, '')) } : {}),
  };
}

// Provide a different type to display when needed
function getTypeOverrideValue(description?: string): {
  description?: string;
  typeOverride?: string;
} {
  const input = description ?? '';
  // @ts-expect-error - TS1503
  const match = input.match(/(?<main>Type: (?<typeOverride>.*))/);
  const groups = match?.groups ?? {};

  return {
    description: groups.main ? input.replace(groups.main, '') : description,
    ...(groups.typeOverride ? { typeOverride: groups.typeOverride?.replace(/'/g, '') } : {}),
  };
}

// Provide a default value where the actual one can't be parsed, e.g. Box
function getDefaultValue(description?: string): {
  description?: string;
  defaultValue?: string;
} {
  const input = description ?? '';
  // @ts-expect-error - TS1503
  const match = input.match(/(?<main>Default: (?<defaultValue>.*))/);
  const groups = match?.groups ?? {};

  return {
    description: groups.main ? input.replace(groups.main, '') : description,
    ...(groups.defaultValue ? { defaultValue: groups.defaultValue?.replace(/'/g, '') } : {}),
  };
}

function removeDomain(description: string) {
  return {
    description: description?.replace(/https:\/\/gestalt\.pinterest\.systems/g, ''),
  };
}

type Props = {
  excludeProps?: ReadonlyArray<string>;
  generatedDocGen: DocGen;
  id?: string;
  name?: string;
};

export default function GeneratedPropTable({
  excludeProps = [],
  generatedDocGen,
  id,
  name,
}: Props) {
  const props = Object.entries(generatedDocGen.props)
    .map(([key, { tsType, description, required, defaultValue }]) => {
      // Filter out "_fooInternalProp" internal props that we don't want to document
      if (key.startsWith('_')) {
        return null;
      }

      // Filter out PropType only types & excluded props
      if (!tsType || excludeProps.includes(key)) {
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
        tsType.raw?.replace(/^\|/, '').trim() ??
        tsType?.value ??
        tsType.name ??
        ''
      )
        // Replace "Node" with "React.Node" to match docs convention
        .replace(/ReactNode/g, 'React.Node')
        // Replace "ComponentType" with "React.ComponentType" to match docs convention
        .replace(/ComponentType/g, 'React.ComponentType')
        // Replace "Element" with "React.Element" to match docs convention
        // Includes `<` to avoid picking up `HTMLDivElement` and similar
        .replace(/Element</g, 'React.Element<')
        // Replace "Ref" with "React.Ref" to match docs convention
        // Includes `<` to avoid picking up `HTMLDivElement` and similar
        .replace(/Ref</g, 'React.Ref<');
      return {
        name: key,
        type: transformedType,
        description: descriptionWithoutOverrides?.trim(),
        required,
        defaultValue: defaultValue?.value?.replace(/'/g, ''),
        nullable: tsType?.nullable || false,
        ...overrides,
      };
    })
    .filter(Boolean);

  return (
    // @ts-expect-error - TS2322 - Type '({ name: string; type: string; description: string; required: boolean; defaultValue: string | undefined; nullable: boolean; } | null)[]' is not assignable to type 'readonly Prop[]'.
    <PropTable componentName={generatedDocGen.displayName} id={id} name={name} props={props} />
  );
}
