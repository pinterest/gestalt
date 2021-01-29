/**
 * Converts
 *  <GestaltProvider />
 * to
 *  <Provider />
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let gestaltProviderLocalIdentifierName;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    const gestaltProviderSpecifier = decl.specifiers.find(
      (node) => node.imported.name === 'GestaltProvider',
    );

    if (!gestaltProviderSpecifier) {
      return;
    }

    gestaltProviderLocalIdentifierName =
      gestaltProviderSpecifier && gestaltProviderSpecifier.local.name;

    const newSpecifiers = [
      // Strip out GestaltProvider import
      ...decl.specifiers.filter((node) => node.imported.name !== 'GestaltProvider'),
      // Only add the new Provider import if it is not already imported
      decl.specifiers.every((node) => node.imported.name !== 'Provider') &&
        j.importSpecifier(j.identifier('Provider')),
    ].filter(Boolean);

    // Sort all the imports alphabetically
    newSpecifiers.sort((a, b) => a.imported.name.localeCompare(b.imported.name));

    const newNode = j.importDeclaration(newSpecifiers, j.literal('gestalt'));

    j(path).replaceWith(newNode);
  });

  if (!gestaltProviderLocalIdentifierName) {
    // Not imported
    return null;
  }

  let hasModifications = false;

  const transform = src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;

      if (node.openingElement.name.name !== gestaltProviderLocalIdentifierName) {
        return;
      }

      node.openingElement.name = 'Provider';
      node.closingElement.name = 'Provider';

      j(path).replaceWith(node);

      hasModifications = true;
    })
    .toSource({ quote: 'single' });

  return hasModifications ? transform : null;
}
