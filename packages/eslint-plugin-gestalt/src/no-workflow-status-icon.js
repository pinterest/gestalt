/**
 * @fileoverview Error on use a <Icon icon="workflow-status-[...]" size={16} />, and suggest use
 * <Status /> component rather than <Icon />
 */

// @flow strict
import { type ESLintRule } from './helpers/eslintFlowTypes.js';
import { hasImport, isGestaltComponent, hasAttributes } from './helpers/eslintASTHelpers.js';

const disallowedMatch = [
  { icon: 'workflow-status-in-progress', color: 'success' },
  { icon: 'workflow-status-ok', color: 'success' },
  { icon: 'workflow-status-problem', color: 'error' },
  { icon: 'workflow-status-warning', color: 'warning' },
];

export const errorMessage =
  'Icons where `workflow-status-[...]` and matching color should be replaced for the Status Component. https://gestalt.pinterest.systems/status';

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prevent the use of the Icon where should be replaceable for the `Status` component.',
      category: 'Gestalt restrictions',
      recommended: true,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltno-workflow-status-icon',
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
      },
    ],
    messages: {
      disallowed: errorMessage,
    },
  },

  create(context) {
    let gestaltImportNode;

    const matchValues = (node) => {
      const props = {};
      node.attributes.forEach(({ name, value }) => {
        props[name?.name] = value?.value || value?.expression?.value;
      });

      const isDisallowedMatch = disallowedMatch.some(
        ({ icon, color }) =>
          icon === props?.icon &&
          color === props?.color &&
          (props?.size === 16 || props?.size === undefined),
      );

      if (!isDisallowedMatch) return null;

      return node;
    };

    const importDeclarationFnc = (node) => {
      if (!node) return;

      const isGestaltImportNode = hasImport({ importNode: node, path: 'gestalt' });

      if (!isGestaltImportNode) return;

      gestaltImportNode = node;
    };

    const jSXOpeningElementFnc = (node) => {
      // exit if Gestalt is not imported
      if (!gestaltImportNode) return null;

      const isIcon = isGestaltComponent({
        elementNode: node,
        gestaltImportNode,
        componentName: 'Icon',
      });

      // exit if not Icon component
      if (!isIcon) return null;

      const isMatchProps = hasAttributes({
        elementNode: node,
        tagName: 'Icon',
        attributes: ['icon', 'color', 'size'],
      });

      // exit if not have correct props
      if (!isMatchProps) return null;

      const isMatchAttributesValues = matchValues(node);

      // exit if not have correct props and values
      if (!isMatchAttributesValues) return null;

      return context.report({
        node,
        messageId: 'disallowed',
      });
    };

    return {
      ImportDeclaration: importDeclarationFnc,
      JSXOpeningElement: jSXOpeningElementFnc,
    };
  },
};

export default rule;
