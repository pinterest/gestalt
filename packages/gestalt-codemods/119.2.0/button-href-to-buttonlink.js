/*
 * Converts
 *  <Button role={'link'} selected ... /> to <ButtonLink ... />
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/119.2.0/button-href-to-buttonlink.js relative/path/to/your/code

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierNames;
  let codeHasChanged = false;
  const newImports = [];
  const OLD_NAME = 'Button';
  const NEW_NAME = 'ButtonLink';

  const imports = src.find(j.ImportDeclaration);

  imports.forEach((path) => {
    const decl = path.node;
    // Not Gestalt, bail
    if (decl.source.value !== 'gestalt') {
      return;
    }

    // Find the local names of Button imports
    localIdentifierNames = decl.specifiers
      .filter((node) => node.imported?.name === OLD_NAME)
      .map((node) => node.local.name);
  });

  if (!localIdentifierNames || localIdentifierNames.length === 0) {
    // Not imported, bail
    return null;
  }

  const transform = src
    .find(j.JSXElement)
    .forEach((path, idx, array) => {
      const { node } = path;
      let elementHasChanged = false;

      // If current element is Button
      if (localIdentifierNames.includes(node.openingElement.name.name)) {
        const attrs = node.openingElement.attributes;

        // Map through existing attributes, removing role='link'
        let newAttrs = attrs
          .map((attr) => {
            const propName = attr?.name?.name;

            // Not `role='link'`, bail
            // TODO: check if attr?.value?.expression?.type is a constant or variable
            if (propName !== 'role' || attr?.value?.value !== 'link') {
              return attr;
            }

            // Flag as modified and remove role='link'
            elementHasChanged = true;
            codeHasChanged = true;
            return null;
          })
          .filter(Boolean);

        // Remove incompatible props if role='link'
        if (elementHasChanged) {
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

          // Rename Button to ButtonLink
          node.openingElement.name = NEW_NAME;
          if (node.closingElement) {
            node.closingElement.name = NEW_NAME;
          }
          j(path).replaceWith(node);
          node.openingElement.attributes = newAttrs;

          // Either add a import for Button or ButtonLink
          newImports.push(j.importSpecifier(j.identifier('ButtonLink')));
        } else {
          newImports.push(j.importSpecifier(j.identifier('Button')));
        }
      }

      if (idx === array.length - 1 && newImports.length > 0) {
        // Update imports
        imports.forEach((importPath) => {
          const decl = importPath.node;
          // Not Gestalt, bail
          if (decl.source.value !== 'gestalt') {
            return;
          }
          // Filter out old Button imports
          let newSpecifiers = decl.specifiers
            .filter((specifier) => specifier.imported.name !== 'Button')
            .concat(newImports);

          // Remove duplicates
          newSpecifiers = newSpecifiers.filter(
            (newImport, i, a) =>
              i === a.findIndex((oldImport) => oldImport.imported.name === newImport.imported.name),
          );

          // Sort all the imports alphabetically and replace old import list with new
          newSpecifiers.sort((a, b) => a.imported.name.localeCompare(b.imported.name));
          const newNode = j.importDeclaration(newSpecifiers, j.literal('gestalt'));
          j(importPath).replaceWith(newNode);
        });
      }

      // Not Button, bail
      return null;
    })
    .toSource({ quote: 'single' });

  return codeHasChanged ? transform : null;
}
