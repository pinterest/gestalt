/**
 * @fileoverview Prevent spreading props in Gestalt components to enable AST codemods and usage-metrics scripts.
 */

import {
  buildPropsFromKeyValuesVariable,
  getComponentNameFromAttribute,
  getNamedImportsComponents,
  getPropertiesFromVariable,
  getVariableNodeInScopeFromName,
  hasImport,
} from './helpers/eslintASTHelpers';
import { type ESLintRule } from './helpers/eslintFlowTypes';

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
    schema: [] as ReadonlyArray<never>,
    messages: {
      disallowed: `Prop spreading in Gestalt component {{ name }} is forbidden, write your props out instead. {{ autofix }}`,
    },
  },

  create(context) {
    // @ts-expect-error - TS7034 - Variable 'gestaltImportNode' implicitly has type 'any' in some locations where its type cannot be determined.
    let gestaltImportNode;

    // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
    const importDeclarationFnc = (node) => {
      if (!node) return;

      const isGestaltImportNode = hasImport({ importNode: node, path: 'gestalt' });

      if (!isGestaltImportNode) return;

      gestaltImportNode = node;
    };

    // @ts-expect-error - TS7006 - Parameter 'nodeAttribute' implicitly has an 'any' type.
    const jSXSpreadAttributeFnc = (nodeAttribute) => {
      // @ts-expect-error - TS7005 - Variable 'gestaltImportNode' implicitly has an 'any' type.
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
          ? // @ts-expect-error - TS7006 - Parameter 'fixer' implicitly has an 'any' type.
            (fixer) => {
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
