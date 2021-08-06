// @flow strict
import { getNamedImportsComponents, getTextNodeFromSourceCode } from './eslintASTHelpers.js';

// $FlowFixMe[unclear-type]
type GenericNode = {| [string]: any |};

/** =================  FIXERS =================
Fixers are the functions executed in the fix method inside context.report
*/

type InsertGestaltImportTopFileFixerType = ({|
  context: GenericNode,
  fixer: GenericNode,
  gestaltImportNode: GenericNode,
  newComponentName: string,
  programNode: GenericNode,
|}) => GenericNode;

/** This function updates the imports to include the new Gestalt component if needed. If there's no previous Gestalt import, it's preprended at the top of the file. It mantains aliased imports.
 */
export const updateGestaltImportFixer: InsertGestaltImportTopFileFixerType = ({
  fixer,
  gestaltImportNode,
  newComponentName,
  programNode,
}) => {
  // if Gestalt is not imported: add new Gestalt import on top of the file
  if (!gestaltImportNode) {
    return fixer.insertTextBefore(programNode, `import { ${newComponentName} } from 'gestalt';\n`);
  }

  // if Gestalt is already imported: add new component if missing
  const namedImportsComponents =
    getNamedImportsComponents({
      importNode: gestaltImportNode,
    }) ?? [];

  const importsComponentsArray = [...namedImportsComponents];

  if (!namedImportsComponents?.map((cmp) => cmp[0]).includes(newComponentName)) {
    importsComponentsArray.push([newComponentName, newComponentName]);
  }

  const sortedImports = importsComponentsArray
    .map((cmp) => {
      if (cmp[0] === cmp[1]) return cmp[0]; // import and local names match
      return `${cmp[0]} as ${cmp[1]}`; // import and local names don't match, keep alias
    })
    .sort()
    .join(', ');

  return fixer.replaceText(gestaltImportNode, `import { ${sortedImports} } from 'gestalt';`);
};

type RenameTagFixerType = ({|
  context: GenericNode,
  elementNode: GenericNode,
  fixer: GenericNode,
  newComponentName: string,
  tagName: string,
|}) => $ReadOnlyArray<GenericNode>;

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
    .map((node) => {
      // $FlowFixMe[incompatible-type] Flow is not detecting the method filter(Boolean)
      if (!node) return false;

      return fixer.replaceText(
        node,
        getTextNodeFromSourceCode({ context, elementNode: node }).replace(
          tagName,
          newComponentName,
        ),
      );
    })
    .filter(Boolean);
};

type RenameTagWithPropsFixerType = ({|
  additionalPropsString: string,
  context: GenericNode,
  elementNode: GenericNode,
  fixer: GenericNode,
  newComponentName: string,
  tagName: string,
|}) => $ReadOnlyArray<GenericNode>;

/** This function is a more complex version of renameTagFixer. It has the same tag replacement functionality, but it also rebuild the props in the opening tag to include a new prop. The new prop must be formatted as a string, p.e. `as="article"`
Examples 1:
"\<div\>\<\/div\>" if tagName="div", newComponentName="Box", and completePropsString=`as="article"` returns "\<Box as="article"\>\<\/Box\>"
*/
export const renameTagWithPropsFixer: RenameTagWithPropsFixerType = ({
  additionalPropsString,
  context,
  elementNode,
  fixer,
  newComponentName,
  tagName,
}) => {
  return [elementNode.openingElement, elementNode.closingElement]
    .map((node, index) => {
      // $FlowFixMe[incompatible-type] Flow is not detecting the method filter(Boolean)
      if (!node) return false;

      const completeOpeningNode = `<${newComponentName} ${additionalPropsString}${
        elementNode.closingElement ? '' : ' /'
      }>`;
      return index === 0
        ? fixer.replaceText(node, completeOpeningNode)
        : fixer.replaceText(
            node,
            getTextNodeFromSourceCode({ context, elementNode: node }).replace(
              tagName,
              newComponentName,
            ),
          );
    })
    .filter(Boolean);
};
