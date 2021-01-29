/**
 * Converts
 *  <Box shape="roundedTop" /> or <Touchable shape="roundedTop" /> (and other roundedX variants)
 * to
 *  <Box shape="rounded" /> or <Touchable shape="rounded" />
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let boxLocalIdentifierName;
  let touchableLocalIdentifierName;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    const boxSpecifier = decl.specifiers.find((node) => node.imported.name === 'Box');
    const touchableSpecifier = decl.specifiers.find((node) => node.imported.name === 'Touchable');
    if (!(boxSpecifier || touchableSpecifier)) {
      return;
    }
    boxLocalIdentifierName = boxSpecifier && boxSpecifier.local.name;
    touchableLocalIdentifierName = touchableSpecifier && touchableSpecifier.local.name;
  });

  let hasModifications = false;

  const transform = src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;

      if (
        node.openingElement.name.name !== boxLocalIdentifierName &&
        node.openingElement.name.name !== touchableLocalIdentifierName
      ) {
        return;
      }

      const hasShape = node.openingElement.attributes.find(
        (attr) => attr.name && attr.name.name === 'shape',
      );

      if (!hasShape) {
        return;
      }

      node.openingElement.attributes = node.openingElement.attributes
        .map((attr) => {
          if (
            attr.name &&
            attr.name.name === 'shape' &&
            attr.value.value &&
            (attr.value.value === 'roundedTop' ||
              attr.value.value === 'roundedRight' ||
              attr.value.value === 'roundedBottom' ||
              attr.value.value === 'roundedLeft')
          ) {
            return j.jsxAttribute(j.jsxIdentifier('shape'), j.literal('rounded'));
          }
          return attr;
        })
        .filter(Boolean);

      // Sort attributes alphabetically
      node.openingElement.attributes.sort((a, b) => {
        if (!a.name) {
          return -1;
        }
        if (!b.name) {
          return 1;
        }
        return a.name.name.localeCompare(b.name.name);
      });

      j(path).replaceWith(node);

      hasModifications = true;
    })
    .toSource();

  return hasModifications ? transform : null;
}
