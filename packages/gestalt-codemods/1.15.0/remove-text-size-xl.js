/**
 * Converts
 *  <Text size="xl">content</Text>
 * to
 *  <Text><span style={{ fontSize: 21 }}>content</span></Text>
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
            if (attr.value.value === 'xl') {
              const openingElement = j.jsxOpeningElement(j.jsxIdentifier('span'), [
                j.jsxAttribute(
                  j.jsxIdentifier('style'),
                  j.jsxExpressionContainer(
                    j.objectExpression([j.property('init', j.literal('fontSize'), j.literal(21))]),
                  ),
                ),
              ]);
              const element = j.jsxElement(
                openingElement,
                j.jsxClosingElement(j.jsxIdentifier('span')),
                [j.jsxText('\n'), ...node.children, j.jsxText('\n')],
              );
              node.children = [j.jsxText('\n'), element, j.jsxText('\n')];
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
