/**
 * Converts
 *  <Text size={1} lgSize={10} />
 * to
 *  <Text />
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

  return src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;

      if (node.openingElement.name.name !== localIdentifierName) {
        return;
      }

      const attrs = node.openingElement.attributes;

      if (attrs.some((attr) => attr.type === 'JSXSpreadAttribute')) {
        throw new Error(
          `Dynamic Text properties encountered at ${file.path}:${node.loc.start.line.line}`,
        );
      }

      node.openingElement.attributes = attrs.map((attr) => {
        if (
          attr &&
          attr.name &&
          attr.name.name &&
          (attr.name.name === 'size' ||
            attr.name.name === 'smSize' ||
            attr.name.name === 'mdSize' ||
            attr.name.name === 'lgSize') &&
          attr.value.type === 'JSXExpressionContainer' &&
          attr.value.expression.type === 'Literal' &&
          typeof attr.value.expression.value === 'number'
        ) {
          if (attr.value.expression.value <= 2) {
            // eslint-disable-next-line no-param-reassign
            attr.value = j.stringLiteral('xs');
          } else if (attr.value.expression.value >= 8) {
            // eslint-disable-next-line no-param-reassign
            attr.value = j.stringLiteral('xl');
          }
          return attr;
        }
        return attr;
      });

      j(path).replaceWith(node);
    })
    .toSource();
}
