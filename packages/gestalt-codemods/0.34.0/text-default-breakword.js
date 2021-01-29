/**
 * Converts
 *  <Text overflow="breakWord" />
 * to
 *  <Text />
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
    const specifier = decl.specifiers.find((node) => node.imported.name === 'Text');
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
      const index = attrs.findIndex(
        (attr) =>
          attr && attr.name && attr.name.name === 'overflow' && attr.value.value === 'breakWord',
      );

      if (index !== -1) {
        attrs.splice(index, 1);
      }

      j(path).replaceWith(node);
    })
    .toSource();
}
