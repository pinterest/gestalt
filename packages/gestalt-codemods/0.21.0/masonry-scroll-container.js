export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);

  const isNull = (expression) => expression.type === 'Literal' && expression.raw === 'null';
  const isUndefined = (expression) =>
    expression.type === 'Identifier' && expression.name === 'undefined';

  // inserts a default scroll container attribute
  // scrollContainer={ () => window }
  const insertDefaultScrollContainer = (attributes) =>
    attributes.concat(
      j.jsxAttribute(
        j.jsxIdentifier('scrollContainer'),
        j.jsxExpressionContainer(j.arrowFunctionExpression([], j.identifier('window'))),
      ),
    );

  // updates existing scroll container values
  const updateValue = (expression) => {
    switch (expression.type) {
      // before: scrollContainer={ condition ? a : undefined }
      // after: scrollContainer={ condition ? a : window }
      case 'ConditionalExpression': {
        const { alternate, consequent, test } = expression;
        const newAlternate =
          isNull(alternate) || isUndefined(alternate) ? j.identifier('window') : alternate;
        const newConsequent =
          isNull(consequent) || isUndefined(consequent) ? j.identifier('window') : consequent;
        return j.conditionalExpression(test, newConsequent, newAlternate);
      }
      // before: scrollContainer={ foo }
      // after: scrollContainer={ foo || window }
      case 'Literal':
      case 'Identifier':
      case 'MemberExpression':
        return j.logicalExpression('||', expression, j.identifier('window'));
      default: // no-op
    }

    return expression;
  };

  // updates existing scroll container attributes
  // before: scrollContainer={ expression }
  // after: scrollContainer={ () => expression }
  const updateExistingScrollContainer = (attributes) =>
    attributes.map((attr) => {
      if (attr.name.name !== 'scrollContainer') {
        return attr;
      }
      const updatedValue = updateValue(attr.value.expression);
      // eslint-disable-next-line no-param-reassign
      attr.value.expression = j.arrowFunctionExpression([], updatedValue);
      return attr;
    });

  const specifier = src
    .find(j.ImportDeclaration, { source: { value: 'gestalt' } })
    .find(j.ImportSpecifier, { imported: { name: 'Masonry' } });

  if (!specifier.length) {
    return j(file.source).toSource();
  }

  const { name } = specifier.nodes()[0].local;
  return j(file.source)
    .find(j.JSXOpeningElement, { name: { name } })
    .forEach((path) => {
      const { node } = path;
      const { attributes } = node;

      const hasScrollContainerAttribute = attributes.some(
        (attribute) => attribute.name.name === 'scrollContainer',
      );

      node.attributes = hasScrollContainerAttribute
        ? updateExistingScrollContainer(attributes) // case 1: Existing scroll container attribute
        : insertDefaultScrollContainer(attributes); // case 2: No scoll container attribute
    })
    .toSource();
}
