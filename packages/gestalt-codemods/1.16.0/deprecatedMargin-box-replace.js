/*
 * Converts
 *  <Box deprecatedMargin={3} /> to <Box margin={3}/>
 *  <Box deprecatedMargin={{ top:1 }} /> to <Box marginTop={1}/>
 *  <Box deprecatedMargin={{ left:1, right:2 }} /> to <Box marginStart={1} marginEnd={2}/>
 */

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;
  let fileHasModifications = false;

  function sideSelector(key) {
    switch (key) {
      case 'left':
        return 'marginStart';
      case 'right':
        return 'marginEnd';
      case 'top':
        return 'marginTop';
      case 'bottom':
        return 'marginBottom';
      default:
        return 'margin';
    }
  }

  function createMarginAttribute({ side = '', value }) {
    return j.jsxAttribute(
      j.jsxIdentifier(sideSelector(side)),
      j.jsxExpressionContainer(j.literal(value)),
    );
  }

  function modifyAttributes(properties) {
    const newProperties = properties.map(({ key, value }) => {
      if (value.type !== 'Literal') {
        throw new Error(`Invalid value. Location: ${value.type} @line: ${value.loc.start.line}`);
      }
      return createMarginAttribute({ side: key.name, value: value.value });
    });
    return newProperties;
  }

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    localIdentifierName = decl.specifiers
      .filter((node) => node.imported.name === 'Box')
      .map((node) => node.local.name);
    return null;
  });

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
          `Remove Dynamic ${node.openingElement.name.name} properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      let newAppendAttr = [];
      const newAttrs = attrs
        .map((attr) => {
          if (!attr?.name?.name || !['deprecatedMargin'].includes(attr.name.name)) {
            return attr;
          }

          if (attr.value.expression.type === 'ObjectExpression') {
            newAppendAttr = [
              ...newAppendAttr,
              ...modifyAttributes(attr.value.expression.properties),
            ];

            return null;
          }

          if (attr.value.expression.type === 'Literal') {
            return createMarginAttribute({
              value: attr.value.expression.value,
            });
          }

          throw new Error(
            `This attribute requires a manual fix: ${attr.value.expression.type} @line: ${node.loc.start.line}`,
          );
        })
        .filter(Boolean);

      fileHasModifications = true;
      node.openingElement.attributes = [...newAppendAttr, ...newAttrs];
      return null;
    })
    .toSource();

  return fileHasModifications ? transform : null;
}
