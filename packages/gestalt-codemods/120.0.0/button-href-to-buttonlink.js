/*
 * Converts
 *  <Button role={'link'} selected ... /> to <ButtonLink ... />
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/120.0.0/button-href-to-buttonlink.js relative/path/to/your/code

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierNames;
  const OLD_NAME = 'Button';
  const NEW_NAME = 'ButtonLink';

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    // Not Gestalt, bail
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    // Find the local names of Button imports
    localIdentifierNames = decl.specifiers
      .filter((node) => node.imported?.name === 'Button')
      .map((node) => node.local.name);

    const newSpecifiers = [
      // Rename Button import
      ...decl.specifiers.map((node) => {
        if (node.imported?.name === OLD_NAME) {
          if (!localIdentifierNames === OLD_NAME) {
            const importCmp = { ...node };
            importCmp.imported.name = NEW_NAME;
            return importCmp;
          }
          return j.importSpecifier(j.identifier(NEW_NAME));
        }
        return node;
      }),
    ];
    // Sort all the imports alphabetically
    newSpecifiers.sort((a, b) => a.imported.name.localeCompare(b.imported.name));

    const newNode = j.importDeclaration(newSpecifiers, j.literal('gestalt'));
    j(path).replaceWith(newNode);
    return null;
  });

  if (!localIdentifierNames || localIdentifierNames.length === 0) {
    // Not imported, bail
    return null;
  }

  let hasModifications = false;

  const transform = src
    .find(j.JSXElement)
    .forEach((path) => {
      const { node } = path;

      if (localIdentifierNames.includes(node.openingElement.name.name)) {
        const attrs = node.openingElement.attributes;

        // Map through existing attributes, removing role='link'
        let newAttrs = attrs
          .map((attr) => {
            const propName = attr?.name?.name;

            // Not `role='link'`, bail
            if (propName !== 'role' || attr?.value?.value !== 'link') {
              return attr;
            }

            hasModifications = true;
            // Remove role='link'
            return null;
          })
          .filter(Boolean);

        // Remove incompatible props if role='button'
        if (hasModifications) {
          newAttrs = newAttrs
            .map((attr) => {
              const propName = attr?.name?.name;

              // Not incompatible prop, bail
              if (propName !== 'selected') {
                return attr;
              }
              // Remove incompatible prop
              return null;
            })
            .filter(Boolean);
        }

        // Rename Button to ButtonLink
        if (hasModifications) {
          if (localIdentifierNames.includes(OLD_NAME)) {
            node.openingElement.name = NEW_NAME;
            if (node.closingElement) {
              node.closingElement.name = NEW_NAME;
            }
          }
          j(path).replaceWith(node);
          node.openingElement.attributes = newAttrs;
        }
      }

      // Not Button, bail
      return null;
    })
    .toSource({ quote: 'single' });

  return hasModifications ? transform : null;
}
