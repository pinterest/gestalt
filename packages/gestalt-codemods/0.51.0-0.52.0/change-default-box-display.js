/**
 * Converts
 *  <Box display="flex" />
 * to
 *  <Box direction="row" />
 *
 * Converts
 *  <Box display="flex" direction="column" />
 * to
 *  <Box direction="column" />
 *
 * Converts
 *  <Box />
 * to
 *  <Box display="block" />
 */
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;

  src.find(j.ImportDeclaration).forEach(path => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    const specifier = decl.specifiers.find(
      node => node.imported.name === 'Box'
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

      const attrs = node.openingElement.attributes;

      const indexDisplay = attrs.findIndex(
        attr => attr.name.name === 'display'
      );
      const indexDirection = attrs.findIndex(
        attr => attr.name.name === 'direction'
      );

      if (indexDisplay === -1) {
        // Add display=block if display tag is missing
        attrs.push(
          j.jsxAttribute(j.jsxIdentifier('display'), j.literal('block'))
        );
      } else if (
        attrs[indexDisplay] &&
        attrs[indexDisplay].value &&
        attrs[indexDisplay].value.value === 'flex'
      ) {
        // Remove display tag if display=flex is present
        // Add direction=row if direction tag is missing
        attrs.splice(indexDisplay, 1);
        if (indexDirection === -1) {
          attrs.push(
            j.jsxAttribute(j.jsxIdentifier('direction'), j.literal('row'))
          );
        }
      }

      j(path).replaceWith(node);
    })
    .toSource();
}
