/**
 * @fileoverview Prevent using inline styles on divs that could be gestalt Box props
 *
 * We prefer using gestalt Box over divs with inline styling to get styling consistency
 * across the app and shared css classes. This linter checks for usage of inline styling
 * that is available as Box props.
 */

import { ESLintRule } from './helpers/eslintFlowTypes';
import { generateDefaultMessage } from './helpers/noBoxDangerousStyleDuplicatesReducer';
import {
  validateBackgroundColor,
  validateBorder,
  validateBorderRadius,
} from './helpers/styleValidators';

// @ts-expect-error - TS7006 - Parameter 'attr' implicitly has an 'any' type.
function getInlineDefinedStyles(attr) {
  return attr.value.expression.properties ? attr.value.expression.properties : null;
}

function getVariableDefinedStyles(ref: {
  resolved: {
    defs: ReadonlyArray<{
      node: {
        init: {
          properties: ReadonlyArray<{
            key: {
              value: string;
              name: string;
            };
            type: string;
            value: {
              value: string;
            };
          }>;
        };
      };
    }>;
  };
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
    // @ts-expect-error - TS7006 - Parameter 'matchedErrors' implicitly has an 'any' type. | TS7006 - Parameter 'key' implicitly has an 'any' type.
    function matchKeyErrors(matchedErrors, key) {
      let alternateProp = '';
      switch (key.name) {
        case 'backgroundColor':
          // @ts-expect-error - TS2322 - Type 'string | null | undefined' is not assignable to type 'string'.
          alternateProp = validateBackgroundColor(key.value);
          if (alternateProp) {
            matchedErrors.push(generateDefaultMessage(alternateProp));
          }
          break;
        case 'borderRadius':
          // @ts-expect-error - TS2322 - Type 'string | number | null | undefined' is not assignable to type 'string'.
          alternateProp = validateBorderRadius(key.value);
          if (alternateProp) {
            matchedErrors.push(generateDefaultMessage(alternateProp));
          }
          break;
        case 'border':
          // @ts-expect-error - TS2322 - Type 'string | null | undefined' is not assignable to type 'string'.
          alternateProp = validateBorder(key.value);
          if (alternateProp) {
            matchedErrors.push(generateDefaultMessage(alternateProp));
          }
          break;
        default:
          break;
      }
      // @ts-expect-error - TS7006 - Parameter 'x' implicitly has an 'any' type.
      return matchedErrors.filter((x) => x);
    }

    return {
      // @ts-expect-error - TS7006 - Parameter 'node' implicitly has an 'any' type.
      JSXOpeningElement(node) {
        if (node.name.name !== 'div') {
          return;
        }
        Object.keys(node.attributes).some((attrKey) => {
          const attr = node.attributes[attrKey];
          const matched = attr.name && attr.name.name === 'style';
          if (matched) {
            // If we have style properties here, this is an object declared inline
            let styleProperties: null | undefined | ReadonlyArray<Record<any, any>>;
            styleProperties = getInlineDefinedStyles(attr);

            // Not declared inline? Check to see if there's a variable matching the name defined
            if (!styleProperties && attr.value.expression.name) {
              const scope = context.getScope(node);
              // Look in local scope for variable reference
              const ref = scope.references.find(
                // @ts-expect-error - TS7006 - Parameter 'reference' implicitly has an 'any' type.
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
                .reduce<Array<any>>(matchKeyErrors, []);
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
