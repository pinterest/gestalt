/**
 * @fileoverview Prevent using inline styles on divs that could be gestalt Box props
 *
 * We prefer using gestalt Box over divs with inline styling to get styling consistency
 * across the app and shared css classes. This linter checks for usage of inline styling
 * that is available as Box props.
 */

// @flow strict
import { type ESLintRule } from './helpers/eslintFlowTypes.js';
import { generateDefaultMessage } from './helpers/noBoxDangerousStyleDuplicatesReducer.js';
import {
  validateBackgroundColor,
  validateBorder,
  validateBorderRadius,
} from './helpers/styleValidators.js';

// $FlowFixMe[missing-local-annot]
function getInlineDefinedStyles(attr) {
  return attr.value.expression.properties ? attr.value.expression.properties : null;
}

function getVariableDefinedStyles(ref: {
  resolved: {
    defs: $ReadOnlyArray<{
      node: {
        init: {
          properties: $ReadOnlyArray<{
            key: { value: string, name: string, ... },
            type: string,
            value: { value: string, ... },
          }>,
        },
      },
    }>,
  },
}) {
  return (
    ref.resolved &&
    ref.resolved.defs &&
    ref.resolved.defs[0] &&
    ref.resolved.defs[0].node &&
    ref.resolved.defs[0].node.init &&
    ref.resolved.defs[0].node.init.properties &&
    ref.resolved.defs[0].node.init.properties
  );
}

const rule: ESLintRule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Warns over div inline styling that is already available as Box props',
      category: 'Gestalt alternatives',
      recommended: false,
      url: 'https://gestalt.pinterest.systems/eslint%20plugin#gestaltprefer-box-inline-style',
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
      },
    ],
    messages: {
      disallowed: `Replace this div with a Gestalt Box.\n{{errorMessages}}`,
    },
  },

  create(context) {
    // $FlowFixMe[missing-local-annot]
    function matchKeyErrors(matchedErrors, key) {
      let alternateProp = '';
      switch (key.name) {
        case 'backgroundColor':
          // $FlowFixMe[incompatible-type]
          alternateProp = validateBackgroundColor(key.value);
          if (alternateProp) {
            matchedErrors.push(generateDefaultMessage(alternateProp));
          }
          break;
        case 'borderRadius':
          // $FlowFixMe[incompatible-type]
          alternateProp = validateBorderRadius(key.value);
          if (alternateProp) {
            matchedErrors.push(generateDefaultMessage(alternateProp));
          }
          break;
        case 'border':
          // $FlowFixMe[incompatible-type]
          alternateProp = validateBorder(key.value);
          if (alternateProp) {
            matchedErrors.push(generateDefaultMessage(alternateProp));
          }
          break;
        default:
          break;
      }
      return matchedErrors.filter((x) => x);
    }

    return {
      JSXOpeningElement(node) {
        if (node.name.name !== 'div') {
          return;
        }
        Object.keys(node.attributes).some((attrKey) => {
          const attr = node.attributes[attrKey];
          const matched = attr.name && attr.name.name === 'style';
          if (matched) {
            // If we have style properties here, this is an object declared inline
            let styleProperties: null | $ReadOnlyArray<{ ... }>;
            styleProperties = getInlineDefinedStyles(attr);

            // Not declared inline? Check to see if there's a variable matching the name defined
            if (!styleProperties && attr.value.expression.name) {
              const scope = context.getScope(node);
              // Look in local scope for variable reference
              const ref = scope.references.find(
                (reference) => reference.identifier.name === attr.value.expression.name,
              );
              if (ref) {
                styleProperties = getVariableDefinedStyles(ref);
              }
            }
            if (styleProperties) {
              const errorMessages = styleProperties
                .map(({ key, type, value }) => {
                  // Handle things like spread props
                  if (!key || value.value === undefined) {
                    return { name: type, value: '' };
                  }
                  return { name: key.name, value: value.value };
                })
                .reduce(matchKeyErrors, []);
              if (errorMessages.length) {
                context.report({
                  node: attr,
                  messageId: 'disallowed',
                  data: { errorMessages: errorMessages.join('\n') },
                });
              }
            }
          }
          return matched;
        });
      },
    };
  },
};

export default rule;
