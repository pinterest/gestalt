/**
 * @fileoverview Prefer Box: prevent <div> tags that don't contain disallowed attributes: className, onClick, or disallowed props on `Box` (no-box-disallowed-props ESLint rule)
 */

import {
  renameTagFixer,
  renameTagWithPropsFixer,
  updateGestaltImportFixer,
} from './helpers/eslintASTFixers';
import {
  buildProps,
  getNodeFromPropName,
  getTextNodeFromSourceCode,
  hasAriaAttributes,
  hasAttributes,
  hasImport,
  hasLonelyAttribute,
  hasSpreadAttributes,
  hasUnsupportedAttributes,
  isTag,
} from './helpers/eslintASTHelpers';
import { type ESLintRule } from './helpers/eslintFlowTypes';
import { allowedBaseProps } from './no-box-disallowed-props';

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        "Prefer Box: prevent <div> tags that don't contain disallowed attributes: className, onClick. Use Gestalt Box, instead",
      category: 'Gestalt alternatives',
      recommended: true,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltprefer-box-no-disallowed',
    },
    fixable: 'code',
    schema: [],
    messages: {
      disallowedLonelyRef: `Use <Box ref={ref}></Box> or other Gestalt components that support ref.`,
      disallowed: `Use <Box></Box>.`,
    },
  },

  create(context) {
    // @ts-expect-error - TS7034 - Variable 'programNode' implicitly has type 'any' in some locations where its type cannot be determined.
    let programNode;
    // @ts-expect-error - TS7034 - Variable 'gestaltImportNode' implicitly has type 'any' in some locations where its type cannot be determined.
    let gestaltImportNode;
    let importFixerRun = false;

    // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
    const importDeclarationFnc = (node) => {
      if (!node) return;

      const isGestaltImportNode = hasImport({ importNode: node, path: 'gestalt' });

      if (!isGestaltImportNode) return;

      gestaltImportNode = node;
    };

    // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
    const jSXElementFnc = (node) => {
      const boxDisallowedAttributes = ['className', 'onClick'];

      const ignoreEslintPluginJsxA11yConflictingAttributes = [
        'role',
        'onMouseOver',
        'onMouseOut',
        'accessKey',
        'autoFocus',
        'tabIndex',
      ];

      const ignoreAttributes = [
        ...boxDisallowedAttributes,
        ...ignoreEslintPluginJsxA11yConflictingAttributes,
      ];

      // First, exit if div should stay unmodified
      if (
        !isTag({ elementNode: node.openingElement, tagName: 'div' }) ||
        hasSpreadAttributes({ elementNode: node.openingElement }) ||
        hasAttributes({
          elementNode: node.openingElement,
          tagName: 'div',
          attributes: ignoreAttributes,
        }) ||
        hasUnsupportedAttributes({
          elementNode: node.openingElement,
          tagName: 'div',
          // "style" is included as supportedAttributes because it'll be replaced with dangerouslySetInlineStyle
          supportedAttributes: [...allowedBaseProps, 'style'],
        }) ||
        hasAriaAttributes({
          elementNode: node.openingElement,
          tagName: 'div',
        })
      ) {
        return null;
      }

      // Second, handle no lonely ref cases
      if (
        hasLonelyAttribute({ elementNode: node.openingElement, tagName: 'div', attribute: 'ref' })
      ) {
        return context.report({
          node,
          messageId: 'disallowedLonelyRef',
          // @ts-expect-error - TS7006 - Parameter 'fixer' implicitly has an 'any' type.
          fix: (fixer) => {
            const tagFixers = renameTagFixer({
              context,
              elementNode: node,
              fixer,
              // @ts-expect-error - TS7005 - Variable 'gestaltImportNode' implicitly has an 'any' type.
              gestaltImportNode,
              newComponentName: 'Box',
              tagName: 'div',
            });

            const importFixers = updateGestaltImportFixer({
              // @ts-expect-error - TS7005 - Variable 'gestaltImportNode' implicitly has an 'any' type.
              gestaltImportNode,
              fixer,
              newComponentName: 'Box',
              // @ts-expect-error - TS7005 - Variable 'programNode' implicitly has an 'any' type.
              programNode,
            });

            const fixers = !importFixerRun ? [...tagFixers, importFixers] : tagFixers;
            importFixerRun = true;
            return fixers;
          },
        });
      }

      // Last, handle allowed div modifications
      const styleNode = getNodeFromPropName({ elementNode: node, propName: 'style' });
      const propsToAdd = styleNode
        ? getTextNodeFromSourceCode({ context, elementNode: styleNode }).replace(
            // eslint-disable-next-line prefer-regex-literals
            new RegExp(/style={([\w \W \d \s]+)}/, 'i'), // regex expression to match style={{ [key]: values }}
            (match, p1) => `dangerouslySetInlineStyle={{ __style: ${p1} }}`, // replacer function p1 returns the match between '()' in the RegExp
          )
        : undefined;

      // For any other div tag where there's neither className nor lonely ref attributes
      return context.report({
        node,
        messageId: 'disallowed',
        // @ts-expect-error - TS7006 - Parameter 'fixer' implicitly has an 'any' type.
        fix: (fixer) => {
          const tagFixers = renameTagWithPropsFixer({
            context,
            elementNode: node,
            fixer,
            // @ts-expect-error - TS7005 - Variable 'gestaltImportNode' implicitly has an 'any' type.
            gestaltImportNode,
            newComponentName: 'Box',
            modifiedPropsString: buildProps({
              context,
              elementNode: node,
              propSorting: false,
              propsToAdd,
              propsToRemove: ['style'],
            }),
            tagName: 'div',
          });

          const importFixers = updateGestaltImportFixer({
            // @ts-expect-error - TS7005 - Variable 'gestaltImportNode' implicitly has an 'any' type.
            gestaltImportNode,
            fixer,
            newComponentName: 'Box',
            // @ts-expect-error - TS7005 - Variable 'programNode' implicitly has an 'any' type.
            programNode,
          });

          const fixers = !importFixerRun ? [...tagFixers, importFixers] : tagFixers;
          importFixerRun = true;
          return fixers;
        },
      });
    };

    return {
      // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
      Program: (node) => {
        programNode = node;
      },
      ImportDeclaration: importDeclarationFnc,
      JSXElement: jSXElementFnc,
    };
  },
};

export default rule;
