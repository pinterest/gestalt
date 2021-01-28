export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifier;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    const specifier = decl.specifiers.find((node) => node.imported.name === 'Image');
    if (!specifier) {
      return;
    }
    localIdentifier = specifier.local;
  });

  return src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;

      if (node.openingElement.name.name !== localIdentifier.name) {
        return;
      }

      const attrs = node.openingElement.attributes;
      if (!attrs.some((attr) => attr.name.name === 'width' || attr.name.name === 'height')) {
        return;
      }
      node.openingElement.attributes = attrs.map((attr) => {
        const attribute = attr;
        if (attribute.name.name === 'width') {
          attribute.name.name = 'naturalWidth';
        }
        if (attribute.name.name === 'height') {
          attribute.name.name = 'naturalHeight';
        }
        return attribute;
      });

      node.openingElement.attributes.sort((a, b) => a.name.name.localeCompare(b.name.name));
    })
    .toSource();
}
