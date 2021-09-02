/*
 * Converts
 *  <Toast color="red" /> to <Toast variant="error" />
 *  <Toast color="white" /> to <Toast variant="default" />
 *  <Toast color={color} /> to console.log for manual change />
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/next/toast-replace-color-variant.js relative/path/to/your/code

function getNewAttr({ attr, j, previousValue }) {
  const newAttr = { ...attr };
  newAttr.name.name = 'variant';
  const newValue = previousValue === 'red' ? 'error' : 'default';
  newAttr.value = j.stringLiteral(newValue);
  return newAttr;
}

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;
  let fileHasModifications = false;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    // Not Gestalt, bail
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    // Find the local names of Toast imports
    localIdentifierName = decl.specifiers
      .filter((node) => node.imported.name === 'Toast')
      .map((node) => node.local.name);
    return null;
  });

  // No Toast imports, bail
  if (!localIdentifierName) {
    return null;
  }

  const transform = src
    .find(j.JSXElement)
    .forEach((jsxElement) => {
      const { node } = jsxElement;

      if (!localIdentifierName.includes(node.openingElement.name.name)) {
        return null;
      }

      const attrs = node.openingElement.attributes;

      if (attrs.some((attr) => attr.type === 'JSXSpreadAttribute')) {
        throw new Error(
          `Remove dynamic Toast properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      const newAttrs = attrs
        .map((attr) => {
          const propName = attr?.name?.name;

          // Not truncate, bail
          if (propName !== 'color') {
            return attr;
          }

          const valueType = attr.value.type;

          // string literal
          if (valueType === 'Literal') {
            const propValue = attr.value.value;

            if (['red', 'white'].includes(propValue)) {
              // prop="valid"
              return getNewAttr({ attr, j, previousValue: propValue });
            }
            // prop="invalid" OR prop=""
            // eslint-disable-next-line no-console
            console.log(
              `${node.openingElement.name.name} component with ${attr?.name?.name} prop used an invalid or empty value. Removing prop. Location: ${file.path} @line: ${node.loc.start.line}`,
            );
            return null;
          }

          // expression
          if (valueType === 'JSXExpressionContainer') {
            const expressionValue = attr?.value?.expression?.value;
            const variableName = attr?.value?.expression?.name;

            // prop={undefined} OR prop={null}
            if (variableName === 'undefined' || expressionValue === null) {
              // eslint-disable-next-line no-console
              console.log(
                `${node.openingElement.name.name} component with ${attr?.name?.name} prop passed "undefined" or "null". Removing prop. Location: ${file.path} @line: ${node.loc.start.line}`,
              );
              return null;
            }

            // prop={'valid'}
            if (['red', 'white'].includes(expressionValue)) {
              return getNewAttr({ attr, j, previousValue: expressionValue });
            }

            // prop={variable} OR prop={condition ? A : B} OR any other expression
            // eslint-disable-next-line no-console
            console.log(
              `${node.openingElement.name.name} component with ${attr?.name?.name} prop used a dynamic value. Please convert to "variant" manually. Location: ${file.path} @line: ${node.loc.start.line}`,
            );
            return attr;
          }

          // eslint-disable-next-line no-console
          console.log(
            `${node.openingElement.name.name} component with ${attr?.name?.name} prop of unknown type must be converted to variant manually. Location: ${file.path} @line: ${node.loc.start.line}`,
          );
          return attr;
        })
        .filter(Boolean);

      fileHasModifications = true;
      node.openingElement.attributes = newAttrs;

      return null;
    })
    .toSource();

  return fileHasModifications ? transform : null;
}
