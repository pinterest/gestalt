export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifier;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'pinterest-gestalt') {
      return;
    }
    const specifier = decl.specifiers.find(
      (node) => node.imported.name === 'IconButton' || node.imported.name === 'Button',
    );
    if (!specifier) {
      return;
    }
    localIdentifier = specifier.local;
  });

  if (!localIdentifier) {
    return file.source;
  }

  const addAttribute = (attributes, attributeName, propertyValue) => {
    if (propertyValue.value === true) {
      attributes.unshift(j.jsxAttribute(j.jsxIdentifier(attributeName)));
    } else if (propertyValue.value !== false) {
      attributes.unshift(
        j.jsxAttribute(j.jsxIdentifier(attributeName), j.jsxExpressionContainer(propertyValue)),
      );
    }
  };

  return src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;

      if (node.openingElement.name.name !== localIdentifier.name) {
        return;
      }

      let hasAria = false;

      node.openingElement.attributes.forEach((attr, index, attributes) => {
        if (attr.name.name === 'aria') {
          hasAria = true;

          // Remove original `aria` attribute
          attributes.splice(index, 1);

          // Convert `aria.hasPopup` & `aria.expanded` to `aria-haspopup` & `aria-expanded`
          attr.value.expression.properties.forEach((property) => {
            if (property.key.name === 'haspopup' || property.key.name === 'expanded') {
              addAttribute(attributes, `aria-${property.key.name}`, property.value);
            }
          });
        }
      });

      if (hasAria) {
        // Sort attributes alphabetically
        node.openingElement.attributes.sort((a, b) => a.name.name.localeCompare(b.name.name));
      }

      j(path).replaceWith(node);
    })
    .toSource();
}
