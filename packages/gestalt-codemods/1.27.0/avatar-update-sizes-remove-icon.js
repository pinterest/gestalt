/**
 * Converts
 *  <Avatar size="sm" />
 *  <Avatar size="md" />
 *  <GroupAvatar size="sm" />
 *  <GroupAvatar size="md" />
 *  <Avatar icon="pinterest" />
 * to
 *  <Avatar size="xs" />
 *  <Avatar size="sm" />
 *  <GroupAvatar size="xs" />
 *  <GroupAvatar size="sm" />
 *  <Avatar />
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierAvatar;
  let localIdentifierGroupAvatar;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    const avatarSpecifier = decl.specifiers.find((node) => node.imported.name === 'Avatar');
    const groupAvatarSpecifier = decl.specifiers.find(
      (node) => node.imported.name === 'GroupAvatar',
    );
    if (!avatarSpecifier && !groupAvatarSpecifier) {
      return;
    }
    localIdentifierAvatar = avatarSpecifier?.local.name;
    localIdentifierGroupAvatar = groupAvatarSpecifier?.local.name;
  });

  let hasModifications = false;

  const transform = src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;

      if (
        node.openingElement.name.name !== localIdentifierAvatar &&
        node.openingElement.name.name !== localIdentifierGroupAvatar
      ) {
        return;
      }

      const hasSize = node.openingElement.attributes.find(
        (attr) => attr.name && attr.name.name === 'size',
      );
      const hasIcon = node.openingElement.attributes.find(
        (attr) => attr.name && attr.name.name === 'icon',
      );

      if (!hasSize && !hasIcon) {
        return;
      }

      node.openingElement.attributes = node.openingElement.attributes
        .map((attr) => {
          if (attr.name && attr.name.name === 'size' && attr.value.value) {
            if (attr.value.value === 'sm') {
              return j.jsxAttribute(j.jsxIdentifier('size'), j.literal('xs'));
            }
            if (attr.value.value === 'md') {
              return j.jsxAttribute(j.jsxIdentifier('size'), j.literal('sm'));
            }
          }
          if (attr.name && attr.name.name === 'icon') {
            return null;
          }
          return attr;
        })
        .filter(Boolean);

      j(path).replaceWith(node);

      hasModifications = true;
    })
    .toSource();

  return hasModifications ? transform : null;
}
