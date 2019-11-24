/**
 * Converts
 *  <Text bold />
 * to
 *  <Text weight="bold" />
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
      node => node.imported.name === 'Text'
    );
    if (!specifier) {
      return;
    }
    localIdentifierName = specifier.local.name;
  });

  let hasModifications = false;

  const transform = src
    .find(j.JSXElement)
    .forEach(path => {
      const { node } = path;

      if (node.openingElement.name.name !== localIdentifierName) {
        return;
      }

      const hasBold = node.openingElement.attributes.find(
        attr => attr.name && attr.name.name === 'bold'
      );

      if (!hasBold) {
        return;
      }

      node.openingElement.attributes = node.openingElement.attributes.map(
        attr => {
          return attr.name && attr.name.name === 'bold'
            ? j.jsxAttribute(
                j.jsxIdentifier('weight'),
                attr.value && attr.value.type === 'JSXExpressionContainer'
                  ? // <Text weight={expression} />
                    j.jsxExpressionContainer(
                      j.conditionalExpression(
                        attr.value.expression,
                        j.literal('bold'),
                        j.literal('normal')
                      )
                    )
                  : // <Text bold />
                    j.literal('bold')
              )
            : attr;
        }
      );

      // Sort attributes alphabetically
      node.openingElement.attributes.sort(
        (a, b) => (a.name ? a.name.name.localeCompare(b.name.name) : -1)
      );

      j(path).replaceWith(node);

      hasModifications = true;
    })
    .toSource();

  return hasModifications ? transform : null;
}
