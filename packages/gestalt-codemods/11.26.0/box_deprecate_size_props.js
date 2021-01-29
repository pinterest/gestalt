/*
 * Converts
 *  <Box xs={{ column: 12, display: "flex" }}>
 *   <RenamedBox md={{ column: 12, display: false }} />
 *   <RenamedBox sm={{ column: 12, display: "flexColumn" }} />
 *   <RenamedBox lg={{ column: 12, display: true }} />
 *  </Box>
 * To
 * <Box column={12} display="flex">
 *  <RenamedBox mdColumn={12} mdDisplay="none" />
 *  <RenamedBox smColumn={12} smDisplay="flex" smDirection="column" />
 *  <RenamedBox lgColumn={12} />
 * </Box>
 */

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;
  let fileHasModifications = false;

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

      const newAppendAttr = [];

      const buildProp = (attr, property) => {
        return j.jsxIdentifier(
          attr.name.name === 'xs'
            ? property.key.name
            : `${attr.name.name}${
                property.key.name.charAt(0).toUpperCase() + property.key.name.slice(1)
              }`,
        );
      };

      const buildValue = (property) => {
        if (typeof property.value.value === 'string') {
          return j.literal(property.value.value);
        }

        if (typeof property.value.value === 'number') {
          return j.jsxExpressionContainer(j.literal(property.value.value));
        }
        return null;
      };

      const buildAttribute = (attr, property) => {
        if (typeof property.value.value === 'boolean' && property.value.value) {
          return null;
        }

        if (typeof property.value.value === 'boolean' && !property.value.value) {
          return j.jsxAttribute(buildProp(attr, property), j.literal('none'));
        }

        if (typeof property.value.value === 'string' && property.value.value === 'flexColumn') {
          return [
            j.jsxAttribute(buildProp(attr, property), j.literal('flex')),
            j.jsxAttribute(
              j.jsxIdentifier(attr.name.name === 'xs' ? 'direction' : `${attr.name.name}Direction`),
              j.literal('column'),
            ),
          ];
        }

        return j.jsxAttribute(buildProp(attr, property), buildValue(property));
      };

      const newAttrs = attrs
        .map((attr) => {
          if (attr?.name?.name && ['xs', 'sm', 'md', 'lg'].includes(attr.name.name)) {
            if (
              attr.value.type !== 'JSXExpressionContainer' ||
              attr.value.expression.type !== 'ObjectExpression'
            ) {
              throw new Error(
                `Replace deprecated ${attr.name.name} prop manually. Location: ${file.path} @line: ${node.loc.start.line}`,
              );
            }
            attr.value.expression.properties.forEach((property) => {
              if (property.value.type !== 'Literal') {
                throw new Error(
                  `Replace deprecated ${attr.name.name} prop manually. Location: ${file.path} @line: ${node.loc.start.line}`,
                );
              }
              const newAttribute = buildAttribute(attr, property);
              const pushAttr = (atr) =>
                Array.isArray(atr) ? newAppendAttr.push(...atr) : newAppendAttr.push(atr);
              return newAttribute ? pushAttr(newAttribute) : null;
            });

            return null;
          }
          return attr;
        })
        .filter(Boolean);

      fileHasModifications = true;
      node.openingElement.attributes = [...newAppendAttr, ...newAttrs];
      return null;
    })
    .toSource();

  return fileHasModifications ? transform : null;
}
