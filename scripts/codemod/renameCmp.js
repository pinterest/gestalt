// @flow strict

/**
 * CODEMOD to RENAME GESTALT COMPONENTS
 * Ex. <Flyout /> to <Popover />
 *
 * TO RUN THIS CODEMOD
 * yarn run:codemod renameCmp  <folder/file path> --previousCmpName=<value> --nextCmpName=<value>
 * E.g. yarn run:codemod renameCmp  ~/code/pinboard/webapp --previousCmpName=Box --nextCmpName=RenamedBox
 *
 * OPTIONS:
 * --previousCmpName: current component name to be replaced
 * --nextCmpName: new component name to replace with
 */

import {
  getImports,
  getJSX,
  getLocalImportedName,
  initialize,
  isNotGestaltImport,
  matchesComponentName,
  replaceImportedName,
  replaceImportNodePath,
  renameJSXElement,
  saveSource,
  sortImportedNames,
  sourceHasChanges,
} from './helpers/codemodHelpers.js';

// $FlowFixMe[unclear-type]
type GenericType = any;

type FileType = { source: GenericType };
type ApiType = { jscodeshift: GenericType };
type OptionsType = { previousCmpName: string, nextCmpName: string };

export default function transformer(
  file: FileType,
  api: ApiType,
  options: OptionsType,
): GenericType {
  const { previousCmpName, nextCmpName } = options;

  const [j, src] = initialize({ api, file });

  let targetLocalImportedName;

  getImports({ src, j }).forEach((nodePath) => {
    const { node: importDeclaration } = nodePath;

    if (isNotGestaltImport({ importDeclaration })) return;

    targetLocalImportedName = getLocalImportedName({
      importDeclaration,
      importedName: previousCmpName,
    });

    if (!targetLocalImportedName) return;

    const newImportSpecifiers = replaceImportedName({
      j,
      importDeclaration,
      previousCmpName,
      nextCmpName,
    });

    const newSortedImportSpecifiers = sortImportedNames({ importSpecifiers: newImportSpecifiers });

    replaceImportNodePath({
      j,
      nodePath,
      importSpecifiers: newSortedImportSpecifiers,
      importPath: 'gestalt',
    });
  });

  getJSX({ src, j }).forEach((nodePath) => {
    const { node: JSXNode } = nodePath;

    if (!matchesComponentName({ JSXNode, componentName: targetLocalImportedName })) return;

    renameJSXElement({ JSXNode, nextCmpName });

    sourceHasChanges({ src });
  });

  return saveSource({ src });
}
