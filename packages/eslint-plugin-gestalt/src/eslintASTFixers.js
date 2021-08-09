// @flow strict
import { getNamedImportsComponents } from './eslintASTHelpers.js';

// $FlowFixMe[unclear-type]
type GenericType = Object;

/** =================  FIXERS =================
Fixers are the functions executed in the fix method inside context.report
*/

type InsertGestaltImportTopFileFixerType = ({|
  context: GenericType,
  fixer: GenericType,
  gestaltImportNode: GenericType,
  newComponentName: string,
  programNode: GenericType,
|}) => GenericType;

/** This function updates the imports to include the new Gestalt component if needed. If there's no previous Gestalt import, it's preprended at the top of the file. It mantains aliased imports.
 */
export const updateGestaltImportFixer: InsertGestaltImportTopFileFixerType = ({
  fixer,
  gestaltImportNode,
  newComponentName,
  programNode,
}) => {
  // default fix: add new Gestalt import on top of the file
  let importFixers = fixer.insertTextBefore(
    programNode,
    `import { ${newComponentName} } from 'gestalt';\n`,
  );
  // if Gestalt is already imported: add new component if missing
  if (gestaltImportNode) {
    const namedImportsComponents = getNamedImportsComponents({
      importNode: gestaltImportNode,
    });

    const importsComponentsArray = [...namedImportsComponents];
    if (!namedImportsComponents.map((cmp) => cmp[0]).includes(newComponentName)) {
      importsComponentsArray.push([newComponentName, newComponentName]);
    }

    const sortedImports = importsComponentsArray
      .map((cmp) => {
        if (cmp[0] === cmp[1]) {
          // import and local names match
          return cmp[0];
        }
        // import and local names don't match, keep alias
        return `${cmp[0]} as ${cmp[1]}`;
      })
      .sort()
      .join(', ');

    importFixers = fixer.replaceText(
      gestaltImportNode,
      `import { ${sortedImports} } from 'gestalt';`,
    );
  }
  return importFixers;
};

type RenameTagFixerType = ({|
  context: GenericType,
  elementNode: GenericType,
  fixer: GenericType,
  newComponentName: string,
  tagName: string,
|}) => GenericType;

/** This function renames a given tag name inside a node: `tagName` is replaced with `newComponentName`
Examples 1:
"\<div\>\<\/div\>" if tagName="div" & newComponentName="Box" returns "\<Box\>\<\/Box\>"
Examples 2:
"\<div \/\>" if tagName="div" & newComponentName="Box" returns "\<Box \/\>""
*/
export const renameTagFixer: RenameTagFixerType = ({
  context,
  elementNode,
  fixer,
  newComponentName,
  tagName,
}) => {
  return [elementNode.openingElement, elementNode.closingElement]
    .map((node) =>
      node
        ? fixer.replaceText(
            node,
            context.getSourceCode().getText(node).replace(tagName, newComponentName),
          )
        : false,
    )
    .filter(Boolean);
};
