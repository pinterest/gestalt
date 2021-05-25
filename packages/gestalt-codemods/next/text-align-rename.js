/*
 * Converts
 *   align="left"|"right"
 * to
 *   align="start"|"end"
 * for Heading, Modal, and Text elements.
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/next/text-align-rename.js relative/path/to/your/code

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierNames;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    localIdentifierNames = decl.specifiers
      .filter((node) => ['Heading', 'Modal', 'Text'].includes(node.imported?.name))
      .map((node) => node.local?.name);

    return null;
  });

  if (!localIdentifierNames || localIdentifierNames.length === 0) {
    return null;
  }

  return src
    .find(j.JSXElement)
    .forEach((jsxElement) => {
      const { node } = jsxElement;

      if (!localIdentifierNames.includes(node.openingElement.name.name)) {
        return null;
      }

      const attrs = node.openingElement.attributes;

      if (attrs.some((attr) => attr.type === 'JSXSpreadAttribute')) {
        throw new Error(
          `Remove Dynamic Text properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      node.openingElement.attributes = attrs
        .map((attr) => {
          if (attr?.name?.name === 'align' && ['left', 'right'].includes(attr?.value?.value)) {
            const newAttr = attr;
            newAttr.value.value = attr.value.value === 'left' ? 'start' : 'end';
            return newAttr;
          }
          return attr;
        })
        .filter(Boolean);

      return null;
    })
    .toSource();
}
