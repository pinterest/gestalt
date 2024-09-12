import {
  getClosingElement,
  getLocalComponentImportName,
  getNamedImportsComponents,
  getOpeningElement,
  getTextNodeFromSourceCode,
} from './eslintASTHelpers';

type GenericNode = {
  [key: string]: any;
};

/** =================  FIXERS =================
Fixers are the functions executed in the fix method inside context.report
*/

type updateGestaltImportFixerType = (arg1: {
  fixer: GenericNode;
  gestaltImportNode: GenericNode;
  importsToRemove?: ReadonlyArray<string>;
  newComponentName: string;
  programNode: GenericNode;
}) => GenericNode;

/** This function updates the imports to include the new Gestalt component if needed. If there's no previous Gestalt import, it's preprended at the top of the file. It mantains aliased imports.
 */
export const updateGestaltImportFixer: updateGestaltImportFixerType = ({
  fixer,
  gestaltImportNode,
  importsToRemove,
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

  const filteredImportComponents = importsToRemove
    ? importsComponentsArray.filter((component) => !importsToRemove.includes(component[0]!))
    : importsComponentsArray;

  const sortedImports = filteredImportComponents
    .map((cmp) => {
      if (cmp[0] === cmp[1]) return cmp[0]; // import and local names match
      return `${cmp[0]} as ${cmp[1]}`; // import and local names don't match, keep alias
    })
    .sort()
    .join(', ');

  return fixer.replaceText(gestaltImportNode, `import { ${sortedImports} } from 'gestalt';`);
};

type RenameTagFixerType = (arg1: {
  context: GenericNode;
  elementNode: GenericNode;
  fixer: GenericNode;
  gestaltImportNode: GenericNode;
  newComponentName: string;
  tagName: string;
}) => ReadonlyArray<GenericNode>;

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
  gestaltImportNode,
  newComponentName,
  tagName,
}) =>
  [elementNode.openingElement, elementNode.closingElement]
    .map((node) => {
      if (!node) return undefined;

      const namedImportsComponents =
        getNamedImportsComponents({
          importNode: gestaltImportNode,
        }) ?? [];

      const componentNameMatch = namedImportsComponents.find(
        (item) => item[0] === newComponentName,
      );

      const replacedText = getTextNodeFromSourceCode({
        context,
        elementNode: node,
      }).replace(tagName, (componentNameMatch && componentNameMatch[1]) ?? newComponentName);
      return fixer.replaceText(node, replacedText);
    })
    .filter(Boolean);

type RenameTagWithPropsFixerType = (arg1: {
  context: GenericNode;
  elementNode: GenericNode;
  fixer: GenericNode;
  gestaltImportNode: GenericNode;
  modifiedPropsString: string;
  newComponentName: string;
  tagName: string;
  propsToRemove?: ReadonlyArray<string>;
}) => ReadonlyArray<GenericNode>;

/** This function is a more complex version of renameTagFixer. It has the same tag replacement functionality, but it also rebuild the props in the opening tag to include a new prop. The new prop must be formatted as a string, p.e. `as="article"`
Examples 1:
"\<div\>\<\/div\>" if tagName="div", newComponentName="Box", and modifiedPropsString=`as="article"` returns "\<Box as="article"\>\<\/Box\>"
*/
export const renameTagWithPropsFixer: RenameTagWithPropsFixerType = ({
  context,
  elementNode,
  gestaltImportNode,
  fixer,
  modifiedPropsString,
  newComponentName,
  tagName,
}) => {
  const finalNewComponentName = getLocalComponentImportName({
    importNode: gestaltImportNode,
    componentName: newComponentName,
  });
  const openingElement = getOpeningElement({ elementNode });
  const completeOpeningNode = `<${finalNewComponentName} ${modifiedPropsString}${
    openingElement.selfClosing ? ' /' : ''
  }>`;

  return [openingElement, getClosingElement({ elementNode })]
    .map((node, index) => {
      if (!node) return undefined;

      return index === 0
        ? fixer.replaceText(node, completeOpeningNode)
        : fixer.replaceText(
            node,
            getTextNodeFromSourceCode({ context, elementNode: node }).replace(
              tagName,
              finalNewComponentName,
            ),
          );
    })
    .filter(Boolean);
};
