/**
 * Converts
 *  <Stack gap={x} />
 * to
 *  <Flex alignItems="start" justifyContent="center" gap={2x} />

 - Double "gap" value, if present
 - Add previous default value for alignItems, if not present
 - Add previous default value for justifyContent, if not present
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let touchableLocalIdentifierName;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    const touchableSpecifier = decl.specifiers.find((node) => node.imported.name === 'Stack');

    if (!touchableSpecifier) {
      return;
    }

    touchableLocalIdentifierName = touchableSpecifier && touchableSpecifier.local.name;

    const newSpecifiers = [
      // Strip out Stack import
      ...decl.specifiers.filter((node) => node.imported.name !== 'Stack'),
      // Only add the new Flex import if it is not already imported
      decl.specifiers.every((node) => node.imported.name !== 'Flex') &&
        j.importSpecifier(j.identifier('Flex')),
    ].filter(Boolean);

    // Sort all the imports alphabetically
    newSpecifiers.sort((a, b) => a.imported.name.localeCompare(b.imported.name));

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
    .forEach((path) => {
      const { node } = path;

      if (node.openingElement.name.name !== touchableLocalIdentifierName) {
        return;
      }

      // Double 'gap'
      node.openingElement.attributes = node.openingElement.attributes.map((attr) => {
        const attribute = attr;
        if (attribute.name && attribute.name.name === 'gap') {
          if (Number.isInteger(attribute.value.expression.value)) {
            const doubledVal = attribute.value.expression.value * 2;
            attribute.value.expression.value = doubledVal;
            attribute.value.expression.raw = `${doubledVal}`;
          } else {
            throw new Error(`
              ${file.path}
              Manually convert the Row gap: "${attribute.value.expression.value}" to a valid number
              `);
          }
        }
        return attribute;
      });

      const propNames = node.openingElement.attributes.map((attr) => attr.name.name);

      // Add alignItems with previous default value if not already present
      if (!propNames.includes('alignItems')) {
        node.openingElement.attributes.push(
          j.jsxAttribute(j.jsxIdentifier('alignItems'), j.literal('start')),
        );
      }

      // Add justifyContent with previous default value if not already present
      if (!propNames.includes('justifyContent')) {
        node.openingElement.attributes.push(
          j.jsxAttribute(j.jsxIdentifier('justifyContent'), j.literal('center')),
        );
      }

      // Add direction
      node.openingElement.attributes.push(
        j.jsxAttribute(j.jsxIdentifier('direction'), j.literal('column')),
      );

      // Sort attributes alphabetically
      node.openingElement.attributes.sort((a, b) => a.name.name.localeCompare(b.name.name));

      node.openingElement.name = 'Flex';
      node.closingElement.name = 'Flex';

      j(path).replaceWith(node);

      hasModifications = true;
    })
    .toSource({ quote: 'double' });

  return hasModifications ? transform : null;
}
