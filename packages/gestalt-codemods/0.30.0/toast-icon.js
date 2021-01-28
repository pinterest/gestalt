/**
 * Converts
 * <Toast text="" thumbnail={}/>
 * to
 * <Toast icon="arrow-circle-forward" text="" thumbnail={}/>
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'app/common/react/ui/Toast/Toast') {
      return;
    }

    const specifier = decl.specifiers.find((node) => node.local.name === 'Toast');
    if (!specifier) {
      return;
    }
    localIdentifierName = specifier.local.name;
  });

  return src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;

      if (
        !node.openingElement.name ||
        !localIdentifierName ||
        node.openingElement.name.name !== localIdentifierName
      ) {
        return;
      }

      const attrs = node.openingElement.attributes;
      attrs.push(j.jsxAttribute(j.jsxIdentifier('icon'), j.literal('arrow-circle-forward')));

      j(path).replaceWith(node);
    })
    .toSource();
}
