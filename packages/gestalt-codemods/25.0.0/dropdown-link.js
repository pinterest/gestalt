/**
  - Removes `onSelect` prop from Dropdown
  - Renames `handleSelect` prop to `onSelect` for Dropdown.Item
  - Splits out Dropdown.Item to include Dropdown.Link, ensures each contains correct props
 */

// yarn codemod --parser=flow -t=packages/gestalt-codemods/25.0.0/dropdown-link.js relative/path/to/your/code

const commonProps = ['badgeText', 'children', 'option'];
const dropdownItemProps = [...commonProps, 'onSelect', 'selected'];
const dropdownLinkProps = [...commonProps, 'href', 'isExternal', 'onClick'];

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
      .filter((node) => node.imported?.name === 'Dropdown')
      .map((node) => node.local?.name);

    return null;
  });

  // No Dropdowns here, move along
  if (!localIdentifierNames || localIdentifierNames.length === 0) {
    return null;
  }

  return src
    .find(j.JSXElement)
    .forEach((jsxElement) => {
      const { node } = jsxElement;
      const nodeName = node.openingElement.name.name;
      const nodeObjectName = node.openingElement.name.object?.name;
      // Not used, but this is where the "Item" of "Dropdown.Item" lives
      // const nodePropertyName = node.openingElement.name.property?.name;

      // We only care about Dropdown and Dropdown.____
      if (
        !localIdentifierNames.includes(nodeName) &&
        !localIdentifierNames.includes(nodeObjectName)
      ) {
        return;
      }

      const attrs = node.openingElement.attributes;

      // Dropdown
      if (nodeName) {
        if (attrs.some((attr) => attr.type === 'JSXSpreadAttribute')) {
          throw new Error(
            `Remove Dynamic Dropdown properties and rerun codemod. Location: ${file.path} @line: ${node.loc.start.line}`,
          );
        }

        // Remove Dropdown's `onSelect`
        node.openingElement.attributes = attrs.filter((attr) => attr?.name?.name !== 'onSelect');

        return;
      }

      // Dropdown.____
      if (nodeObjectName) {
        const shouldBeLink = attrs.map((attr) => attr.name.name).includes('href');

        // Current Dropdown.Item that uses an href, so needs to be converted to Dropdown.Link
        if (shouldBeLink) {
          node.openingElement.name.property.name = 'Link';
          // Remove existing props that aren't valid for Dropdown.Link
          node.openingElement.attributes = attrs.filter((attr) =>
            dropdownLinkProps.includes(attr.name.name),
          );
        } else {
          node.openingElement.attributes = attrs
            // Rename `handleSelect` to `onSelect`
            .map((attr) => {
              if (attr.name.name === 'handleSelect') {
                const newAttr = attr;
                newAttr.name.name = 'onSelect';
                return newAttr;
              }
              return attr;
            })
            // Remove existing props that aren't valid for Dropdown.Item
            .filter((attr) => dropdownItemProps.includes(attr.name.name));
        }
      }
    })
    .toSource();
}
