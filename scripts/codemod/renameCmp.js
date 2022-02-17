import {
  getImports,
  getJSX,
  initialize,
  isNotGestaltImport,
  isNotComponentName,
  renameJSXElement,
  matchImportedName,
  replaceImportedNamed,
  replaceModifiedJSXNode,
  saveSource,
  sortImportedNames,
  sortJSXElementAttributes,
  sourceHasChanges,
  replaceImportNodePath,
} from './helpers/codemodHelpers.js';

export default function transformer(file, api, options) {
  const { previousCmpName, nextCmpName } = options;

  const [j, src] = initialize({ api, file });

  let targetLocalImportedName;

  getImports({ src, j }).forEach((nodePath) => {
    const { node: importDeclaration } = nodePath;

    if (isNotGestaltImport({ importDeclaration })) return;

    const matchedImportedName = matchImportedName({
      importDeclaration,
      importedName: previousCmpName,
    });

    if (!matchedImportedName) return;

    targetLocalImportedName = matchedImportedName && matchedImportedName.local.name;

    const newImportSpecifiers = replaceImportedNamed({
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

    if (isNotComponentName({ JSXNode, componentName: targetLocalImportedName })) return;

    sortJSXElementAttributes({ JSXNode });

    renameJSXElement({ JSXNode, nextCmpName });

    replaceModifiedJSXNode({ j, nodePath, JSXNode });

    sourceHasChanges({ src });
  });

  return saveSource({ src });
}

// yarn run:codemod renameCmp  ~/code/pinboard/webapp/app/partner/quickPromote/QuickPromoteFormComponents/QuickPromoteTextField.js --previousCmpName=Box --nextCmpName=Boxy
