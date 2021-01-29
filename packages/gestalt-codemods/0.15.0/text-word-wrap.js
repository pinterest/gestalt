export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifier;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'pinterest-gestalt') {
      return;
    }
    const specifier = decl.specifiers.find((node) => node.imported.name === 'Text');
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

      node.openingElement.attributes = node.openingElement.attributes.map((attr) => {
        if (attr.name.name === 'overflow' && attr.value.value === 'break-word') {
          return j.jsxAttribute(j.jsxIdentifier('overflow'), j.literal('breakWord'));
        }
        return attr;
      });

      j(path).replaceWith(node);
    })
    .toSource();
}
