export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let specifiers = [];

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    specifiers = decl.specifiers.filter(
      (node) =>
        node.imported.name === 'Button' ||
        node.imported.name === 'Card' ||
        node.imported.name === 'Flyout' ||
        node.imported.name === 'Icon' ||
        node.imported.name === 'IconButton' ||
        node.imported.name === 'Modal' ||
        node.imported.name === 'Spinner',
    );
  });

  return src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;
      specifiers.forEach((specifier) => {
        const localIdentifier = specifier.local;

        if (node.openingElement.name.name !== localIdentifier.name) {
          return;
        }

        const attrs = node.openingElement.attributes;
        if (
          !attrs.some(
            (attr) =>
              attr.name.name === 'ariaExpanded' ||
              attr.name.name === 'ariaHaspopup' ||
              attr.name.name === 'label' ||
              attr.name.name === 'closeLabel' ||
              attr.name.name === 'ariaLabel',
          )
        ) {
          return;
        }
        node.openingElement.attributes = attrs.map((attr) => {
          const attribute = attr;
          if (attribute.name.name === 'ariaExpanded') {
            attribute.name.name = 'accessibilityExpanded';
          }
          if (attribute.name.name === 'ariaHaspopup') {
            attribute.name.name = 'accessibilityHaspopup';
          }
          if (attribute.name.name === 'closeLabel') {
            attribute.name.name = 'accessibilityCloseLabel';
          }
          if (attribute.name.name === 'label' || attribute.name.name === 'ariaLabel') {
            attribute.name.name = 'accessibilityLabel';
          }
          return attribute;
        });

        node.openingElement.attributes.sort((a, b) => a.name.name.localeCompare(b.name.name));
      });
    })
    .toSource();
}
