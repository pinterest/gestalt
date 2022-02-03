/*
 * Converts
 *   size="sm"|"md"|"lg"
 * to
 *   size="100"|"200"|"300"
 * for Text elements
 * and
 * Converts
 *   size="sm"|"md"|"lg"
 * to
 *   size="400"|"500"|"600"
 * for Heading elements
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/45.0.0/replace-typography-sizes.js relative/path/to/your/code

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  const TEXT_MAPPING = {
    'sm': '100',
    'md': '200',
    'lg': '300',
  };
  const HEADING_MAPPING = {
    'sm': '400',
    'md': '500',
    'lg': '600',
  };
  const CURRENT_SIZE_VALUES = ['sm', 'md', 'lg'];

  let localIdentifierNames;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    localIdentifierNames = decl.specifiers
      .filter((node) => ['Heading', 'Text'].includes(node.imported?.name))
      .map((node) => node.local?.name);

    return null;
  });

  if (!localIdentifierNames || localIdentifierNames.length === 0) {
    return null;
  }

  return src
    .find(j.JSXElement)
    .forEach((jsxElement) => {
      const { node } = jsxElement;

      if (!localIdentifierNames.includes(node.openingElement.name.name)) {
        return null;
      }

      const attrs = node.openingElement.attributes;

      if (attrs.some((attr) => attr.type === 'JSXSpreadAttribute')) {
        throw new Error(
          `Remove Dynamic Heading and Text properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      const isHeadingComponent = node.openingElement.name.name.includes('Heading');

      node.openingElement.attributes = attrs
        .map((attr) => {
          if (attr?.name?.name === 'size' && attr.value.type === 'JSXExpressionContainer') {
            if (
              attr.value.expression.type === 'ConditionalExpression' &&
              (CURRENT_SIZE_VALUES.includes(attr.value.expression.consequent?.value) ||
                CURRENT_SIZE_VALUES.includes(attr.value.expression.alternate?.value))
            ) {
              const newAttr = attr;
              const consequentValue = attr.value.expression.consequent.value;
              const alternateValue = attr.value.expression.alternate.value;

              if (CURRENT_SIZE_VALUES.includes(consequentValue)) {
                newAttr.value.expression.consequent.value = isHeadingComponent
                  ? HEADING_MAPPING[consequentValue]
                  : TEXT_MAPPING[consequentValue];
              }

              if (CURRENT_SIZE_VALUES.includes(alternateValue)) {
                newAttr.value.expression.alternate.value = isHeadingComponent
                  ? HEADING_MAPPING[alternateValue]
                  : TEXT_MAPPING[alternateValue];
              }

              return newAttr;
            }

            throw new Error(
              `Manually check any Heading and Text non-literal properties for size and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
            );
          }

          if (attr?.name?.name === 'size' && CURRENT_SIZE_VALUES.includes(attr?.value?.value)) {
            const newAttr = attr;
            newAttr.value.value = isHeadingComponent
              ? HEADING_MAPPING[attr?.value?.value]
              : TEXT_MAPPING[attr?.value?.value];
            return newAttr;
          }
          return attr;
        })
        .filter(Boolean);

      return null;
    })
    .toSource();
}
