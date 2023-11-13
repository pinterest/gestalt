/**
 * @fileoverview Prefer List: Prevent ul or ol list tags for basic use cases.
 */

// @flow strict
import { type ESLintRule } from './helpers/eslintFlowTypes';

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prefer List: Prevent ul or ol list tags for basic use cases. Use Gestalt List, instead',
      category: 'Gestalt alternatives',
      recommended: true,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltprefer-list',
    },
    schema: [],
    messages: {
      messageList: `Use List from Gestalt, <List><List.Item text=""/></List>\n`,
    },
  },

  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.name === 'ul' || node.name.name === 'ol') {
          context.report({
            node,
            messageId: 'messageList',
          });
        }
      },
    };
  },
};

export default rule;
