/**
 * Converts
 *  <ScrollableContainer />
 * to
 *  <ScrollBoundaryContainer />
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let targetLocalIdentifierName;
  const OLD_NAME = 'ScrollableContainer';
  const NEW_NAME = 'ScrollBoundaryContainer';

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }

    const targetSpecifier = decl.specifiers.find((node) => node.imported.name === OLD_NAME);

    if (!targetSpecifier) {
      return;
    }

    targetLocalIdentifierName = targetSpecifier && targetSpecifier.local.name;

    const newSpecifiers = [
      // Rename ScrollableContainer import
      ...decl.specifiers.map((node) => {
        if (node.imported.name === OLD_NAME) {
          return j.importSpecifier(j.identifier(NEW_NAME));
        }
        return node;
      }),
    ];

    // Sort all the imports alphabetically
    newSpecifiers.sort((a, b) => a.imported.name.localeCompare(b.imported.name));

    const newNode = j.importDeclaration(newSpecifiers, j.literal('gestalt'));

    j(path).replaceWith(newNode);
  });

  if (!targetLocalIdentifierName) {
    // not imported
    return null;
  }

  let hasModifications = false;

  const transform = src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;

      if (node.openingElement.name.name !== targetLocalIdentifierName) {
        return;
      }

      // Sort attributes alphabetically
      node.openingElement.attributes.sort((a, b) => a.name.name.localeCompare(b.name.name));

      node.openingElement.name = NEW_NAME;
      node.closingElement.name = NEW_NAME;

      j(path).replaceWith(node);

      hasModifications = true;
    })
    .toSource({ quote: 'single' });

  return hasModifications ? transform : null;
}
