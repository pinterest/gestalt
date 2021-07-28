// @flow strict

// $FlowFixMe[unclear-type]
type GenericType = Object;

/*
========== HELPERS ==========
*/

type HasImportType = {|
  importNode: GenericType,
  path: string,
|};

export function hasImport({ importNode, path }: HasImportType): boolean {
  const importName = importNode.source ? importNode.source.value : null;
  return importName === path;
}

type GetNamedImportsComponentsType = {|
  context: GenericType,
  node: GenericType,
|};

export function getNamedImportsComponents({
  context,
  node,
}: GetNamedImportsComponentsType): $ReadOnlyArray<string> {
  return context.getDeclaredVariables(node).map((item) => item.name);
}

type IsTagType = {|
  elementNode: GenericType,
  tagName: string,
|};

export function isTag({ elementNode, tagName }: IsTagType): boolean {
  return elementNode?.name?.name === tagName;
}

type HasLonelyAttributeType = {|
  elementNode: GenericType,
  tagName: string,
  attribute: string,
|};

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
========== FIXERS ==========
*/

type InsertGestaltImportTopFileFixerType = {|
  context: GenericType,
  fixer: GenericType,
  gestaltImportNode: GenericType,
  gestaltName: string,
  programNode: GenericType,
|};

export function insertGestaltImportTopFileFixer({
  context,
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
      node: gestaltImportNode,
      context,
    });

    const importsComponentsArray = [...namedImportsComponents];
    if (!namedImportsComponents.includes(gestaltName)) {
      importsComponentsArray.push(gestaltName);
    }

    const sortedImports = importsComponentsArray.sort().join(', ');

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
========== REPORTS ==========
*/

type ReplaceTagType = {|
  context: GenericType,
  elementNode: GenericType,
  gestaltImportNode: ?GenericType,
  gestaltName: string,
  programNode: GenericType,
  tagName: string,
|};

export function renameTag({
  context,
  elementNode,
  gestaltImportNode,
  gestaltName,
  programNode,
  tagName,
}: ReplaceTagType) {
  context.report({
    node: elementNode,
    messageId: 'disallowed',
    fix: (fixer) => {
      const tagFixers = renameTagFixer({ fixer, elementNode, context, tagName, gestaltName });

      const importFixers = insertGestaltImportTopFileFixer({
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
