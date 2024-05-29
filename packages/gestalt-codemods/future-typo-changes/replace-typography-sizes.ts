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
// yarn codemod --parser=tsx -t=packages/gestalt-codemods/future-typo-changes/replace-typography-sizes.ts relative/path/to/your/code
import { API, FileInfo } from 'jscodeshift/src/core';

export default function transformer(file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const src = j(file.source);
  const TEXT_MAPPING: { [size: string]: string } = {
    'sm': '100',
    'md': '200',
    'lg': '300',
  };
  const HEADING_MAPPING: { [size: string]: string } = {
    'sm': '400',
    'md': '500',
    'lg': '600',
  };
  const CURRENT_SIZE_VALUES = ['sm', 'md', 'lg'] as const;

  let localIdentifierNames: ReadonlyArray<string | undefined> | undefined;

  src.find(j.ImportDeclaration).forEach((path) => {
    const decl = path.node;
    if (decl.source.value !== 'gestalt') {
      return null;
    }

    localIdentifierNames = decl.specifiers
      ?.filter((node) =>
        ['Heading', 'Text'].includes(
          // @ts-expect-error - TS2339
          node.imported?.name,
        ),
      )
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

      // @ts-expect-error - TS2339
      if (!localIdentifierNames?.includes(node.openingElement.name.name)) {
        return null;
      }

      const attrs = node.openingElement.attributes;

      if (attrs?.some((attr) => attr.type === 'JSXSpreadAttribute')) {
        throw new Error(
          `Remove Dynamic Heading and Text properties and rerun codemod. Location: ${file.path} @line: ${node.loc?.start.line}`,
        );
      }

      // @ts-expect-error - TS2339
      const isHeadingComponent = node.openingElement.name.name.includes('Heading');

      // @ts-expect-error - TS2322
      node.openingElement.attributes = attrs
        ?.map((attr) => {
          if (!attr) {
            return false;
          }
          // @ts-expect-error - TS2339
          const { name, value } = attr;
          if (name?.name === 'size' && value.type === 'JSXExpressionContainer') {
            if (
              value.expression.type === 'ConditionalExpression' &&
              (CURRENT_SIZE_VALUES.includes(value.expression.consequent?.value) ||
                CURRENT_SIZE_VALUES.includes(value.expression.alternate?.value))
            ) {
              const consequentValue = value.expression.consequent.value;
              const alternateValue = value.expression.alternate.value;

              if (CURRENT_SIZE_VALUES.includes(consequentValue)) {
                value.expression.consequent.value = isHeadingComponent
                  ? HEADING_MAPPING[consequentValue]
                  : TEXT_MAPPING[consequentValue];

                if (CURRENT_SIZE_VALUES.includes(alternateValue)) {
                  value.expression.alternate.value = isHeadingComponent
                    ? HEADING_MAPPING[alternateValue]
                    : TEXT_MAPPING[alternateValue];

                  // prop={condition ? "sm" : "md"}
                  return attr;
                }
                // prop={condition ? "sm" : B}
                // eslint-disable-next-line no-console
                console.log(
                  `Manually check any Heading and Text non-literal properties for size and rerun codemod. Location: ${file.path} @line: ${node.loc?.start.line}`,
                );
                return attr;
              }

              if (CURRENT_SIZE_VALUES.includes(alternateValue)) {
                value.expression.alternate.value = isHeadingComponent
                  ? HEADING_MAPPING[alternateValue]
                  : TEXT_MAPPING[alternateValue];
                // prop={condition ? A : "md"}
                // eslint-disable-next-line no-console
                console.log(
                  `Manually check any Heading and Text non-literal properties for size and rerun codemod. Location: ${file.path} @line: ${node.loc?.start.line}`,
                );
                return attr;
              }
            }

            throw new Error(
              `Manually check any Heading and Text non-literal properties for size and rerun codemod. Location: ${file.path} @line: ${node.loc?.start.line}`,
            );
          }

          if (name?.name === 'size' && CURRENT_SIZE_VALUES.includes(value?.value)) {
            value.value = isHeadingComponent
              ? HEADING_MAPPING[value?.value]
              : TEXT_MAPPING[value?.value];
            return attr;
          }
          return attr;
        })
        .filter(Boolean);

      return null;
    })
    .toSource();
}
