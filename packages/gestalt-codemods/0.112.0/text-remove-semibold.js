/**
 * Converts
 *  <Text weight="semibold" />
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

      const hasWeight = node.openingElement.attributes.find(
        (attr) => attr.name && attr.name.name === 'weight',
      );

      if (!hasWeight) {
        return;
      }

      node.openingElement.attributes = node.openingElement.attributes
        .map((attr) => {
          if (attr.name && attr.name.name === 'weight') {
            const isExpressionContainer =
              attr.value && attr.value.type === 'JSXExpressionContainer';
            if (isExpressionContainer) {
              const { consequent, alternate, test } = attr.value.expression;

              if (
                (consequent.value === 'bold' && alternate.value === 'semibold') ||
                (consequent.value === 'semibold' && alternate.value === 'bold')
              ) {
                // <Text weight={a ? 'semibold' : 'bold'} />
                // <Text weight={a ? 'bold' : 'semibold'} />
                return j.jsxAttribute(j.jsxIdentifier('weight'), j.literal('bold'));
              }

              if (
                (consequent.value === 'normal' && alternate.value === 'semibold') ||
                (consequent.value === 'semibold' && alternate.value === 'normal')
              ) {
                // <Text weight={a ? 'normal' : 'semibold'} />
                // <Text weight={a ? 'semibold' : 'bold'} />
                return j.jsxAttribute(
                  j.jsxIdentifier('weight'),
                  j.jsxExpressionContainer(
                    j.conditionalExpression(
                      test,
                      consequent.value === 'normal' ? j.literal('normal') : j.literal('bold'),
                      alternate.value === 'semibold' ? j.literal('bold') : j.literal('normal'),
                    ),
                  ),
                );
              }
            }
            // <Text weight="semibold" />
            if (attr.value && attr.value.type === 'Literal' && attr.value.value === 'semibold') {
              return j.jsxAttribute(j.jsxIdentifier('weight'), j.literal('bold'));
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
