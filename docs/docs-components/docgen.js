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

function addSystemProps(docGenArg: DocGen): DocGen {
  return {
    ...docGenArg,
    props: {
      ...docGenArg.props,
      dataTestId: {
        defaultValue: null,
        required: false,
        description:
          'A string that is used as a data attribute `data-test-id` on the underlying element.',
        flowType: {
          name: 'string',
        },
      },
    },
  };
}

export type DocType = {|
  generatedDocGen: DocGen,
|};

export default function docGen(componentName: string): DocGen {
  return addSystemProps(metadata[componentName]);
}

export function multipleDocGen(componentNames: $ReadOnlyArray<string>): {|
  [string]: DocGen,
|} {
  return componentNames.reduce(
    (prevValue: { [string]: DocGen }, currentComponentName: string) => ({
      ...prevValue,
      [currentComponentName]: docGen(currentComponentName),
    }),
    {},
  );
}

export function overrideTypes(docGenArg: DocGen, typeOverrides: {| [string]: string |}): DocGen {
  Object.keys(typeOverrides).forEach((key) => {
    if (docGenArg?.props?.[key]) {
      // eslint-disable-next-line no-param-reassign
      docGenArg.props[key].flowType = {
        name: 'union',
        raw: typeOverrides[key],
      };
    }
  });
  return docGenArg;
}
