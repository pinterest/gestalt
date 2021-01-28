/**
 * Converts
 *  <Avatar src="" size="xs" />
 *  <Avatar src="" size="sm" />
 *  <Avatar src="" size="md" />
 * to
 *  <Avatar src="" size="sm" />
 *  <Avatar src="" size="md" />
 *  <Avatar src="" size="lg" />
 *
 * Previous `lg` and `xl` Avatar's should manually be converted to a column based Avatar
 */

const convertSizes = {
  xs: 'sm',
  sm: 'md',
  md: 'lg',
};

const invalidSizes = ['lg', 'xl'];

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    const specifier = decl.specifiers.find((node) => node.imported.name === 'Avatar');
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
        if (attr.name && attr.name.name && attr.name.name === 'size') {
          const attribute = attr;
          const { value } = attribute.value;

          if (convertSizes[value]) {
            attribute.value.value = convertSizes[value];
            return attribute;
          }
          if (invalidSizes.includes(value)) {
            throw new Error(
              `
                ${file.path}
                Manually convert the Avatar size: "${value}" to a column based size
                `,
            );
          }
        }
        return attr;
      });

      j(path).replaceWith(node);
    })
    .toSource();
}
