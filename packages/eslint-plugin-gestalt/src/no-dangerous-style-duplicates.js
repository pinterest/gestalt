/**
 * @fileoverview Prevent using dangerouslySetInlineStyle on Box for props that are already directly implemented
 * @author Jenny Steele <jsteele@pinterest.com>
 *
 * Box supports some props already that are not widely known and instead are being
 * implemented with dangerouslySetInlineStyle. This linter checks for usage of already
 * available props as dangerous styles and suggests the alternative
 */

// @flow strict
import { genBointLookup, validateBackgroundColor, validateBorderRadius } from './validators.js';

function getInlineDefinedStyles(attr) {
  return attr.value.expression &&
    attr.value.expression.properties &&
    attr.value.expression.properties[0] &&
    attr.value.expression.properties[0].key.name === '__style'
    ? attr.value.expression.properties[0].value.properties
    : null;
}

function getVariableDefinedStyles(ref) {
  return ref.resolved &&
    ref.resolved.defs &&
    ref.resolved.defs[0] &&
    ref.resolved.defs[0].node &&
    ref.resolved.defs[0].node.init &&
    ref.resolved.defs[0].node.init.properties &&
    ref.resolved.defs[0].node.init.properties[0] &&
    ref.resolved.defs[0].node.init.properties[0].key.name === '__style'
    ? ref.resolved.defs[0].node.init.properties[0].value.properties
    : null;
}

function genOpacityLookup() {
  const lookupMap = {};
  for (let i = 0; i <= 10; i += 1) {
    const val = i / 10; // Why not increment i by 0.1? Floats
    const msg = `  Use prop \`opacity={${val}}\` instead`;
    lookupMap[val] = msg;
    lookupMap[`${val}`] = msg;
  }
  return lookupMap;
}

const overflowLookup = {
  visible: '  Use prop `overflow="visible"` instead',
  hidden: '  Use prop `overflow="hidden"` instead',
  scroll: '  Use prop `overflow="scroll"` instead',
  auto: '  Use prop `overflow="auto"` instead',
};

