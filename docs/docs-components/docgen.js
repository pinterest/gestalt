// @flow strict
import metadata from './metadata.js';

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

export type DocType = {|
  generatedDocGen: DocGen,
|};

export default function docgen({ componentName }: {| componentName: string |}): DocGen {
  return metadata[componentName];
}

export function multipledocgen({
  componentName,
  opts,
}: {|
  componentName: $ReadOnlyArray<string> | string,
  opts?: {| flattenProps?: boolean |},
|}): {|
  [string]: DocGen,
|} {
  const allComponents = Array.isArray(componentName)
    ? componentName.reduce(
        (prevValue: { [string]: DocGen }, currentComponentName: string) => ({
          ...prevValue,
          [currentComponentName]: docgen({ componentName: currentComponentName }),
        }),
        {},
      )
    : metadata[componentName];

  if (opts && opts.flattenProps) {
    let updatedProps = {};
    Object.keys(allComponents).forEach((key) => {
      const { props } = allComponents[key];
      updatedProps = { ...props, ...updatedProps };
    });
    allComponents[componentName[0]].props = updatedProps;
    return allComponents[componentName[0]];
  }

  return allComponents;
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
