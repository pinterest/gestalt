/**
 * @fileoverview Prevent spreading props in Gestalt components to enable AST codemods and usage-metrics scripts.
 */

// @flow strict
import {
  buildPropsFromKeyValuesVariable,
  getComponentNameFromAttribute,
  getNamedImportsComponents,
  getPropertiesFromVariable,
  getVariableNodeInScopeFromName,
  hasImport,
} from './helpers/eslintASTHelpers.js';
import { type ESLintRule } from './helpers/eslintFlowTypes.js';

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prevent spreading props in Gestalt components to enable AST codemods and usage-metrics scripts.',
      category: 'Gestalt alternatives',
      recommended: true,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltno-spread-props',
    },
    fixable: 'code',
    schema: ([]: $ReadOnlyArray<empty>),
    messages: {
      disallowed: `Prop spreading in Gestalt component {{ name }} is forbidden, write your props out instead. {{ autofix }}`,
    },
  },

  create(context) {
    let gestaltImportNode;

    // $FlowFixMe[missing-local-annot]
    const importDeclarationFnc = (node) => {
      if (!node) return;

      const isGestaltImportNode = hasImport({ importNode: node, path: 'gestalt' });

      if (!isGestaltImportNode) return;

      gestaltImportNode = node;
    };

    // $FlowFixMe[missing-local-annot]
    const jSXSpreadAttributeFnc = (nodeAttribute) => {
      if (!gestaltImportNode) {
        return null;
      }

      const importedComponents = getNamedImportsComponents({ importNode: gestaltImportNode });

      // access the component with spread props
      const componentName = getComponentNameFromAttribute({ nodeAttribute });

      const isGestaltComponent = importedComponents?.map((cmp) => cmp[1]).includes(componentName);

      if (!isGestaltComponent) {
        return null;
      }

      // access the node of the variable -within scope- being spread
      const declaredVariableNode = getVariableNodeInScopeFromName({
        context,
        nodeElement: nodeAttribute,
        name: nodeAttribute.argument.name,
      });

      // check if the variable in scope is a key/value object from where retrieve props
      const isFixable = !!getPropertiesFromVariable({ variableNode: declaredVariableNode });

      return context.report({
        node: nodeAttribute,
        messageId: 'disallowed',
        data: {
          name: componentName,
          autofix: isFixable ? 'Autofix available' : '',
        },
        fix: isFixable
          ? (fixer) => {
              const componentPropsString = buildPropsFromKeyValuesVariable({
                context,
                variableNode: declaredVariableNode,
              });

              return fixer.replaceText(nodeAttribute, componentPropsString);
            }
          : () => {},
      });
    };

    return {
      ImportDeclaration: importDeclarationFnc,
      JSXSpreadAttribute: jSXSpreadAttributeFnc,
    };
  },
};

export default rule;