const rule = {
  meta: {
    docs: {
      description:
        'Prevent using dangerouslySetInlineStyle on Box for props that are already directly implemented',
      recommended: false,
    },
    schema: [
      {
        type: 'object',
        properties: {
          onlyKeys: {
            type: 'array',
            items: { type: 'string' },
            uniqueItems: true,
          },
        },
        additionalProperties: false,
      },
    ],
  },

  // $FlowFixMe[unclear-type]
  create(context: Object): Object {
    let importedBox = false;
    let localIdentifierName = 'Box';
    const { onlyKeys } = context.options[0] || {};

    function includeKey(key) {
      return !onlyKeys || onlyKeys.includes(key);
    }

    const marginLookup = genBointLookup('margin', -12);
    const marginBottomLookup = genBointLookup('marginBottom', -12);
    const marginLeftLookup = genBointLookup('marginLeft', -12);
    const marginRightLookup = genBointLookup('marginRight', -12);
    const marginTopLookup = genBointLookup('marginTop', -12);

    const opacityLookup = genOpacityLookup();

    const paddingLookup = genBointLookup('padding', 0);

    function matchKeyErrors(matchedErrors, key) {
      switch (key.name) {
        case 'backgroundColor':
          if (includeKey('backgroundColor')) {
            const message = validateBackgroundColor(key.value);
            if (message) {
              matchedErrors.push(message);
            }
          }
          break;
        case 'borderRadius':
          if (includeKey('borderRadius')) {
            const message = validateBorderRadius(key.value);
            if (message) {
              matchedErrors.push(message);
            }
          }
          break;
        case 'border':
          if (includeKey('border')) {
            // If the value is a string:
            // 1) convert everything to lowerCase (css is case-insensitive)
            // 2) sort the values since some found uses have the wrong order
            const value =
              key.value && key.value.toLowerCase
                ? key.value.toLowerCase().split(' ').sort().join(' ')
                : key.value;
            if (
              value === '#efefef 1px solid' ||
              value === '#eee 1px solid' ||
              value === '1px lightgray solid'
            ) {
              matchedErrors.push('  Use prop `borderSize="sm"` instead');
            } else if (
              value === '#efefef 2px solid' ||
              value === '#eee 2px solid' ||
              value === '2px lightgray solid'
            ) {
              matchedErrors.push('  Use prop `borderSize="lg"` instead');
            }
          }
          break;
        case 'bottom':
          if ((includeKey('bottom') && key.value === '0px') || key.value === 0) {
            matchedErrors.push(
              '  Instead of dangerously styling bottom, use the "bottom" boolean prop',
            );
          }
          break;
        case 'left':
          if ((includeKey('left') && key.value === '0px') || key.value === 0) {
            matchedErrors.push(
              '  Instead of dangerously styling left, use the "left" boolean prop',
            );
          }
          break;
        case 'margin':
          if (includeKey('margin')) {
            if (key.value === 'auto') {
              matchedErrors.push('  Use prop `margin="auto"` instead');
            } else {
              matchedErrors.push(marginLookup[key.value]);
            }
          }
          break;
        case 'marginBottom':
          if (includeKey('marginBottom')) {
            if (key.value === 'auto') {
              matchedErrors.push('  Use prop `marginBottom="auto"` instead');
            } else {
              matchedErrors.push(marginBottomLookup[key.value]);
            }
          }
          break;
        case 'marginLeft':
          if (includeKey('marginTop')) {
            if (key.value === 'auto') {
              matchedErrors.push('  Use prop `marginStart="auto"` instead');
            } else {
              matchedErrors.push(marginLeftLookup[key.value]);
            }
          }
          break;
        case 'marginRight':
          if (includeKey('marginRight')) {
            if (key.value === 'auto') {
              matchedErrors.push('  Use prop `marginEnd="auto"` instead');
            } else {
              matchedErrors.push(marginRightLookup[key.value]);
            }
          }
          break;
        case 'marginTop':
          if (includeKey('marginTop')) {
            if (key.value === 'auto') {
              matchedErrors.push('  Use prop `marginTop="auto"` instead');
            } else {
              matchedErrors.push(marginTopLookup[key.value]);
            }
          }
          break;
        case 'maxHeight':
          if (includeKey('maxHeight')) {
            matchedErrors.push(
              '  Use prop `maxHeight={pixels}` or `maxHeight="percentage%"` instead',
            );
          }
          break;
        case 'minHeight':
          if (includeKey('minHeight')) {
            matchedErrors.push(
              '  Use prop `minHeight={pixels}` or `minHeight="percentage%"` instead',
            );
          }
          break;
        case 'maxWidth':
          if (includeKey('maxWidth')) {
            matchedErrors.push(
              '  Use prop `maxWidth={pixels}` or `maxWidth="percentage%"` instead',
            );
          }
          break;
        case 'minWidth':
          if (includeKey('minWidth')) {
            matchedErrors.push(
              '  Use prop `minWidth={pixels}` or `minWidth="percentage%"` instead',
            );
          }
          break;
        case 'opacity':
          if (includeKey('opacity')) {
            matchedErrors.push(opacityLookup[key.value]);
          }
          break;
        case 'overflow':
          if (includeKey('overflow')) {
            matchedErrors.push(overflowLookup[key.value]);
          }
          break;
        case 'overflow-x':
          if (includeKey('overflow')) {
            if (key.value === 'scroll') {
              matchedErrors.push('  Use prop `overflow="scrollX"` instead');
            }
          }
          break;
        case 'overflow-y':
          if (includeKey('overflow')) {
            if (key.value === 'scroll') {
              matchedErrors.push('  Use prop `overflow="scrollY"` instead');
            }
          }
          break;
        case 'padding':
          if (includeKey('padding')) {
            matchedErrors.push(paddingLookup[key.value]);
          }
          break;
        case 'position':
          if (includeKey('position')) {
            if (key.value === 'absolute') {
              matchedErrors.push('  Use prop `position="absolute"` instead');
            } else if (key.value === 'static') {
              matchedErrors.push('  Use prop `position="static"` instead');
            } else if (key.value === 'relative') {
              matchedErrors.push('  Use prop `position="relative"` instead');
            } else if (key.value === 'fixed') {
              matchedErrors.push('  Use prop `position="fixed"` instead');
            }
          }
          break;
        case 'right':
          if ((includeKey('right') && key.value === '0px') || key.value === 0) {
            matchedErrors.push(
              '  Instead of dangerously styling right, use the "right" boolean prop',
            );
          }
          break;
        case 'top':
          if ((includeKey('top') && key.value === '0px') || key.value === 0) {
            matchedErrors.push('  Instead of dangerously styling top, use the "top" boolean prop');
          }
          break;
        default:
          break;
      }
      return matchedErrors.filter((x) => x);
    }

    return {
      ImportDeclaration(decl) {
        if (decl.source.value !== 'gestalt') {
          return;
        }
        importedBox = decl.specifiers.some((node) => {
          const isBox = node.imported.name === 'Box';
          if (isBox) {
            localIdentifierName = node.local.name;
          }
          return isBox;
        });
      },
      JSXOpeningElement(node) {
        if (!importedBox || localIdentifierName !== node.name.name) {
          return;
        }
        Object.keys(node.attributes).some((attrKey) => {
          const attr = node.attributes[attrKey];
          const matched = attr.name && attr.name.name === 'dangerouslySetInlineStyle';
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
                  `Un-needed Box dangerous styles found. https://gestalt.netlify.app/gestalt/#/Box\n${errorMessages.join(
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
