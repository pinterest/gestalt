export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifier;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'pinterest-gestalt') {
      return;
    }
    const specifier = decl.specifiers.find((node) => node.imported.name === 'Button');
    if (!specifier) {
      return;
    }
    localIdentifier = specifier.local;
  });

  if (!localIdentifier) {
    return file.source;
  }

  return src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;
      if (node.openingElement.name.name !== localIdentifier.name) {
        return;
      }
      const attrs = node.openingElement.attributes;
      if (attrs.some((attr) => attr.name.name === 'fullWidth')) {
        node.openingElement.attributes = attrs.filter((attr) => attr.name.name !== 'fullWidth');
      } else {
        attrs.push(j.jsxAttribute(j.jsxIdentifier('inline')));
      }

      j(path).replaceWith(node);
    })
    .toSource();
}
