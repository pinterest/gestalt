/**
 * @fileoverview Prefer Box: prevent <div> tags that don't contain disallowed attributes: className, onClick
 */

// @flow strict
import {
  buildProps,
  getNodeFromPropName,
  getTextNodeFromSourceCode,
  hasAriaAttributes,
  hasAttributes,
  hasImport,
  hasLonelyAttribute,
  hasSpreadAttributes,
  isTag,
} from './eslintASTHelpers.js';
import {
  renameTagFixer,
  renameTagWithPropsFixer,
  updateGestaltImportFixer,
} from './eslintASTFixers.js';
import { type ESLintRule } from './eslintFlowTypes.js';

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        "Prefer Box: prevent <div> tags that don't contain disallowed attributes: className, onClick. Use Gestalt Box, instead",
      category: 'Gestalt alternatives',
      recommended: true,
      url: 'https://gestalt.pinterest.systems/Eslint%20Plugin#gestaltprefer-box-no-disallowed',
    },
    fixable: 'code',
    schema: ([]: $ReadOnlyArray<empty>),
    messages: {
      disallowedLonelyRef: `Use <Box ref={ref}></Box> or other Gestalt components that support ref.`,
      disallowed: `Use <Box></Box>.`,
    },
  },

  create(context) {
    let programNode;
    let gestaltImportNode;
    let importFixerRun = false;

    const importDeclarationFnc = (node) => {
      if (!node) return;

      const isGestaltImportNode = hasImport({ importNode: node, path: 'gestalt' });

      if (!isGestaltImportNode) return;

      gestaltImportNode = node;
    };

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

      // First, return if div should stay unmodified
      if (
        !isTag({ elementNode: node.openingElement, tagName: 'div' }) ||
        hasSpreadAttributes({ elementNode: node.openingElement }) ||
        hasAttributes({
          elementNode: node.openingElement,
          tagName: 'div',
          attributes: ignoreAttributes,
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
          fix: (fixer) => {
            const tagFixers = renameTagFixer({
              context,
              elementNode: node,
              fixer,
              gestaltImportNode,
              newComponentName: 'Box',
              tagName: 'div',
            });

            const importFixers = updateGestaltImportFixer({
              context,
              gestaltImportNode,
              fixer,
              newComponentName: 'Box',
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
            new RegExp(/style={([\w \W \d \s]+)}/, 'i'), // regex expression to match style={{ [key]: values }}
            (match, p1) => `dangerouslySetInlineStyle={{ __style: ${p1} }}`, // replacer function p1 returns the match between '()' in the RegExp
          )
        : undefined;

      // For any other div tag where there's neither className nor lonely ref attributes
      return context.report({
        node,
        messageId: 'disallowed',
        fix: (fixer) => {
          const tagFixers = renameTagWithPropsFixer({
            fixedPropsString: buildProps({
              context,
              elementNode: node,
              propSorting: false,
              propsToAdd,
              propsToRemove: ['style'],
            }),
            context,
            elementNode: node,
            fixer,
            gestaltImportNode,
            newComponentName: 'Box',
            tagName: 'div',
          });

          const importFixers = updateGestaltImportFixer({
            context,
            gestaltImportNode,
            fixer,
            newComponentName: 'Box',
            programNode,
          });

          const fixers = !importFixerRun ? [...tagFixers, importFixers] : tagFixers;
          importFixerRun = true;
          return fixers;
        },
      });
    };

    return {
      Program: (node) => {
        programNode = node;
      },
      ImportDeclaration: importDeclarationFnc,
      JSXElement: jSXElementFnc,
    };
  },
};

export default rule;
