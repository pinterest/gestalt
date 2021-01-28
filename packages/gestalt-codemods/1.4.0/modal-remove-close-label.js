/**
 * Converts
 *  <Box shape="roundedTop" /> or <Touchable shape="roundedTop" /> (and other roundedX variants)
 * to
 *  <Box shape="rounded" /> or <Touchable shape="rounded" />
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    const modalSpecifier = decl.specifiers.find((node) => node.imported.name === 'Modal');
    if (!modalSpecifier) {
      return;
    }
    localIdentifierName = modalSpecifier && modalSpecifier.local.name;
  });

  let hasModifications = false;

  const transform = src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;

      if (node.openingElement.name.name !== localIdentifierName) {
        return;
      }

      const hasCloseLabel = node.openingElement.attributes.find(
        (attr) => attr.name && attr.name.name === 'accessibilityCloseLabel',
      );

      if (!hasCloseLabel) {
        return;
      }

      node.openingElement.attributes = node.openingElement.attributes
        .map((attr) => {
          if (attr.name && attr.name.name === 'accessibilityCloseLabel') {
            return null;
          }
          return attr;
        })
        .filter(Boolean);

      j(path).replaceWith(node);

      hasModifications = true;
    })
    .toSource();

  return hasModifications ? transform : null;
}
