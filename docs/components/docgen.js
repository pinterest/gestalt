// @flow strict
import metadata from './metadata.json';

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
      |},
    |},
  |},
|};

export default async function docgen({
  componentName,
}: {|
  componentName: string,
|}): Promise<DocGen> {
  return metadata[componentName];
}

export async function multipledocgen({
  componentName,
}: {|
  componentName: Array<string> | string,
|}): Promise<{| [string]: DocGen |}> {
  return Array.isArray(componentName)
    ? componentName.reduce(
        (prevValue, currentValue) => ({ ...prevValue, [currentValue]: metadata[currentValue] }),
        {},
      )
    : metadata[componentName];
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
