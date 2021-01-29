export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifier;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'pinterest-gestalt') {
      return;
    }
    const specifier = decl.specifiers.find((node) => node.imported.name === 'Icon');
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
      if (attrs.some((attr) => attr.name.name === 'label')) {
        node.openingElement.attributes = attrs.map((attr) => {
          const attribute = attr;
          if (attribute.name.name === 'label') {
            attribute.name.name = 'ariaLabel';
          }
          return attribute;
        });
      }
    })
    .toSource();
}
