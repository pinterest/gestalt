// @flow strict

// $FlowFixMe[unclear-type]
type GenericType = Object;

/*
==================== HELPERS ====================
*/

type HasImportType = {|
  importNode: GenericType,
  path: string,
|};

/* hasImport
This function checks is a given node (importNode) contains a given import path (path), and returns true if so.
Examples:
import { Box } from 'gestalt' >> path="gestalt"
import { Box } from 'app/box' >> path="app/box"
*/
export function hasImport({ importNode, path }: HasImportType): boolean {
  const importName = importNode.source ? importNode.source.value : null;
  return importName === path;
}

type GetNamedImportsComponentsType = {|
  importNode: GenericType,
|};

/* updateGestaltImportFixer
This function returns an array of arrays containing the named imports ([imported name, local or aliased name]) from a node (importNode).
*/
export function getNamedImportsComponents({
  importNode,
}: GetNamedImportsComponentsType): $ReadOnlyArray<$ReadOnlyArray<string>> {
  const namedImports = importNode.specifiers.map((node) => [node.imported.name, node?.local?.name]);
  return namedImports;
}

type IsTagType = {|
  elementNode: GenericType,
  tagName: string,
|};

/* isTag
This function checks is a given node (elementNode) contains a given tag (tagName), and returns true if so.
Examples:
<div /> >> if tagName="div" returns true
<div /> >> if tagName="button" returns false
*/
export function isTag({ elementNode, tagName }: IsTagType): boolean {
  return elementNode?.name?.name === tagName;
}

type HasLonelyAttributeType = {|
  elementNode: GenericType,
  tagName: string,
  attribute: string,
|};

/* hasLonelyAttribute
This function checks is a given tag (tagName) in a node (elementNode) contains only a single attribute (attribute), and returns true if so.
Examples:
<div ref={} /> >> if attribute="ref" returns true
<div ref={} style={} /> >> if attribute="ref" returns false
*/
export function hasLonelyAttribute({
  elementNode,
  tagName,
  attribute,
}: HasLonelyAttributeType): boolean {
  return (
    isTag({ elementNode, tagName }) &&
    elementNode.attributes.length === 1 &&
    elementNode.attributes[0].name &&
    elementNode.attributes[0].name.name === attribute
  );
}

/*
==================== FIXERS ====================
Fixers are the functions executed in the fix method inside context.report
*/

type InsertGestaltImportTopFileFixerType = {|
  context: GenericType,
  fixer: GenericType,
  gestaltImportNode: GenericType,
  gestaltName: string,
  programNode: GenericType,
|};

/* updateGestaltImportFixer
This function updates the imports to include the new Gestalt component if needed. If there's no previous Gestalt import, it's preprended at the top of the file. It mantains aliased imports.
*/
export function updateGestaltImportFixer({
  fixer,
  gestaltImportNode,
  gestaltName,
  programNode,
}: InsertGestaltImportTopFileFixerType): GenericType {
  let importFixers = fixer.insertTextBefore(
    programNode,
    `import { ${gestaltName} } from 'gestalt';\n`,
  );

  if (gestaltImportNode) {
    const namedImportsComponents = getNamedImportsComponents({
      importNode: gestaltImportNode,
    });

    const importsComponentsArray = [...namedImportsComponents];
    if (!namedImportsComponents.map((cmp) => cmp[0]).includes(gestaltName)) {
      importsComponentsArray.push([gestaltName, gestaltName]);
    }

    const sortedImports = importsComponentsArray
      .map((cmp) => {
        if (cmp[0] === cmp[1]) {
          return cmp[0];
        }
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
}

type RenameTagFixerType = {|
  context: GenericType,
  elementNode: GenericType,
  fixer: GenericType,
  gestaltName: string,
  tagName: string,
|};

/* renameTagFixer
This function renames a given tag name inside a node: `tagName` is replaced with `gestaltName`
Examples:
<div></div> >> if tagName="div" & gestaltName="Box" returns <Box></Box>
<div /> >> if tagName="div" & gestaltName="Box" returns true <Box />
*/
export function renameTagFixer({
  context,
  elementNode,
  fixer,
  gestaltName,
  tagName,
}: RenameTagFixerType): GenericType {
  return [elementNode.openingElement, elementNode.closingElement]
    .map((node) =>
      node
        ? fixer.replaceText(
            node,
            context.getSourceCode().getText(node).replace(tagName, gestaltName),
          )
        : false,
    )
    .filter((fix) => fix);
}

/*
==================== REPORTS ====================
The context object contains the context.report API used for reporting problems in the code including fixes or suggestions
*/

type RenameTagType = {|
  context: GenericType,
  elementNode: GenericType,
  gestaltImportNode: ?GenericType,
  gestaltName: string,
  programNode: GenericType,
  tagName: string,
|};

/* renameTag
This function renames a given tag name inside a node. It updates the imports to include the new component.
*/
export function renameTag({
  context,
  elementNode,
  gestaltImportNode,
  gestaltName,
  programNode,
  tagName,
}: RenameTagType) {
  context.report({
    node: elementNode,
    messageId: 'disallowed',
    fix: (fixer) => {
      const tagFixers = renameTagFixer({ fixer, elementNode, context, tagName, gestaltName });

      const importFixers = updateGestaltImportFixer({
        context,
        fixer,
        gestaltImportNode,
        gestaltName,
        programNode,
      });

      return [...tagFixers, importFixers];
    },
  });
}
