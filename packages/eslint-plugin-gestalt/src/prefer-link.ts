/**
 * @fileoverview Prefer Link: Prevent anchor tags that only contain attributes matching supported props in Gestalt Link
 */

import { renameTagWithPropsFixer, updateGestaltImportFixer } from './helpers/eslintASTFixers';
import {
  buildKeyValueTypeArray,
  buildProps,
  buildValidatorResponsesFromProperties,
  hasAriaAttributes,
  hasAttributes,
  hasDataAttributes,
  hasImport,
  hasSpreadAttributes,
  hasUnsupportedAttributes,
  isTag,
} from './helpers/eslintASTHelpers';
import { ESLintRule } from './helpers/eslintFlowTypes';
import preferLinkReducer from './helpers/preferLinkReducer';

export const MESSAGES = {
  fixMessageLink: `Use Link from Gestalt (default autofix): <Link href="">Text</Link>\n
  OR use TapArea, see suggested options below to autofix\n
  OR use Button, <Button role='link' href="" target="" rel="" text=""/>\n
  OR use IconButton, <IconButton role='link' href="" target="" rel="" icon=""/>`,
  suggestionMessageTapArea: `Use TapArea to provide a Node with navigation behavior: <TapArea role="link" href="" onTap={}>{ Node }</TapArea>.`,
} as const;

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prefer Link: Prevent anchor tags that only contain attributes matching supported props in Gestalt Link. Use Gestalt Link, instead',
      category: 'Gestalt alternatives',
      recommended: true,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltprefer-link',
    },
    fixable: 'code',
    schema: [],
    messages: {
      fixMessageLink: MESSAGES.fixMessageLink,
      suggestionMessageTapArea: MESSAGES.suggestionMessageTapArea,
    },
    hasSuggestions: true,
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

      const isGestaltImportNode = hasImport({
        importNode: node,
        path: 'gestalt',
      });

      if (!isGestaltImportNode) return;

      gestaltImportNode = node;
    };

// @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
    const jSXElementFnc = (node) => {
      const boxDisallowedAttributes = ['className', 'style'];
      const supportedAriaAttributes = ['aria-label', 'aria-selected'];
      const supportedEventAttributes = ['onBlur', 'onClick', 'onFocus', 'onKeyPress'];
      const supportedLinkAttributes = [
        ...supportedAriaAttributes,
        ...supportedEventAttributes,
        'href',
        'id',
        'ref',
        'rel',
        'target',
      ];

      // First, exit if anchor tag should stay unmodified
      if (
        !isTag({ elementNode: node.openingElement, tagName: 'a' }) ||
        hasSpreadAttributes({ elementNode: node.openingElement }) ||
        hasAttributes({
          elementNode: node.openingElement,
          tagName: 'a',
          attributes: boxDisallowedAttributes,
        }) ||
        hasUnsupportedAttributes({
          elementNode: node.openingElement,
          tagName: 'a',
          supportedAttributes: supportedLinkAttributes,
        }) ||
        hasAriaAttributes({
          elementNode: node.openingElement,
          ignoreAttributes: supportedAriaAttributes,
          tagName: 'a',
        }) ||
        hasDataAttributes({
          elementNode: node.openingElement,
          tagName: 'a',
        })
      ) {
        return null;
      }

      const validatorResponse = buildValidatorResponsesFromProperties({
        context,
        keyValueTypeArray: buildKeyValueTypeArray({
          elementNode: node.openingElement,
          nodeType: 'openingElementNode',
        }),
        reducerCallbackFn: preferLinkReducer,
      });

      const newPropsToAddToLink = ({ alternativeComponent }: { alternativeComponent: string }) => {
        const newResponse =
          alternativeComponent === 'Link'
            ? [...validatorResponse]
            : [...validatorResponse, { prop: 'role="link"' }];

        switch (alternativeComponent) {
          case 'Link':
            return newResponse
              ?.map((alternative) => alternative.prop)
              .sort()
              .join(' ');

          case 'TapArea':
            return newResponse
              ?.map((alternative) => {
                if (
                  typeof alternative.prop === 'string' &&
                  alternative.prop.startsWith('accessibilitySelected')
                ) {
                  return false;
                }
                if (
                  typeof alternative.prop === 'string' &&
                  alternative.prop.startsWith('onKeyPress')
                ) {
                  return false;
                }
                return alternative.prop;
              })
              .filter(Boolean)
              .sort()
              .join(' ')
              .replace('onClick', 'onTap');

          default:
            return '';
        }
      };
      // For any other anchor tag modification
      return context.report({
        node,
        messageId: 'fixMessageLink',
// @ts-expect-error - TS7006 - Parameter 'fixer' implicitly has an 'any' type.
        fix: (fixer) => {
          const tagFixers = renameTagWithPropsFixer({
            context,
            elementNode: node,
            fixer,
// @ts-expect-error - TS7005 - Variable 'gestaltImportNode' implicitly has an 'any' type.
            gestaltImportNode,
            newComponentName: 'Link',
            modifiedPropsString: buildProps({
              context,
              elementNode: node,
              propSorting: false,
              propsToAdd: newPropsToAddToLink({ alternativeComponent: 'Link' }),
              propsToRemove: [
                ...supportedAriaAttributes,
                ...supportedEventAttributes,
                'rel',
                'target',
              ],
            }),
            tagName: 'a',
          });

          const importFixers = updateGestaltImportFixer({
// @ts-expect-error - TS7005 - Variable 'gestaltImportNode' implicitly has an 'any' type.
            gestaltImportNode,
            fixer,
            newComponentName: 'Link',
// @ts-expect-error - TS7005 - Variable 'programNode' implicitly has an 'any' type.
            programNode,
          });

          const fixers = !importFixerRun ? [...tagFixers, importFixers] : tagFixers;
          importFixerRun = true;
          return fixers;
        },
        suggest: [
          {
            messageId: 'suggestionMessageTapArea',
// @ts-expect-error - TS7006 - Parameter 'fixer' implicitly has an 'any' type.
            fix: (fixer) => {
              const tagFixers = renameTagWithPropsFixer({
                context,
                elementNode: node,
                fixer,
// @ts-expect-error - TS7005 - Variable 'gestaltImportNode' implicitly has an 'any' type.
                gestaltImportNode,
                newComponentName: 'TapArea',
                modifiedPropsString: buildProps({
                  context,
                  elementNode: node,
                  propSorting: false,
                  propsToAdd: newPropsToAddToLink({
                    alternativeComponent: 'TapArea',
                  }),
                  propsToRemove: [
                    ...supportedAriaAttributes,
                    ...supportedEventAttributes,
                    'rel',
                    'target',
                  ],
                }),
                tagName: 'a',
              });

              const importFixers = updateGestaltImportFixer({
// @ts-expect-error - TS7005 - Variable 'gestaltImportNode' implicitly has an 'any' type.
                gestaltImportNode,
                fixer,
                newComponentName: 'TapArea',
// @ts-expect-error - TS7005 - Variable 'programNode' implicitly has an 'any' type.
                programNode,
              });

              const fixers = [...tagFixers, importFixers];
              return fixers;
            },
          },
        ],
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
