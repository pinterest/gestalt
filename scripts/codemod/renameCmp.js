import { isNotGestaltImport, matchSpecifierImportedName } from './helpers/codemodHelpers.js';

export default function transformer(file, api, options) {
  const { previousCmpName, nextCmpName } = options;

  const j = api.jscodeshift;
  const src = j(file.source);

  let hasModifications;
  let targetLocalIdentifierName;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;

    if (isNotGestaltImport({ decl })) return;

    const matchedSpecifier = matchSpecifierImportedName({ decl, importedName: previousCmpName });

    if (!matchedSpecifier) return;

    targetLocalIdentifierName = matchedSpecifier && matchedSpecifier.local.name;

    const newSpecifiers = [
      ...decl.specifiers.map((node) =>
        node.imported.name === previousCmpName
          ? j.importSpecifier(j.identifier(nextCmpName))
          : node,
      ),
    ];
    // Sort all the imports alphabetically
    newSpecifiers.sort((a, b) => a.imported.name.localeCompare(b.imported.name));

    j(path).replaceWith(j.importDeclaration(newSpecifiers, j.literal('gestalt')));
  });

  if (!targetLocalIdentifierName) {
    // not imported
    return null;
  }

  src.find(j.JSXElement).forEach((path) => {
    const { node } = path;

    if (node.openingElement.name.name !== targetLocalIdentifierName) {
      return;
    }

    // Sort attributes alphabetically
    node.openingElement.attributes.sort((a, b) => a.name.name.localeCompare(b.name.name));
    node.openingElement.name = nextCmpName;
    node.closingElement.name = nextCmpName;

    j(path).replaceWith(node);

    hasModifications = true;
  });

  return hasModifications ? src.toSource({ quote: 'single' }) : null;
}

// yarn run:codemod renameCmp  ~/code/pinboard/webapp/app/partner/quickPromote/QuickPromoteFormComponents/QuickPromoteTextField.js --previousCmpName=Box --nextCmpName=Boxy
