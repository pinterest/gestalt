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

      const hasBold = node.openingElement.attributes.find(
        (attr) => attr.name && attr.name.name === 'bold',
      );

      if (!hasBold) {
        return;
      }

      node.openingElement.attributes = node.openingElement.attributes
        .map((attr) => {
          if (attr.name && attr.name.name === 'bold') {
            const isExpressionContainer =
              attr.value && attr.value.type === 'JSXExpressionContainer';

            if (isExpressionContainer) {
              // <Text bold={false} />
              if (attr.value.expression && attr.value.expression.value === false) {
                return null;
              }
              // <Text bold={expression} />
              return j.jsxAttribute(
                j.jsxIdentifier('weight'),
                j.jsxExpressionContainer(
                  j.conditionalExpression(
                    attr.value.expression,
                    j.literal('bold'),
                    j.literal('normal'),
                  ),
                ),
              );
            }
            // <Text bold />
            return j.jsxAttribute(j.jsxIdentifier('weight'), j.literal('bold'));
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
