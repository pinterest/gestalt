/**
 * Converts
 *  <Box shape="circle" /> or <Touchable shape="pill" /> or <Mask shape="rounded" />
 * to
 *  <Box rounding="circle" /> or <Touchable rounding="pill" /> or <Mask rounding={2} />
 */

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let boxLocalIdentifierName;
  let maskLocalIdentifierName;
  let touchableLocalIdentifierName;

  const oldToNewMap = {
    circle: j.literal('circle'),
    pill: j.literal('pill'),
    rounded: j.literal(2),
    square: j.literal(0),
  };

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    const boxSpecifier = decl.specifiers.find((node) => node.imported.name === 'Box');
    const maskSpecifier = decl.specifiers.find((node) => node.imported.name === 'Mask');
    const touchableSpecifier = decl.specifiers.find((node) => node.imported.name === 'Touchable');
    if (!(boxSpecifier || maskSpecifier || touchableSpecifier)) {
      return;
    }
    boxLocalIdentifierName = boxSpecifier && boxSpecifier.local.name;
    maskLocalIdentifierName = maskSpecifier && maskSpecifier.local.name;
    touchableLocalIdentifierName = touchableSpecifier && touchableSpecifier.local.name;
  });

  let hasModifications = false;

  const transform = src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;

      if (
        node.openingElement.name.name !== boxLocalIdentifierName &&
        node.openingElement.name.name !== maskLocalIdentifierName &&
        node.openingElement.name.name !== touchableLocalIdentifierName
      ) {
        return;
      }

      const hasShape = node.openingElement.attributes.find(
        (attr) => attr.name && attr.name.name === 'shape',
      );

      if (!hasShape) {
        return;
      }

      node.openingElement.attributes = node.openingElement.attributes
        .map((attr) => {
          if (attr.name && attr.name.name === 'shape') {
            let oldVal;
            let newVal;
            if (attr.value.value) {
              oldVal = attr.value.value;
            } else if (attr.value.expression) {
              const { expression } = attr.value;
              if (expression.type === 'Literal') {
                oldVal = expression.value;
              } else if (expression.type === 'ConditionalExpression') {
                return j.jsxAttribute(
                  j.jsxIdentifier('rounding'),
                  j.jsxExpressionContainer(
                    j.conditionalExpression(
                      expression.test,
                      oldToNewMap[expression.consequent.value] || expression.consequent,
                      oldToNewMap[expression.alternate.value] || expression.alternate,
                    ),
                  ),
                );
              }
            }
            if (oldVal === 'circle' || oldVal === 'pill') {
              newVal = oldToNewMap[oldVal];
            } else if (oldVal === 'rounded' || oldVal === 'square') {
              newVal = j.jsxExpressionContainer(oldToNewMap[oldVal]);
            }
            if (newVal) {
              return j.jsxAttribute(j.jsxIdentifier('rounding'), newVal);
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
