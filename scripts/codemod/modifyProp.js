// @flow strict

/**
 * CODEMOD to MODIFY (DEPRECATE or  RENAME) GESTALT COMPONENT PROPS
 * Ex. <Box size="" /> to <Box />
 * Ex. <Box size="" /> to <Box renamedSize="" />
 * Ex. <Dropdown.Item size="" /> to <Dropdown.Item renamedSize="" />
 *
 *
 * OPTIONS:
 * --action: 'deprecate' removes prop matching previousPropName, 'rename' replaces prop name matching previousPropName with nextPropName
 * --componentName: component to which modify props
 * --subcomponentName: component's subcomponent to which modify props
 * --previousPropName: current prop name to be replaced
 * --nextPropName: (only required with rename action) new prop name to replace with
 *
 *
 * TO RUN THIS CODEMOD
 * yarn run:codemod modifyProp  <folder/file path> --action=<value> --previousPropName=<value> --nextPropName=<value>
 * E.g. yarn run:codemod modifyProp  ~/code/pinboard/webapp --action=rename --componentName=Box --previousPropName=size --nextCmpName=renamedSize
 * E.g. yarn run:codemod modifyProp  ~/code/pinboard/webapp --action=rename --componentName=Dropdown --subcomponentName=Item --previousPropName=size --nextCmpName=renamedSize
 * E.g. yarn run:codemod modifyProp  ~/code/pinboard/webapp --action=deprecate   --componentName=Box --previousCmpName=size
 */

import {
  getImports,
  getJSX,
  getLocalImportedName,
  initialize,
  isNotGestaltImport,
  matchesComponentName,
  getNewAttributes,
  replaceJSXAttributes,
  saveSource,
  sourceHasChanges,
  throwErrorIfSpreadProps,
} from './helpers/codemodHelpers.js';

// $FlowFixMe[unclear-type]
type GenericType = any;

type FileType = { source: GenericType };
type ApiType = { jscodeshift: GenericType };
type OptionsType = {
  action: 'deprecate' | 'rename',
  componentName: string,
  subcomponentName: string,
  previousPropName: string,
  nextPropName?: string,
};

export default function transformer(
  file: FileType,
  api: ApiType,
  options: OptionsType,
): GenericType {
  const { action, componentName, subcomponentName, previousPropName, nextPropName } = options;

  const [j, src] = initialize({ api, file });

  let targetLocalImportedName;

  getImports({ src, j }).forEach((nodePath) => {
    const { node: importDeclaration } = nodePath;

    if (isNotGestaltImport({ importDeclaration })) return;

    targetLocalImportedName = getLocalImportedName({
      importDeclaration,
      importedName: componentName,
    });
  });

  getJSX({ src, j }).forEach((nodePath) => {
    const { node: JSXNode } = nodePath;

    if (
      !matchesComponentName({ JSXNode, componentName: targetLocalImportedName, subcomponentName })
    )
      return;

    throwErrorIfSpreadProps({ file, JSXNode });
    const newAttributes = getNewAttributes({
      JSXNode,
      action,
      previousPropName,
      nextPropName,
    });

    replaceJSXAttributes({ JSXNode, newAttributes });

    sourceHasChanges({ src });
  });

  return saveSource({ src });
}
