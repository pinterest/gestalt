/**
 * Converts
 *  <Heading weight="normal" />
 *  <Heading weight="semibold" />
 * to
 *  <Heading />
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

      const hasWeight = node.openingElement.attributes.find(
        (attr) => attr.name && attr.name.name === 'weight',
      );

      if (!hasWeight) {
        return;
      }

      node.openingElement.attributes = node.openingElement.attributes
        .map((attr) => {
          if (attr.name && attr.name.name === 'weight') {
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
