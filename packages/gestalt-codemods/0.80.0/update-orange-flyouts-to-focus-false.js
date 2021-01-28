/**
 * Converts
 *  <Flyout color="orange" />
 * to
 *  <Flyout color="orange" shouldFocus={false} />
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
    const specifier = decl.specifiers.find((node) => node.imported.name === 'Flyout');
    if (!specifier) {
      return;
    }
    localIdentifierName = specifier.local.name;
  });

  return src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;

      if (node.openingElement.name.name !== localIdentifierName) {
        return;
      }
      const attrs = node.openingElement.attributes;
      const isOrange = attrs.some((attr) => {
        if (
          attr.name &&
          attr.name.name &&
          attr.name.name === 'color' &&
          attr.value.value === 'orange'
        ) {
          return true;
        }
        return false;
      });

      if (isOrange) {
        attrs.push(
          j.jsxAttribute(
            j.jsxIdentifier('shouldFocus'),
            j.jsxExpressionContainer(j.literal(false)),
          ),
        );

        j(path).replaceWith(node);
      }
    })
    .toSource();
}
