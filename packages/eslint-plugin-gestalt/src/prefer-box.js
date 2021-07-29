/**
 * @fileoverview Prevent using inline styles on divs that could be gestalt Box props
 * @author Jenny Steele <jsteele@pinterest.com>
 *
 * We prefer using gestalt Box over divs with inline styling to get styling consistency
 * across the app and shared css classes. This linter checks for usage of inline styling
 * that is available as Box props.
 */

// @flow strict
import { validateBackgroundColor, validateBorder, validateBorderRadius } from './validators.js';

function getInlineDefinedStyles(attr) {
  return attr.value.expression.properties ? attr.value.expression.properties : null;
}

function getVariableDefinedStyles(ref) {
  return ref.resolved &&
    ref.resolved.defs &&
    ref.resolved.defs[0] &&
    ref.resolved.defs[0].node &&
    ref.resolved.defs[0].node.init &&
    ref.resolved.defs[0].node.init.properties
    ? ref.resolved.defs[0].node.init.properties
    : null;
}

const rule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Warns over div inline styling that is already available as Box props',
      category: 'Gestalt alternatives',
      recommended: false,
      url: 'https://gestalt.pinterest.systems/Eslint%20Plugin#gestaltprefer-box',
    },
    schema: [
      {
        type: 'object',
        additionalProperties: false,
      },
    ],
  },

  // $FlowFixMe[unclear-type]
  create(context: Object): Object {
    function matchKeyErrors(matchedErrors, key) {
      let message = '';
      switch (key.name) {
        case 'backgroundColor':
          message = validateBackgroundColor(key.value);
          if (message) {
            matchedErrors.push(message);
          }
          break;
        case 'borderRadius':
          message = validateBorderRadius(key.value);
          if (message) {
            matchedErrors.push(message);
          }
          break;
        case 'border':
          message = validateBorder(key.value);
          if (message) {
            matchedErrors.push(message);
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
            let styleProperties = getInlineDefinedStyles(attr);
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
                    return { name: type, value: null };
                  }
                  return { name: key.name, value: value.value };
                })
                .reduce(matchKeyErrors, []);
              if (errorMessages.length) {
                context.report(
                  attr,
                  `Replace this div with a gestalt Box. https://gestalt.netlify.app/Box\n${errorMessages.join(
                    '\n',
                  )}`,
                );
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
