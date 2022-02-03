/*
 * Converts
 *   size="sm"|"md"|"lg"
 * to
 *   size="100"|"200"|"300"
 * for Text elements
 * and
 * Converts
 *   size="sm"|"md"|"lg"
 * to
 *   size="400"|"500"|"600"
 * for Heading elements
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/45.0.0/replace-typography-sizes.js relative/path/to/your/code

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  const TEXT_MAPPING = {
    'sm': '100',
    'md': '200',
    'lg': '300',
  };
  const HEADING_MAPPING = {
    'sm': '400',
    'md': '500',
    'lg': '600',
  };
  let localIdentifierNames;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    localIdentifierNames = decl.specifiers
      .filter((node) => ['Heading', 'Text'].includes(node.imported?.name))
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
          `Remove Dynamic Heading and Text properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
        );
      }

      node.openingElement.attributes = attrs
        .map((attr) => {
          if (attr?.name?.name === 'size' && ['sm', 'md', 'lg'].includes(attr?.value?.value)) {
            const newAttr = attr;
            newAttr.value.value =
              node.openingElement.name.name === 'Heading'
                ? HEADING_MAPPING[attr?.value?.value]
                : TEXT_MAPPING[attr?.value?.value];
            return newAttr;
          }
          return attr;
        })
        .filter(Boolean);

      return null;
    })
    .toSource();
}
