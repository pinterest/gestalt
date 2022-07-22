/*
 * Converts
 *  <Flex gap={3} /> to <Flex gap={{ row: 3, column: 0 }} />
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/33.0.0/heading-replace-truncate-lineClamp.js relative/path/to/your/code

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

    // Find the local names of Flex imports
    localIdentifierName = decl.specifiers
      .filter((node) => node.imported.name === 'Flex')
      .map((node) => node.local.name);
    return null;
  });

  // No Flex imports, bail
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
          `Remove dynamic Flex properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      const directionAttr = attrs.find((attr) => attr?.name?.name === 'direction');
      const directionAttrValue = directionAttr?.value?.value;
      // We need to know the `direction` value to determine if we're setting row or column gap, so a dynamic direction must be dealt with manually
      if (directionAttr && !directionAttrValue) {
        // eslint-disable-next-line no-console
        console.log(
          `${node.openingElement.name.name} components with dynamic "direction" prop must be converted to the new "gap" format manually (number -> object). Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }
      const directionValue = directionAttrValue ?? 'row';

      const newAttrs = attrs
        .map((attr) => {
          const propName = attr?.name?.name;

          // Not gap, bail
          if (propName !== 'gap') {
            return attr;
          }

          let newValNode;
          const blankValNode = j.literal(0);

          // gap={3}
          if (attr?.value?.expression?.value !== undefined) {
            newValNode = j.literal(attr?.value.expression.value);
          }

          // gap={someVar}
          if (attr?.value?.expression?.name !== undefined) {
            newValNode = j.identifier(attr?.value.expression.name);
          }

          // ternaries
          if (attr?.value?.expression?.type === 'ConditionalExpression') {
            newValNode = attr?.value.expression;
          }

          if (newValNode) {
            const newAttr = { ...attr };
            newAttr.value = j.jsxExpressionContainer(
              j.objectExpression([
                j.property(
                  'init',
                  j.identifier('row'),
                  directionValue === 'row' ? newValNode : blankValNode,
                ),
                j.property(
                  'init',
                  j.identifier('column'),
                  directionValue === 'column' ? newValNode : blankValNode,
                ),
              ]),
            );
            return newAttr;
          }

          // This should never be reached
          // eslint-disable-next-line no-console
          console.log(
            `${node.openingElement.name.name} components with unknown issues must be converted to the new "gap" format manually (number -> object). Location: ${file.path} @line: ${node.loc.start.line}`,
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
