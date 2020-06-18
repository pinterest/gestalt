/**
 * Converts
 *  <Touchable onTouch={...} />
 * to
 *  <TapArea onTap={...} />
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let touchableLocalIdentifierName;

  src.find(j.ImportDeclaration).forEach(path => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    const touchableSpecifier = decl.specifiers.find(
      node => node.imported.name === 'Touchable'
    );

    if (!touchableSpecifier) {
      return;
    }

    touchableLocalIdentifierName =
      touchableSpecifier && touchableSpecifier.local.name;

    const newSpecifiers = [
      // Strip out Touchable import
      ...decl.specifiers.filter(node => node.imported.name !== 'Touchable'),
      // Only add the new TapArea import if it is not already imported
      decl.specifiers.every(node => node.imported.name !== 'TapArea') &&
        j.importSpecifier(j.identifier('TapArea')),
    ].filter(Boolean);

    // Sort all the imports alphabetically
    newSpecifiers.sort((a, b) =>
      a.imported.name.localeCompare(b.imported.name)
    );

    const newNode = j.importDeclaration(newSpecifiers, j.literal('gestalt'));

    j(path).replaceWith(newNode);
  });

  if (!touchableLocalIdentifierName) {
    // not imported
    return null;
  }

  let hasModifications = false;

  const transform = src
    .find(j.JSXElement)
    .forEach(path => {
      const { node } = path;

      if (node.openingElement.name.name !== touchableLocalIdentifierName) {
        return;
      }

      node.openingElement.attributes = node.openingElement.attributes.map(
        attr => {
          const attribute = attr;
          if (attribute.name && attribute.name.name === 'onTouch') {
            attribute.name.name = 'onTap';
          }
          return attribute;
        }
      );

      // Sort attributes alphabetically
      node.openingElement.attributes.sort((a, b) =>
        a.name.name.localeCompare(b.name.name)
      );

      node.openingElement.name = 'TapArea';
      node.closingElement.name = 'TapArea';

      j(path).replaceWith(node);

      hasModifications = true;
    })
    .toSource({ quote: 'single' });

  return hasModifications ? transform : null;
}
