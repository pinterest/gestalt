// @flow strict

/**
 * CODEMOD to RENAME GESTALT COMPONENTS
 * Ex. <Flyout /> to <Popover />
 *
 * TO RUN THIS CODEMOD
 * yarn codemod renameComponent ~/path/to/your/code --previousName=<value> --nextName=<value>
 * E.g. yarn codemod renameComponent ~/code/pinboard/webapp --previousName=Box --nextName=RenamedBox
 *
 * OPTIONS:
 * --previousName: current component name to be replaced
 * --nextName: new component name to replace with
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
} from './utils.js';
import { type FileType, type ApiType } from './flowtypes.js';

type OptionsType = {| previousName: string, nextName: string |};

function transform(file: FileType, api: ApiType, options: OptionsType): ?string {
  const { previousName, nextName } = options;

  const { j, src } = initialize({ api, file });

  let targetLocalImportedName;

  getImports({ src, j }).forEach((nodePath) => {
    const { node: importDeclaration } = nodePath;

    if (!isGestaltImport({ importDeclaration })) return;

    targetLocalImportedName = getLocalImportedName({
      importDeclaration,
      importedName: previousName,
    });

    if (!targetLocalImportedName) return;

    const newImportSpecifiers = replaceImportedName({
      j,
      importDeclaration,
      previousComponentName: previousName,
      nextComponentName: nextName,
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

    renameJSXElement({ JSXNode, nextComponentName: nextName });

    src.modified = true;
  });

  return saveSource({ src });
}

export default transform;
