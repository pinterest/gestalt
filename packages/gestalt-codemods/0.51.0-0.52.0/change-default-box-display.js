/**
 * Converts
 *  <Box display="flex" />
 * to
 *  <Box />
 *
 * Converts
 *  <Box />
 * to
 *  <Box display="block" />
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;

  src.find(j.ImportDeclaration).forEach(path => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    const specifier = decl.specifiers.find(
      node => node.imported.name === 'Box'
    );
    if (!specifier) {
      return;
    }
    localIdentifierName = specifier.local.name;
  });

  return src
    .find(j.JSXElement)
    .forEach(path => {
      const { node } = path;

      if (node.openingElement.name.name !== localIdentifierName) {
        return;
      }

      const attrs = node.openingElement.attributes;
      const index = attrs.findIndex(attr => attr.name.name === 'display');

      if (index === -1) {
        // Add display block if missing
        attrs.push(
          j.jsxAttribute(j.jsxIdentifier('display'), j.literal('block'))
        );
      } else if (
        attrs[index] &&
        attrs[index].value &&
        attrs[index].value.value === 'flex'
      ) {
        // Remove display flex if present
        attrs.splice(index, 1);
      }

      j(path).replaceWith(node);
    })
    .toSource();
}
