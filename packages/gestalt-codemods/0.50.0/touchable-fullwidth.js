export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  const pkg = 'gestalt';
  const component = 'Touchable';

  const locals = src
    .find(j.ImportDeclaration, {
      source: {
        value: pkg,
      },
    })
    .find(j.ImportSpecifier, {
      imported: {
        name: component,
      },
    });

  if (locals.size() === 0) {
    return src.toSource();
  }

  return src
    .find(j.JSXOpeningElement, {
      name: {
        name: locals.nodes()[0].local.name,
      },
    })
    .replaceWith((path) => {
      const { node } = path;
      const { attributes } = node;

      if (attributes.some((attr) => attr.type === 'JSXSpreadAttribute')) {
        throw new Error(
          `Dynamic Touchable properties encountered at ${file.path}:${node.loc.start.line}`,
        );
      }

      const attributesWithFullWidth = [
        ...attributes,
        j.jsxAttribute(j.jsxIdentifier('fullWidth'), j.jsxExpressionContainer(j.literal(false))),
      ];

      return j.jsxOpeningElement(
        j.jsxIdentifier(node.name.name),
        attributesWithFullWidth,
        node.selfClosing,
      );
    })
    .toSource();
}
