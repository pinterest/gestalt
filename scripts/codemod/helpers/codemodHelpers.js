const initialize = ({ api, file }) => {
  const j = api.jscodeshift;
  const src = j(file.source);
  return [j, src];
};

const isNotGestaltImport = ({ importDeclaration }) => importDeclaration.source.value !== 'gestalt';

const isNotComponentName = ({ JSXNode, componentName }) =>
  JSXNode.openingElement.name.name !== componentName;

const isSelfClosing = ({ JSXNode }) => !!JSXNode.openingElement.selfClosing;

const getImports = ({ src, j }) => src.find(j.ImportDeclaration);
const getJSX = ({ src, j }) => src.find(j.JSXElement);

const matchImportedName = ({ importDeclaration, importedName }) =>
  importDeclaration.specifiers.find((node) => node.imported.name === importedName);

const replaceImportedNamed = ({ j, importDeclaration, previousCmpName, nextCmpName }) =>
  importDeclaration.specifiers.map((node) =>
    node.imported.name === previousCmpName ? j.importSpecifier(j.identifier(nextCmpName)) : node,
  );

const sortImportedNames = ({ importSpecifiers }) =>
  importSpecifiers.sort((a, b) => a.imported.name.localeCompare(b.imported.name));

const sourceHasChanges = ({ src }) => {
  // eslint-disable-next-line no-param-reassign
  src.modified = true;
};

const replaceModifiedJSXNode = ({ j, nodePath, JSXNode }) => j(nodePath).replaceWith(JSXNode);

const replaceImportNodePath = ({ j, nodePath, importSpecifiers, importPath }) =>
  j(nodePath).replaceWith(j.importDeclaration(importSpecifiers, j.literal(importPath)));

const renameJSXElement = ({ JSXNode, nextCmpName }) => {
  // eslint-disable-next-line no-param-reassign
  JSXNode.openingElement.name = nextCmpName;

  if (!isSelfClosing({ JSXNode })) {
    // eslint-disable-next-line no-param-reassign
    JSXNode.closingElement.name = nextCmpName;
  }
};

const saveSource = ({ src }) => (src.modified ? src.toSource({ quote: 'single' }) : null);

const sortJSXElementAttributes = ({ JSXNode }) =>
  JSXNode.openingElement.attributes.sort((a, b) => a.name.name.localeCompare(b.name.name));

export {
  getImports,
  getJSX,
  initialize,
  isNotGestaltImport,
  isNotComponentName,
  isSelfClosing,
  matchImportedName,
  replaceImportedNamed,
  replaceImportNodePath,
  replaceModifiedJSXNode,
  renameJSXElement,
  saveSource,
  sortImportedNames,
  sortJSXElementAttributes,
  sourceHasChanges,
};
