/**
 * @fileoverview Error on use a <Icon icon="workflow-status-[...]" size={16} />, and suggest use
 * <Status /> component rather than <Icon />
 */

// @flow strict
import { hasImport, isGestaltComponent, hasAttributes } from './helpers/eslintASTHelpers.js';
import { type ESLintRule } from './helpers/eslintFlowTypes.js';

const disallowedMatch = [
  { icon: 'workflow-status-in-progress', color: 'success' },
  { icon: 'workflow-status-ok', color: 'success' },
  { icon: 'workflow-status-problem', color: 'error' },
  { icon: 'workflow-status-warning', color: 'warning' },
];

export const errorMessage =
  'Icons where `workflow-status-[...]` and matching color should be replaced for the Status Component. https://gestalt.pinterest.systems/web/status';

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prevent the use of Icon that can be replaced with Status.',
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
    let componentName = 'Icon';

    // $FlowFixMe[missing-local-annot]
    const matchValues = (node) => {
      const reducedPropValues = node.attributes.reduce((acc, { name, value }) => {
        const newAcc = { ...acc };
        newAcc[name?.name] = value?.value || value?.expression?.value;
        return newAcc;
      }, {});

      const isDisallowedMatch = disallowedMatch.some(
        ({ icon, color }) =>
          icon === reducedPropValues?.icon &&
          color === reducedPropValues?.color &&
          (reducedPropValues?.size === 16 || reducedPropValues?.size === undefined),
      );

      if (!isDisallowedMatch) return null;

      return node;
    };

    // $FlowFixMe[missing-local-annot]
    const importDeclarationFnc = (node) => {
      if (!node) return;

      const isGestaltImportNode = hasImport({ importNode: node, path: 'gestalt' });

      if (!isGestaltImportNode) return;

      componentName =
        node?.specifiers?.find((item) => item?.imported?.name === 'Icon')?.local?.name || 'Icon';
      gestaltImportNode = node;
    };

    // $FlowFixMe[missing-local-annot]
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
        tagName: componentName,
        attributes: ['icon', 'color'],
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
