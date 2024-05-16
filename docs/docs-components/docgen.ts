import metadata from './metadata';

export type DocGen = {
  description: string,
  displayName: string,
  methods: ReadonlyArray<string>,
  props: {
    [key: string]: {
      defaultValue: {
        value: string,
        computed: boolean
      } | null | undefined,
      required: boolean,
      description: string,
      tsType: {
        raw?: string,
        nullable?: boolean,
        name: string,
        value?: string
      }
    }
  }
};

export type DocType = {
  generatedDocGen: DocGen
};

export default function docGen(componentName: string): DocGen {
  return metadata[componentName];
}

export function multipleDocGen(componentNames: ReadonlyArray<string>): {
  [key: string]: DocGen
} {
  return componentNames.reduce<Record<string, any>>((prevValue: {
    [key: string]: DocGen
  }, currentComponentName: string) => ({
    ...prevValue,
    [currentComponentName]: docGen(currentComponentName),
  }), {});
}

export function overrideTypes(
  docGenArg: DocGen,
  typeOverrides: {
    [key: string]: string
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
