import metadata from './metadata';

type DocGenProp = {
  defaultValue:
    | {
        value: string;
        computed: boolean;
      }
    | null
    | undefined;
  required: boolean;
  description: string;
  tsType: {
    raw?: string;
    nullable?: boolean;
    name: string;
    value?: string;
  };
};

export type DocGen = {
  description: string;
  displayName: string;
  methods: ReadonlyArray<string>;
  props: {
    [key: string]: DocGenProp;
    children: DocGenProp;
  };
};

export type DocType = {
  generatedDocGen: DocGen;
};

export default function docGen(componentName: string): DocGen {
  // @ts-expect-error - TS7053 - Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{}'.
  return metadata[componentName];
}

export type MultipleDocGenType<Name extends string> = { [K in Name]: DocGen };

export function multipleDocGen<Name extends string>(
  componentNames: ReadonlyArray<Name>,
): MultipleDocGenType<Name> {
  return componentNames.reduce(
    (prevValue, currentComponentName: string) => ({
      ...prevValue,
      [currentComponentName]: docGen(currentComponentName),
    }),
    {},
  ) as MultipleDocGenType<Name>;
}

export function overrideTypes(
  docGenArg: DocGen,
  typeOverrides: {
    [key: string]: string;
  },
): DocGen {
  Object.keys(typeOverrides).forEach((key) => {
    if (docGenArg?.props?.[key]) {
      // eslint-disable-next-line no-param-reassign
      docGenArg.props[key].tsType = {
        name: 'union',
        raw: typeOverrides[key],
      };
    }
  });
  return docGenArg;
}
