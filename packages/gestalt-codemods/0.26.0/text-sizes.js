/*

Before:

    import { Text } from 'gestalt';

    <Text>Nothing</Text>;
    <Text size="xs">XS</Text>;
    <Text size="sm">XS</Text>;
    <Text size="md">XS</Text>;
    <Text size="lg">XS</Text>;
    <Text size="xl" foo="bar">XS</Text>;

After:

    import { Text } from 'gestalt';

    <Text smSize="xs" mdSize="sm" lgSize="md">Nothing</Text>;
    <Text size="xs" smSize={1} mdSize={2} lgSize="xs">XS</Text>;
    <Text size="sm" smSize={2} mdSize="xs" lgSize="sm">XS</Text>;
    <Text smSize="xs" mdSize="sm" lgSize="md">XS</Text>;
    <Text size="lg" smSize="sm" mdSize="md" lgSize="lg">XS</Text>;
    <Text foo="bar" size="xl" smSize="md" mdSize="lg" lgSize="xl">XS</Text>;
*/
const OFFSET = 3;
const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'];

export default function transformer(file, api) {
  const j = api.jscodeshift;
  const src = j(file.source);
  let localIdentifierName;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return;
    }
    const specifier = decl.specifiers.find((node) => node.local.name === 'Text');
    if (!specifier) {
      return;
    }
    localIdentifierName = specifier.local.name;
  });

  return src
    .find(j.JSXOpeningElement)
    .forEach((path) => {
      const { node } = path;

      if (!(node.name.type === 'JSXIdentifier' && node.name.name === localIdentifierName)) {
        return;
      }

      const attrs = node.attributes;
      const sizeAttr = attrs.find((attr) => attr.name.name === 'size');

      const value = (sizeAttr && sizeAttr.value.value) || 'md';
      const idx = SIZES.indexOf(value);
      const baseSize = idx + 3;

      const sm = baseSize - 2;
      const md = baseSize - 1;
      const lg = baseSize;

      const valueNode = (i) =>
        i - OFFSET >= 0 && i - OFFSET < SIZES.length
          ? j.literal(SIZES[i - OFFSET])
          : j.jsxExpressionContainer(j.literal(i));

      let newAttrs = attrs.filter((attr) => attr.name.name !== 'size');

      if (value !== 'md') {
        newAttrs = newAttrs.concat(j.jsxAttribute(j.jsxIdentifier('size'), j.literal(value)));
      }

      newAttrs = newAttrs.concat([
        j.jsxAttribute(j.jsxIdentifier('smSize'), valueNode(sm)),
        j.jsxAttribute(j.jsxIdentifier('mdSize'), valueNode(md)),
        j.jsxAttribute(j.jsxIdentifier('lgSize'), valueNode(lg)),
      ]);

      j(path).replaceWith(j.jsxOpeningElement(node.name, newAttrs, node.selfClosing));
    })
    .toSource();
}
