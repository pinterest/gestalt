/*
* Rename prop 'shape' to 'corners' for Box, Square, Mask and Touchable components
* Ex
* <Box shape="circle"/>
* to
* <Box corners="circle"/>
*
* */

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;
  const components = ['Box', 'Square', 'Mask', 'Touchable'];

  src.find(j.ImportDeclaration).forEach(path => {
    const decl = path.node;

    const specifier = decl.specifiers.find(node =>
      components.includes(node.local.name)
    );
    if (!specifier) {
      return;
    }
    localIdentifierName = specifier.local.name;
  });

  return src
    .find(j.JSXElement)
    .forEach(path => {
      const { node } = path;
      if (node.openingElement.name.name !== localIdentifierName) {
        return;
      }

      node.openingElement.attributes = node.openingElement.attributes.map(
        attr => {
          if (attr.name && attr.name.name && attr.name.name === 'shape') {
            const attribute = attr;
            attribute.name.name = 'corners';
            return attribute;
          }
          return attr;
        }
      );
      j(path).replaceWith(node);
    })
    .toSource();
}
