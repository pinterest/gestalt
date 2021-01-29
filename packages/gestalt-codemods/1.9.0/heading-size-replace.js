/**
 * Converts
 *  <Heading size="xs" />
 * to
 *  <Heading size="md" />
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
    const specifier = decl.specifiers.find((node) => node.imported.name === 'Heading');
    if (!specifier) {
      return;
    }
    localIdentifierName = specifier.local.name;
  });

  let hasModifications = false;

  const transform = src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;

      if (node.openingElement.name.name !== localIdentifierName) {
        return;
      }

      const hasSize = node.openingElement.attributes.find(
        (attr) => attr.name && attr.name.name === 'size',
      );

      if (!hasSize) {
        return;
      }

      node.openingElement.attributes = node.openingElement.attributes
        .map((attr) => {
          if (attr.name && attr.name.name === 'size' && attr.value.value) {
            if (attr.value.value === 'xs') {
              return j.jsxAttribute(j.jsxIdentifier('size'), j.literal('md'));
            }
            // These sizes moved to the default value of "lg" so just remove custom sizes
            if (['sm', 'md', 'lg', 'xl'].includes(attr.value.value)) {
              return null;
            }
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
