/**
 * Converts
 * <Button inline />
 * to
 * <Button inline size="md" />
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
    const specifier = decl.specifiers.find((node) => node.imported.name === 'Button');
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

      if (attrs.some((attr) => attr.name.name === 'inline')) {
        attrs.push(j.jsxAttribute(j.jsxIdentifier('size'), j.literal('md')));
      }

      j(path).replaceWith(node);
    })
    .toSource();
}
