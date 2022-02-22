// @flow strict

/**
 * CODEMOD to RENAME GESTALT COMPONENTS
 * Ex. <Flyout /> to <Popover />
 *
 * TO RUN THIS CODEMOD
 * yarn run:codemod renameComponent  <folder/file path> --previousCmpName=<value> --nextCmpName=<value>
 * E.g. yarn run:codemod renameComponent  ~/code/pinboard/webapp --previousCmpName=Box --nextCmpName=RenamedBox
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
  isGestaltImport,
  matchesComponentName,
  replaceImportedName,
  replaceImportNodePath,
  renameJSXElement,
  saveSource,
  sortImportedNames,
} from './helpers/codemodHelpers.js';
import { type Transform } from './helpers/codemodFlowtypes.js';

// $FlowFixMe[unclear-type]
type AnyType = any;

type OptionsType = {| previousCmpName: string, nextCmpName: string |};

const transform: Transform<OptionsType> = function transformer(file, api, options): AnyType {
  const { previousCmpName, nextCmpName } = options;

  const [j, src] = initialize({ api, file });

  let targetLocalImportedName;

  getImports({ src, j }).forEach((nodePath) => {
    const { node: importDeclaration } = nodePath;

    if (!isGestaltImport({ importDeclaration })) return;

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

    // $FlowFixMe[incompatible-use]
    src.modified = true;
  });

  return saveSource({ src });
};

export default transform;
