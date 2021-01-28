/**
 * Converts
 *  <Icon icon="check-circle-bold" />
 *  <Icon icon="check-circle-light" />
 * to
 *  <Icon icon="check-circle" />
 */

const iconsToReplace = ['check-circle-bold', 'check-circle-light'];

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    const specifier = decl.specifiers.find((node) => node.imported.name === 'Icon');
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

      node.openingElement.attributes = node.openingElement.attributes.map((attr) => {
        if (attr.name && attr.name.name && attr.name.name === 'icon') {
          const attribute = attr;
          const { value } = attribute.value;

          if (iconsToReplace.includes(value)) {
            attribute.value.value = 'check-circle';
            return attribute;
          }
        }
        return attr;
      });

      j(path).replaceWith(node);
    })
    .toSource();
}
