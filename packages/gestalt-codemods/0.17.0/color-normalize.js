export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let specifiers;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    specifiers = decl.specifiers.filter(
      (node) =>
        node.imported.name === 'Icon' ||
        node.imported.name === 'Heading' ||
        node.imported.name === 'IconButton' ||
        node.imported.name === 'Text',
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
              attr.name.name === 'color' ||
              attr.name.name === 'iconColor' ||
              attr.name.name === 'bgColor',
          )
        ) {
          return;
        }
        node.openingElement.attributes = attrs.map((attr) => {
          let attribute;
          if (
            attr.name.name === 'color' ||
            attr.name.name === 'iconColor' ||
            attr.name.name === 'bgColor'
          ) {
            attribute = attr;
          } else {
            return attr;
          }
          if (attribute.value.value === 'dark-gray') {
            attribute.value.value = 'darkGray';
          }
          if (attribute.value.value === 'light-gray') {
            attribute.value.value = 'lightGray';
          }
          return attribute;
        });

        node.openingElement.attributes.sort((a, b) => a.name.name.localeCompare(b.name.name));
      });
    })
    .toSource();
}
